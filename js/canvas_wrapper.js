var PS = PS || {};

(function() {
    PS.WIDTH_TO_HEIGHT_RATIO = 4.0/3;
    var WIDTH_FACTOR = 0.7, HEIGHT_FACTOR = 0.5;

    PS.createCanvasWrapper = function(canvas) {
        context = canvas.getContext("2d");
        context.fillStyle = "rgb(0,0,0)";

        var setCanvasSize = function(width, height) {
            $(canvas).width(width);
            $(canvas).height(height);

            canvas.width = width;
            canvas.height = height;
        }

        var resizeCanvas = function() {
            var displayWidth = window.innerWidth * WIDTH_FACTOR,
                displayHeight = window.innerHeight * HEIGHT_FACTOR;

            if (displayWidth < displayHeight * PS.WIDTH_TO_HEIGHT_RATIO)
                displayHeight = displayWidth / PS.WIDTH_TO_HEIGHT_RATIO;
            else
                displayWidth = displayHeight * PS.WIDTH_TO_HEIGHT_RATIO;

            setCanvasSize(displayWidth, displayHeight);
        };

        return {
            width: function() { return canvas.width; },
            height: function() { return canvas.height; },
            getContext: function() { return context; },
            reset: function() { resizeCanvas(); },

            // for clamping the player
            clampCircle: function(centerX, centerY, radius) {
                var minX = radius / PS.WIDTH_TO_HEIGHT_RATIO;
                var maxX = 1 - minX;

                var x = PS.util.clamp(centerX, minX, maxX);
                var y = PS.util.clamp(centerY, radius, 1 - radius);
                return {x: x, y: y};
            },

            // Whether the circle is fully outside of the bounds. Used for
            // checking whether a bullet should be removed.
            circleIsOutsideBounds: function(centerX, centerY, radius) {
                var minX = -radius / PS.WIDTH_TO_HEIGHT_RATIO;
                var maxX = 1 - minX;

                return centerX <= minX || centerX >= maxX ||
                    centerY <= -radius || centerY >= 1 + radius;
            }
        }
    }
})();
