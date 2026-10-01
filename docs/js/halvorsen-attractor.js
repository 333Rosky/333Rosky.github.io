(function () {
    var canvas = document.querySelector("[data-halvorsen-attractor]");
    var hero = canvas && canvas.closest(".research-hero");
    var ctx = canvas && canvas.getContext("2d", { alpha: true });
    if (!canvas || !hero || !ctx) {
        return;
    }

    var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var reduceMotion = motionQuery.matches;
    var visible = true;
    var frameId = null;
    var elapsedTime = 0;
    var lastTimestamp = 0;
    var trajectoryRemainder = 0;
    var spareGaussian = null;
    var cloudSize = 9000;
    var trailSize = 860;
    var cloud = new Float32Array(cloudSize * 3);
    var trail = new Float32Array(trailSize * 3);
    var trailCursor = 0;
    var center = { x: 0, y: 0, z: 0 };
    var radius = 1;
    var trajectory = { x: 0.1, y: 0, z: 0 };
    var obstacles = [
        hero.querySelector(".research-hero__copy"),
        hero.querySelector(".research-portrait"),
        hero.querySelector(".research-challenge")
    ].filter(Boolean);
    var regimes = [
        { theta: 0.34, sigma: 19, driftSpeed: 48, rho: 0.12, meanDuration: 12 },
        { theta: 0.92, sigma: 43, driftSpeed: 22, rho: -0.42, meanDuration: 8 },
        { theta: 0.56, sigma: 29, driftSpeed: 38, rho: 0.58, meanDuration: 10 }
    ];
    var layout = {
        width: 1, height: 1, visualSize: 1, clearance: 1,
        minX: 0, maxX: 0, minY: 0, maxY: 0, obstacles: []
    };
    var motion = {
        x: 0, y: 0, vx: 24, vy: -14,
        meanVx: 0, meanVy: 0, regime: 0, nextRegimeAt: 0,
        initialized: false
    };
    canvas.dataset.motionModel = "regime-switching-ou";

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function gaussian() {
        if (spareGaussian !== null) {
            var spare = spareGaussian;
            spareGaussian = null;
            return spare;
        }
        var u = Math.max(Math.random(), 0.000001);
        var v = Math.random();
        var magnitude = Math.sqrt(-2 * Math.log(u));
        var angle = 2 * Math.PI * v;
        spareGaussian = magnitude * Math.sin(angle);
        return magnitude * Math.cos(angle);
    }

    function derivative(x, y, z) {
        return {
            x: -1.4 * x - 4 * y - 4 * z - y * y,
            y: -1.4 * y - 4 * z - 4 * x - z * z,
            z: -1.4 * z - 4 * x - 4 * y - x * x
        };
    }

    // Keep the Halvorsen equations; RK4 produces a smooth, continuous orbit.
    function stepTrajectory() {
        var dt = 0.0045;
        var x = trajectory.x, y = trajectory.y, z = trajectory.z;
        var k1 = derivative(x, y, z);
        var k2 = derivative(x + k1.x * dt / 2, y + k1.y * dt / 2, z + k1.z * dt / 2);
        var k3 = derivative(x + k2.x * dt / 2, y + k2.y * dt / 2, z + k2.z * dt / 2);
        var k4 = derivative(x + k3.x * dt, y + k3.y * dt, z + k3.z * dt);
        trajectory.x += dt * (k1.x + 2 * k2.x + 2 * k3.x + k4.x) / 6;
        trajectory.y += dt * (k1.y + 2 * k2.y + 2 * k3.y + k4.y) / 6;
        trajectory.z += dt * (k1.z + 2 * k2.z + 2 * k3.z + k4.z) / 6;
    }

    function buildAttractor() {
        var min = { x: Infinity, y: Infinity, z: Infinity };
        var max = { x: -Infinity, y: -Infinity, z: -Infinity };
        for (var warmup = 0; warmup < 1800; warmup += 1) {
            stepTrajectory();
        }
        for (var i = 0; i < cloudSize; i += 1) {
            stepTrajectory();
            var offset = i * 3;
            cloud[offset] = trajectory.x;
            cloud[offset + 1] = trajectory.y;
            cloud[offset + 2] = trajectory.z;
            min.x = Math.min(min.x, trajectory.x); max.x = Math.max(max.x, trajectory.x);
            min.y = Math.min(min.y, trajectory.y); max.y = Math.max(max.y, trajectory.y);
            min.z = Math.min(min.z, trajectory.z); max.z = Math.max(max.z, trajectory.z);
        }
        center.x = (min.x + max.x) / 2;
        center.y = (min.y + max.y) / 2;
        center.z = (min.z + max.z) / 2;
        for (var j = 0; j < cloud.length; j += 3) {
            cloud[j] -= center.x;
            cloud[j + 1] -= center.y;
            cloud[j + 2] -= center.z;
            radius = Math.max(radius, Math.hypot(cloud[j], cloud[j + 1], cloud[j + 2]));
        }
        radius *= 1.06;
        for (var k = 0; k < cloud.length; k += 1) {
            cloud[k] /= radius;
        }
        trail.set(cloud.subarray((cloudSize - trailSize) * 3));
    }

    function measureObstacles() {
        var canvasRect = canvas.getBoundingClientRect();
        var padding = layout.width <= 640 ? 12 : 20;
        layout.obstacles = obstacles.filter(function (element) {
            return window.getComputedStyle(element).display !== "none";
        }).map(function (element) {
            var rect = element.getBoundingClientRect();
            return {
                left: rect.left - canvasRect.left - padding,
                right: rect.right - canvasRect.left + padding,
                top: rect.top - canvasRect.top - padding,
                bottom: rect.bottom - canvasRect.top + padding
            };
        });
    }

    function distanceToObstacle(x, y, obstacle) {
        return Math.hypot(
            x - clamp(x, obstacle.left, obstacle.right),
            y - clamp(y, obstacle.top, obstacle.bottom)
        );
    }

    function freeRadius(x, y) {
        var free = Math.min(x, layout.width - x, y, layout.height - y);
        layout.obstacles.forEach(function (obstacle) {
            free = Math.min(free, distanceToObstacle(x, y, obstacle));
        });
        return Math.max(0, free);
    }

    function resize() {
        var rect = canvas.getBoundingClientRect();
        var previousWidth = layout.width, previousHeight = layout.height;
        layout.width = Math.max(1, rect.width);
        layout.height = Math.max(1, rect.height);
        measureObstacles();

        // Find room for the whole shape, including the challenge card on phones.
        var candidates = [];
        var largest = 0;
        for (var yi = 1; yi < 25; yi += 1) {
            for (var xi = 1; xi < 33; xi += 1) {
                var x = layout.width * xi / 33;
                var y = layout.height * yi / 25;
                var free = freeRadius(x, y);
                candidates.push({ x: x, y: y, free: free });
                largest = Math.max(largest, free);
            }
        }
        var phone = layout.width <= 640;
        var desiredSize = clamp(Math.min(layout.width, layout.height) * 0.58, phone ? 230 : 320, phone ? 330 : 560);
        layout.visualSize = Math.min(desiredSize, largest * 1.7);
        layout.clearance = layout.visualSize * 0.48 + Math.min(10, largest * 0.08);
        layout.minX = layout.minY = layout.clearance;
        layout.maxX = Math.max(layout.minX, layout.width - layout.clearance);
        layout.maxY = Math.max(layout.minY, layout.height - layout.clearance);

        var desiredX = motion.initialized ? motion.x * layout.width / previousWidth : layout.width * (phone ? 0.55 : 0.58);
        var desiredY = motion.initialized ? motion.y * layout.height / previousHeight : layout.height * (phone ? 0.76 : 0.28);
        var best = null, bestDistance = Infinity;
        candidates.forEach(function (candidate) {
            if (candidate.free < layout.clearance + 2) { return; }
            var distance = Math.hypot(candidate.x - desiredX, candidate.y - desiredY);
            if (distance < bestDistance) { best = candidate; bestDistance = distance; }
        });
        if (!motion.initialized || freeRadius(desiredX, desiredY) < layout.clearance) {
            motion.x = best ? best.x : layout.width / 2;
            motion.y = best ? best.y : layout.height / 2;
        } else {
            motion.x = desiredX;
            motion.y = desiredY;
        }
        motion.initialized = true;
        motion.x = clamp(motion.x, layout.minX, layout.maxX);
        motion.y = clamp(motion.y, layout.minY, layout.maxY);

        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(layout.width * dpr);
        canvas.height = Math.round(layout.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw();
        syncPlayback();
    }

    function switchRegime() {
        var next = motion.regime;
        do { next = Math.floor(Math.random() * regimes.length); }
        while (motion.nextRegimeAt && next === motion.regime);
        motion.regime = next;
        var regime = regimes[next];
        var pace = clamp(Math.sqrt(layout.width * layout.height) / 980, 0.72, 1.35);
        var direction = Math.random() * Math.PI * 2;
        motion.meanVx = Math.cos(direction) * regime.driftSpeed * pace;
        motion.meanVy = Math.sin(direction) * regime.driftSpeed * pace;
        var holdingTime = -Math.log(Math.max(Math.random(), 0.000001)) * regime.meanDuration;
        motion.nextRegimeAt = elapsedTime + clamp(holdingTime, 5.5, 18);
        canvas.dataset.regime = String(next + 1);
    }

    function wallForce(position, min, max, band) {
        var lower = clamp(1 - (position - min) / band, 0, 1);
        var upper = clamp(1 - (max - position) / band, 0, 1);
        return 140 * (lower * lower - upper * upper);
    }

    function avoidObstacle(obstacle, dt) {
        var dx = motion.x - clamp(motion.x, obstacle.left, obstacle.right);
        var dy = motion.y - clamp(motion.y, obstacle.top, obstacle.bottom);
        var distance = Math.hypot(dx, dy);
        var band = layout.clearance * 1.8;
        if (distance >= band) { return; }
        if (distance < 0.001) {
            var edges = [
                { distance: motion.x - obstacle.left, x: -1, y: 0 },
                { distance: obstacle.right - motion.x, x: 1, y: 0 },
                { distance: motion.y - obstacle.top, x: 0, y: -1 },
                { distance: obstacle.bottom - motion.y, x: 0, y: 1 }
            ].sort(function (a, b) { return a.distance - b.distance; });
            dx = edges[0].x; dy = edges[0].y;
            distance = 1;
        }
        var nx = dx / distance, ny = dy / distance;
        var weight = Math.pow(1 - distance / band, 2);
        var approaching = Math.min(0, motion.vx * nx + motion.vy * ny);
        var force = (200 - approaching * 8) * weight;
        motion.vx += nx * force * dt;
        motion.vy += ny * force * dt;
    }

    function updateMotion(dt) {
        if (!motion.nextRegimeAt || elapsedTime >= motion.nextRegimeAt) { switchRegime(); }
        var regime = regimes[motion.regime];
        var pace = clamp(Math.sqrt(layout.width * layout.height) / 980, 0.72, 1.35);
        var z1 = gaussian(), z2 = gaussian();
        var decay = Math.exp(-regime.theta * dt);
        var diffusion = regime.sigma * pace * Math.sqrt((1 - decay * decay) / (2 * regime.theta));
        var noiseY = regime.rho * z1 + Math.sqrt(1 - regime.rho * regime.rho) * z2;
        motion.vx = motion.meanVx + (motion.vx - motion.meanVx) * decay + diffusion * z1;
        motion.vy = motion.meanVy + (motion.vy - motion.meanVy) * decay + diffusion * noiseY;
        var band = Math.max(1, layout.clearance * 0.8);
        motion.vx += wallForce(motion.x, layout.minX, layout.maxX, band) * dt;
        motion.vy += wallForce(motion.y, layout.minY, layout.maxY, band) * dt;
        layout.obstacles.forEach(function (obstacle) { avoidObstacle(obstacle, dt); });
        var speed = Math.hypot(motion.vx, motion.vy);
        var maximum = 58 * pace;
        if (speed > maximum) { motion.vx *= maximum / speed; motion.vy *= maximum / speed; }
        motion.x += motion.vx * dt;
        motion.y += motion.vy * dt;
        if (motion.x < layout.minX || motion.x > layout.maxX) {
            motion.x = clamp(motion.x, layout.minX, layout.maxX);
            motion.vx = 0;
            motion.meanVx = Math.abs(motion.meanVx) * (motion.x === layout.minX ? 1 : -1);
        }
        if (motion.y < layout.minY || motion.y > layout.maxY) {
            motion.y = clamp(motion.y, layout.minY, layout.maxY);
            motion.vy = 0;
            motion.meanVy = Math.abs(motion.meanVy) * (motion.y === layout.minY ? 1 : -1);
        }
    }

    function updateTrail(dt) {
        trajectoryRemainder += dt * 52;
        while (trajectoryRemainder >= 1) {
            stepTrajectory();
            var offset = trailCursor * 3;
            trail[offset] = (trajectory.x - center.x) / radius;
            trail[offset + 1] = (trajectory.y - center.y) / radius;
            trail[offset + 2] = (trajectory.z - center.z) / radius;
            trailCursor = (trailCursor + 1) % trailSize;
            trajectoryRemainder -= 1;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, layout.width, layout.height);
        var yaw = 0.65 + elapsedTime * 0.055;
        var pitch = -0.08 + Math.sin(elapsedTime * 0.071) * 0.22;
        var roll = Math.sin(elapsedTime * 0.037 + 1.7) * 0.1;
        var cy = Math.cos(yaw), sy = Math.sin(yaw);
        var cp = Math.cos(pitch), sp = Math.sin(pitch);
        var cr = Math.cos(roll), sr = Math.sin(roll);
        var scale = layout.visualSize * 0.43;
        var stride = layout.width <= 640 ? 3 : 2;
        var px = 0, py = 0;

        // Trigonometry is computed once per frame, not once per vertex.
        function project(data, index) {
            var offset = index * 3;
            var x1 = data[offset] * cy - data[offset + 2] * sy;
            var z1 = data[offset] * sy + data[offset + 2] * cy;
            var y2 = data[offset + 1] * cp - z1 * sp;
            var z2 = data[offset + 1] * sp + z1 * cp;
            var perspective = clamp(1 + z2 * 0.055, 0.92, 1.08);
            px = (x1 * cr - y2 * sr) * scale * perspective;
            py = (x1 * sr + y2 * cr) * scale * 0.86 * perspective;
        }
        ctx.save();
        ctx.translate(motion.x, motion.y);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = "rgba(245, 245, 245, 0.19)";
        ctx.beginPath();
        for (var i = 0; i < cloudSize; i += stride) {
            project(cloud, i);
            if (!i) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
        }
        ctx.stroke();
        var alphas = [0.12, 0.25, 0.46, 0.72];
        for (var section = 0; section < alphas.length; section += 1) {
            var start = Math.max(0, Math.floor(section * trailSize / 4) - 2);
            var end = Math.min(trailSize, Math.ceil((section + 1) * trailSize / 4));
            ctx.beginPath();
            ctx.lineWidth = 1 + section * 0.1;
            ctx.strokeStyle = "rgba(245, 245, 245, " + alphas[section] + ")";
            for (var j = start; j < end; j += 2) {
                project(trail, (trailCursor + j) % trailSize);
                if (j === start) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
            }
            if (section === 3) {
                project(trail, (trailCursor + trailSize - 1) % trailSize);
                ctx.lineTo(px, py);
            }
            ctx.stroke();
        }
        ctx.fillStyle = "rgba(245, 245, 245, 0.86)";
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function shouldAnimate() {
        return !reduceMotion && !document.hidden && visible && layout.visualSize > 8;
    }

    function scheduleFrame() {
        if (frameId === null && shouldAnimate()) {
            frameId = window.requestAnimationFrame(animate);
        }
    }

    function animate(timestamp) {
        frameId = null;
        if (!shouldAnimate()) { lastTimestamp = 0; return; }
        var dt = lastTimestamp ? clamp((timestamp - lastTimestamp) / 1000, 0, 0.04) : 0;
        lastTimestamp = timestamp;
        elapsedTime += dt;
        if (dt) { updateMotion(dt); updateTrail(dt); }
        draw();
        scheduleFrame();
    }

    function syncPlayback() {
        if (!shouldAnimate()) {
            if (frameId !== null) { window.cancelAnimationFrame(frameId); frameId = null; }
            lastTimestamp = 0;
        } else { scheduleFrame(); }
    }

    buildAttractor();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", measureObstacles, { passive: true });
    document.addEventListener("visibilitychange", syncPlayback);
    var handlePreference = function (event) {
        reduceMotion = event.matches;
        syncPlayback();
        draw();
    };
    if (motionQuery.addEventListener) { motionQuery.addEventListener("change", handlePreference); }
    else { motionQuery.addListener(handlePreference); }
    if (window.ResizeObserver) {
        var resizeObserver = new ResizeObserver(resize);
        obstacles.forEach(function (element) { resizeObserver.observe(element); });
    }
    if (window.IntersectionObserver) {
        var intersectionObserver = new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            syncPlayback();
        });
        intersectionObserver.observe(hero);
    }
    scheduleFrame();
}());
