(function () {
    var canvas = document.querySelector("[data-halvorsen-attractor]");
    if (!canvas) {
        return;
    }

    var ctx = canvas.getContext("2d", { alpha: true });
    var hero = canvas.closest(".research-hero");
    var copy = hero ? hero.querySelector(".research-hero__copy") : null;
    var portrait = hero ? hero.querySelector(".research-portrait") : null;
    if (!ctx || !hero) {
        return;
    }

    var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var reduceMotion = motionQuery.matches;
    var points = [];
    var radius = 1;
    var dpr = 1;
    var layout = {
        width: 1,
        height: 1,
        visualSize: 320,
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
        protectedAreas: []
    };
    var motion = {
        x: 0,
        y: 0,
        vx: 18,
        vy: -11,
        initialized: false,
        lastTimestamp: 0
    };

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
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

    function resize() {
        var rect = canvas.getBoundingClientRect();
        var previousWidth = layout.width;
        var previousHeight = layout.height;

        layout.width = Math.max(1, Math.floor(rect.width));
        layout.height = Math.max(1, Math.floor(rect.height));
        layout.visualSize = clamp(
            Math.min(layout.width, layout.height) * (layout.width <= 640 ? 0.58 : 0.68),
            layout.width <= 640 ? 230 : 300,
            layout.width <= 640 ? 330 : 540
        );

        var visibleMargin = layout.visualSize * 0.28;
        layout.minX = visibleMargin;
        layout.maxX = Math.max(layout.minX, layout.width - visibleMargin);
        layout.minY = visibleMargin;
        layout.maxY = Math.max(layout.minY, layout.height - visibleMargin);

        if (!motion.initialized) {
            motion.x = layout.width * (layout.width <= 640 ? 0.72 : 0.62);
            motion.y = layout.height * 0.48;
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
        layout.protectedAreas = [
            measureProtectedArea(copy, window.innerWidth <= 640 ? 12 : 20),
            measureProtectedArea(portrait, 10)
        ].filter(Boolean);
        if (layout.width <= 640 && layout.protectedAreas[0]) {
            layout.minY = Math.min(
                layout.maxY,
                Math.max(
                    layout.minY,
                    layout.protectedAreas[0].y + layout.protectedAreas[0].height + visibleMargin * 0.18
                )
            );
            motion.y = clamp(motion.y, layout.minY, layout.maxY);
        }
        draw(0);
    }

    function project(point, angle, scale) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var x = point.x * cos - point.z * sin;
        var z = point.x * sin + point.z * cos;

        return {
            x: motion.x + x * scale,
            y: motion.y + (point.y * 0.72 + z * 0.22) * scale
        };
    }

    function measureProtectedArea(element, padding) {
        if (!element || window.getComputedStyle(element).display === "none") {
            return null;
        }

        var canvasRect = canvas.getBoundingClientRect();
        var elementRect = element.getBoundingClientRect();
        return {
            x: elementRect.left - canvasRect.left - padding,
            y: elementRect.top - canvasRect.top - padding,
            width: elementRect.width + padding * 2,
            height: elementRect.height + padding * 2
        };
    }

    function eraseProtectedArea(area) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0, 0, 0, 0.96)";
        ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
        ctx.shadowBlur = 26;
        ctx.fillRect(area.x, area.y, area.width, area.height);
        ctx.restore();
    }

    function draw(timestamp) {
        ctx.clearRect(0, 0, layout.width, layout.height);
        if (!points.length) {
            return;
        }

        var angle = reduceMotion ? 0.65 : timestamp * 0.00008;
        var scale = layout.visualSize * 0.43 / radius;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(245, 245, 245, 0.18)";
        ctx.beginPath();

        for (var i = 0; i < points.length; i += 2) {
            var point = project(points[i], angle, scale);
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }

        ctx.stroke();

        var span = Math.min(740, points.length - 1);
        var limit = points.length - span;
        var start = reduceMotion ? Math.floor(limit * 0.62) : Math.floor((timestamp * 0.05) % limit);

        ctx.lineWidth = 1.25;
        ctx.strokeStyle = "rgba(245, 245, 245, 0.58)";
        ctx.beginPath();

        for (var j = 0; j < span; j += 2) {
            var trailPoint = project(points[start + j], angle, scale);
            if (j === 0) {
                ctx.moveTo(trailPoint.x, trailPoint.y);
            } else {
                ctx.lineTo(trailPoint.x, trailPoint.y);
            }
        }

        ctx.stroke();
        layout.protectedAreas.forEach(eraseProtectedArea);
    }

    function updateMotion(timestamp) {
        if (reduceMotion) {
            motion.x = layout.width * (layout.width <= 640 ? 0.76 : 0.62);
            motion.y = clamp(
                layout.height * (layout.width <= 640 ? 0.62 : 0.48),
                layout.minY,
                layout.maxY
            );
            return;
        }

        var elapsed = motion.lastTimestamp ? (timestamp - motion.lastTimestamp) / 1000 : 0;
        var dt = clamp(elapsed, 0, 0.04);
        motion.lastTimestamp = timestamp;
        if (!dt) {
            return;
        }

        var range = Math.max(layout.maxX - layout.minX, layout.maxY - layout.minY, 1);
        var pace = clamp(range / 560, 0.55, 1.25);
        var noise = 34 * pace;
        var friction = Math.exp(-0.72 * dt);
        var centerPull = 0.012;
        var centerX = (layout.minX + layout.maxX) * 0.5;
        var centerY = (layout.minY + layout.maxY) * 0.5;

        motion.vx += (Math.random() - 0.5) * noise * Math.sqrt(dt);
        motion.vy += (Math.random() - 0.5) * noise * Math.sqrt(dt);
        motion.vx += (centerX - motion.x) * centerPull * dt;
        motion.vy += (centerY - motion.y) * centerPull * dt;
        motion.vx *= friction;
        motion.vy *= friction;

        var maxSpeed = 28 * pace;
        var speed = Math.hypot(motion.vx, motion.vy);
        if (speed > maxSpeed) {
            motion.vx = motion.vx / speed * maxSpeed;
            motion.vy = motion.vy / speed * maxSpeed;
        }

        motion.x += motion.vx * dt;
        motion.y += motion.vy * dt;

        if (motion.x <= layout.minX || motion.x >= layout.maxX) {
            motion.x = clamp(motion.x, layout.minX, layout.maxX);
            motion.vx *= -0.82;
        }
        if (motion.y <= layout.minY || motion.y >= layout.maxY) {
            motion.y = clamp(motion.y, layout.minY, layout.maxY);
            motion.vy *= -0.82;
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
    motionQuery.addEventListener("change", handleMotionPreference);
    window.requestAnimationFrame(animate);
}());
