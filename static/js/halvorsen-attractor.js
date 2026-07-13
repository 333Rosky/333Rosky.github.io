(function () {
    var canvas = document.querySelector("[data-halvorsen-attractor]");
    if (!canvas) {
        return;
    }

    var ctx = canvas.getContext("2d", { alpha: true });
    var hero = canvas.closest(".research-stage");
    var copy = hero ? hero.querySelector(".research-identity") : null;
    var profile = hero ? hero.querySelector(".research-profile") : null;
    if (!ctx || !hero) {
        return;
    }

    var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var reduceMotion = motionQuery.matches;
    var points = [];
    var radius = 1;
    var dpr = 1;
    var spareGaussian = null;
    var regimes = [
        { theta: 0.34, sigma: 19, driftSpeed: 48, rho: 0.12, meanDuration: 12 },
        { theta: 0.92, sigma: 43, driftSpeed: 22, rho: -0.42, meanDuration: 8 },
        { theta: 0.56, sigma: 29, driftSpeed: 38, rho: 0.58, meanDuration: 10 }
    ];
    var layout = {
        width: 1,
        height: 1,
        visualSize: 320,
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
        obstacles: []
    };
    var motion = {
        x: 0,
        y: 0,
        vx: 24,
        vy: -14,
        meanVx: 0,
        meanVy: 0,
        regime: 0,
        nextRegimeAt: 0,
        initialized: false,
        lastTimestamp: 0
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

        var u = 0;
        var v = 0;
        while (!u) {
            u = Math.random();
        }
        while (!v) {
            v = Math.random();
        }

        var magnitude = Math.sqrt(-2 * Math.log(u));
        var angle = 2 * Math.PI * v;
        spareGaussian = magnitude * Math.sin(angle);
        return magnitude * Math.cos(angle);
    }

    function buildAttractor() {
        var a = 1.4;
        var dt = 0.0045;
        var x = 0.1;
        var y = 0;
        var z = 0;
        var next = [];
        var maxRadius = 1;

        for (var i = 0; i < 9000; i += 1) {
            var dx = -a * x - 4 * y - 4 * z - y * y;
            var dy = -a * y - 4 * z - 4 * x - z * z;
            var dz = -a * z - 4 * x - 4 * y - x * x;

            x += dx * dt;
            y += dy * dt;
            z += dz * dt;

            if (i <= 400 || !Number.isFinite(x + y + z)) {
                continue;
            }

            next.push({ x: x, y: y, z: z });
            maxRadius = Math.max(maxRadius, Math.abs(x), Math.abs(y), Math.abs(z));
        }

        points = next;
        radius = maxRadius;
    }

    function measureObstacle(element, padding) {
        if (!element || window.getComputedStyle(element).display === "none") {
            return null;
        }

        var canvasRect = canvas.getBoundingClientRect();
        var rect = element.getBoundingClientRect();
        return {
            left: rect.left - canvasRect.left - padding,
            right: rect.right - canvasRect.left + padding,
            top: rect.top - canvasRect.top - padding,
            bottom: rect.bottom - canvasRect.top + padding
        };
    }

    function resize() {
        var rect = canvas.getBoundingClientRect();
        var previousWidth = layout.width;
        var previousHeight = layout.height;

        layout.width = Math.max(1, Math.floor(rect.width));
        layout.height = Math.max(1, Math.floor(rect.height));
        layout.visualSize = clamp(
            Math.min(layout.width, layout.height) * (layout.width <= 640 ? 0.55 : 0.58),
            layout.width <= 640 ? 230 : 320,
            layout.width <= 640 ? 330 : 560
        );

        var visibleMargin = layout.visualSize * 0.32;
        layout.minX = visibleMargin;
        layout.maxX = Math.max(layout.minX, layout.width - visibleMargin);
        layout.minY = visibleMargin;
        layout.maxY = Math.max(layout.minY, layout.height - visibleMargin);
        layout.obstacles = [
            measureObstacle(copy, layout.width <= 640 ? 12 : 24),
            measureObstacle(profile, 16)
        ].filter(Boolean);

        if (layout.width <= 640 && layout.obstacles[0]) {
            layout.minY = Math.min(
                layout.maxY,
                Math.max(layout.minY, layout.obstacles[0].bottom + layout.visualSize * 0.24)
            );
        }

        if (!motion.initialized) {
            motion.x = layout.width * (layout.width <= 640 ? 0.66 : 0.58);
            motion.y = layout.height * (layout.width <= 640 ? 0.66 : 0.32);
            motion.initialized = true;
        } else {
            motion.x *= layout.width / Math.max(previousWidth, 1);
            motion.y *= layout.height / Math.max(previousHeight, 1);
        }

        motion.x = clamp(motion.x, layout.minX, layout.maxX);
        motion.y = clamp(motion.y, layout.minY, layout.maxY);

        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(layout.width * dpr);
        canvas.height = Math.floor(layout.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw(0);
    }

    function switchRegime(timestamp, initial) {
        var nextRegime = initial ? Math.floor(Math.random() * regimes.length) : motion.regime;
        if (!initial) {
            while (nextRegime === motion.regime) {
                nextRegime = Math.floor(Math.random() * regimes.length);
            }
        }

        motion.regime = nextRegime;
        var regime = regimes[nextRegime];
        var viewportPace = clamp(Math.sqrt(layout.width * layout.height) / 980, 0.72, 1.35);
        var direction = Math.random() * Math.PI * 2;
        var driftSpeed = regime.driftSpeed * viewportPace;

        motion.meanVx = Math.cos(direction) * driftSpeed;
        motion.meanVy = Math.sin(direction) * driftSpeed;

        var holdingTime = -Math.log(Math.max(Math.random(), 0.000001)) * regime.meanDuration;
        motion.nextRegimeAt = timestamp + clamp(holdingTime, 5.5, 18) * 1000;
        canvas.dataset.regime = String(nextRegime + 1);
    }

    function orientation(timestamp) {
        if (reduceMotion) {
            return { yaw: 0.65, pitch: -0.08, roll: 0.04 };
        }

        return {
            yaw: timestamp * 0.000055,
            pitch: -0.08 + Math.sin(timestamp * 0.000071) * 0.22,
            roll: Math.sin(timestamp * 0.000037 + 1.7) * 0.1 + Math.atan2(motion.vy, motion.vx) * 0.035
        };
    }

    function project(point, rotation, scale) {
        var cosYaw = Math.cos(rotation.yaw);
        var sinYaw = Math.sin(rotation.yaw);
        var cosPitch = Math.cos(rotation.pitch);
        var sinPitch = Math.sin(rotation.pitch);
        var cosRoll = Math.cos(rotation.roll);
        var sinRoll = Math.sin(rotation.roll);

        var x1 = point.x * cosYaw - point.z * sinYaw;
        var z1 = point.x * sinYaw + point.z * cosYaw;
        var y2 = point.y * cosPitch - z1 * sinPitch;
        var z2 = point.y * sinPitch + z1 * cosPitch;
        var x3 = x1 * cosRoll - y2 * sinRoll;
        var y3 = x1 * sinRoll + y2 * cosRoll;
        var perspective = clamp(1 + z2 / radius * 0.055, 0.92, 1.08);

        return {
            x: motion.x + x3 * scale * perspective,
            y: motion.y + y3 * scale * 0.86 * perspective
        };
    }

    function draw(timestamp) {
        ctx.clearRect(0, 0, layout.width, layout.height);
        if (!points.length) {
            return;
        }

        var rotation = orientation(timestamp);
        var scale = layout.visualSize * 0.43 / radius;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = "rgba(245, 245, 245, 0.19)";
        ctx.beginPath();

        for (var i = 0; i < points.length; i += 2) {
            var point = project(points[i], rotation, scale);
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }

        ctx.stroke();

        var span = Math.min(860, points.length - 1);
        var limit = points.length - span;
        var start = reduceMotion ? Math.floor(limit * 0.62) : Math.floor((timestamp * 0.052) % limit);

        ctx.lineWidth = 1.3;
        ctx.strokeStyle = "rgba(245, 245, 245, 0.72)";
        ctx.beginPath();
        var head = null;

        for (var j = 0; j < span; j += 2) {
            var trailPoint = project(points[start + j], rotation, scale);
            head = trailPoint;
            if (j === 0) {
                ctx.moveTo(trailPoint.x, trailPoint.y);
            } else {
                ctx.lineTo(trailPoint.x, trailPoint.y);
            }
        }

        ctx.stroke();
        if (head) {
            ctx.fillStyle = "rgba(245, 245, 245, 0.86)";
            ctx.beginPath();
            ctx.arc(head.x, head.y, 1.6, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function wallForce(position, min, max, band, strength) {
        var lowerDistance = position - min;
        if (lowerDistance < band) {
            return strength * Math.pow(1 - Math.max(0, lowerDistance) / band, 2);
        }

        var upperDistance = max - position;
        if (upperDistance < band) {
            return -strength * Math.pow(1 - Math.max(0, upperDistance) / band, 2);
        }

        return 0;
    }

    function applyObstacleForce(obstacle, dt) {
        var nearestX = clamp(motion.x, obstacle.left, obstacle.right);
        var nearestY = clamp(motion.y, obstacle.top, obstacle.bottom);
        var dx = motion.x - nearestX;
        var dy = motion.y - nearestY;
        var distance = Math.hypot(dx, dy);
        var clearance = layout.visualSize * 0.43;

        if (distance >= clearance) {
            return;
        }

        if (distance < 1) {
            dx = motion.x - (obstacle.left + obstacle.right) * 0.5;
            dy = motion.y - (obstacle.top + obstacle.bottom) * 0.5;
            distance = Math.hypot(dx, dy);
            if (distance < 1) {
                dx = 0;
                dy = -1;
                distance = 1;
            }
        }

        var weight = Math.pow(1 - distance / clearance, 2);
        var force = 145 * weight;
        motion.vx += dx / distance * force * dt;
        motion.vy += dy / distance * force * dt;
    }

    function updateMotion(timestamp) {
        if (reduceMotion) {
            motion.x = layout.width * (layout.width <= 640 ? 0.7 : 0.58);
            motion.y = clamp(
                layout.height * (layout.width <= 640 ? 0.66 : 0.32),
                layout.minY,
                layout.maxY
            );
            return;
        }

        if (!motion.nextRegimeAt || timestamp >= motion.nextRegimeAt) {
            switchRegime(timestamp, !motion.nextRegimeAt);
        }

        var elapsed = motion.lastTimestamp ? (timestamp - motion.lastTimestamp) / 1000 : 0;
        var dt = clamp(elapsed, 0, 0.04);
        motion.lastTimestamp = timestamp;
        if (!dt) {
            return;
        }

        var regime = regimes[motion.regime];
        var viewportPace = clamp(Math.sqrt(layout.width * layout.height) / 980, 0.72, 1.35);
        var z1 = gaussian();
        var z2 = gaussian();
        var correlatedZ2 = regime.rho * z1 + Math.sqrt(1 - regime.rho * regime.rho) * z2;
        var diffusion = regime.sigma * viewportPace * Math.sqrt(dt);

        motion.vx += regime.theta * (motion.meanVx - motion.vx) * dt + diffusion * z1;
        motion.vy += regime.theta * (motion.meanVy - motion.vy) * dt + diffusion * correlatedZ2;

        var wallBand = layout.visualSize * 0.48;
        motion.vx += wallForce(motion.x, layout.minX, layout.maxX, wallBand, 95) * dt;
        motion.vy += wallForce(motion.y, layout.minY, layout.maxY, wallBand, 95) * dt;
        layout.obstacles.forEach(function (obstacle) {
            applyObstacleForce(obstacle, dt);
        });

        var maxSpeed = 86 * viewportPace;
        var speed = Math.hypot(motion.vx, motion.vy);
        if (speed > maxSpeed) {
            motion.vx = motion.vx / speed * maxSpeed;
            motion.vy = motion.vy / speed * maxSpeed;
        }

        motion.x += motion.vx * dt;
        motion.y += motion.vy * dt;

        if (motion.x <= layout.minX) {
            motion.x = layout.minX;
            motion.vx = Math.abs(motion.vx) * 0.68;
            motion.meanVx = Math.abs(motion.meanVx);
        } else if (motion.x >= layout.maxX) {
            motion.x = layout.maxX;
            motion.vx = -Math.abs(motion.vx) * 0.68;
            motion.meanVx = -Math.abs(motion.meanVx);
        }

        if (motion.y <= layout.minY) {
            motion.y = layout.minY;
            motion.vy = Math.abs(motion.vy) * 0.68;
            motion.meanVy = Math.abs(motion.meanVy);
        } else if (motion.y >= layout.maxY) {
            motion.y = layout.maxY;
            motion.vy = -Math.abs(motion.vy) * 0.68;
            motion.meanVy = -Math.abs(motion.meanVy);
        }
    }

    function animate(timestamp) {
        if (!document.hidden) {
            updateMotion(timestamp || 0);
            draw(timestamp || 0);
        } else {
            motion.lastTimestamp = 0;
        }

        if (!reduceMotion) {
            window.requestAnimationFrame(animate);
        }
    }

    function handleMotionPreference(event) {
        reduceMotion = event.matches;
        motion.lastTimestamp = 0;
        motion.nextRegimeAt = 0;
        if (reduceMotion) {
            updateMotion(0);
            draw(0);
        } else {
            window.requestAnimationFrame(animate);
        }
    }

    buildAttractor();
    resize();
    window.addEventListener("resize", resize);
    if (motionQuery.addEventListener) {
        motionQuery.addEventListener("change", handleMotionPreference);
    } else {
        motionQuery.addListener(handleMotionPreference);
    }
    window.requestAnimationFrame(animate);
}());
