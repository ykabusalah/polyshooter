/**
 * Entry point into the game. Creates the renderer, sets up input handlers,
 * then starts the game loop.
 */

var PS = PS || {};

$(window).load(function() {
    var canvas = document.getElementById('game');
    if (!canvas.getContext) {
        console.log("Unsupported browser!");
        return;
    }

    canvas.focus();

    var canvasWrapper = PS.createCanvasWrapper(canvas);
    var renderer = PS.createRenderer(canvasWrapper);
    var input = PS.registerInput(canvas);

    input.addClickHandler(function() {
        if (PS.gameOver && Date.now() - PS.gameOverTime > 1000) {
            PS.gameOver = false;
            PS.createGameManager(renderer, input);
        }
    });

    renderer.reset();
    renderer.writeSplash();
});
