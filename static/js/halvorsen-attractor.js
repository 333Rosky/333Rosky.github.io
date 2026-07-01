(function () {
    var canvas = document.querySelector("[data-halvorsen-attractor]");
    if (!canvas) {
        return;
    }

    var ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
        return;
    }

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var points = [];
    var radius = 1;
    var drift = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        maxX: 0,
        maxY: 0
    };

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
        var width = Math.max(1, Math.floor(rect.width));
        var height = Math.max(1, Math.floor(rect.height));
        var hero = canvas.closest(".research-hero");
        var heroRect = hero ? hero.getBoundingClientRect() : null;

        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drift.maxX = heroRect ? Math.max(0, heroRect.width * 0.42) : 0;
        drift.maxY = heroRect ? Math.max(0, heroRect.height * 0.16) : 0;
        drift.x = Math.max(-drift.maxX, Math.min(drift.maxX, drift.x));
        drift.y = Math.max(-drift.maxY, Math.min(drift.maxY, drift.y));
        draw(0);
    }

    function project(point, angle, scale, centerX, centerY) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var x = point.x * cos - point.z * sin;
        var z = point.x * sin + point.z * cos;

        return {
            x: centerX + x * scale,
            y: centerY + (point.y * 0.72 + z * 0.22) * scale
        };
    }

    function draw(timestamp) {
        var rect = canvas.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;

        ctx.clearRect(0, 0, width, height);

        if (!points.length) {
            return;
        }

        var angle = reduceMotion ? 0.65 : timestamp * 0.00008;
        var scale = Math.min(width, height) * 0.43 / radius;
        var centerX = width * 0.5;
        var centerY = height * 0.52;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(245, 245, 245, 0.18)";
        ctx.beginPath();

        for (var i = 0; i < points.length; i += 2) {
            var point = project(points[i], angle, scale, centerX, centerY);
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
            var trailPoint = project(points[start + j], angle, scale, centerX, centerY);
            if (j === 0) {
                ctx.moveTo(trailPoint.x, trailPoint.y);
            } else {
                ctx.lineTo(trailPoint.x, trailPoint.y);
            }
        }

        ctx.stroke();
    }

    function moveAttractor(timestamp) {
        if (reduceMotion) {
            return;
        }

        var noiseX = Math.random() - 0.5 + Math.sin(timestamp * 0.00023) * 0.16;
        var noiseY = Math.random() - 0.5 + Math.cos(timestamp * 0.00019) * 0.16;

        drift.vx = (drift.vx + noiseX * 0.035) * 0.992;
        drift.vy = (drift.vy + noiseY * 0.026) * 0.992;
        drift.x += drift.vx;
        drift.y += drift.vy;

        if (Math.abs(drift.x) > drift.maxX) {
            drift.x = Math.max(-drift.maxX, Math.min(drift.maxX, drift.x));
            drift.vx *= -0.42;
        }

        if (Math.abs(drift.y) > drift.maxY) {
            drift.y = Math.max(-drift.maxY, Math.min(drift.maxY, drift.y));
            drift.vy *= -0.42;
        }

        canvas.style.setProperty("--attractor-drift-x", drift.x.toFixed(2) + "px");
        canvas.style.setProperty("--attractor-drift-y", drift.y.toFixed(2) + "px");
    }

    function animate(timestamp) {
        moveAttractor(timestamp || 0);
        draw(timestamp || 0);

        if (!reduceMotion) {
            window.requestAnimationFrame(animate);
        }
    }

    buildAttractor();
    resize();
    window.addEventListener("resize", resize);
    window.requestAnimationFrame(animate);
}());
