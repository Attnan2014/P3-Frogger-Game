/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */
var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = 505;
    canvas.height = 600;
    document.getElementById('container').appendChild(canvas);


    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        win.requestAnimationFrame(main);
    };

    function init() {

        reset();
        lastTime = Date.now();
     // Game doesn't start until user clicks button. Rearranges some elements on the page and enable player keypresses.
       document.getElementById('start').onclick = function() {
           main();
           createTimer('timer', 30);
           document.getElementById('timer').style.display = "inline-block";
           document.getElementById('refresh').style.display = "inline-block";
           var h2 = document.getElementById('description');
           h2.parentNode.removeChild(h2);
           var startButton = document.getElementById('start');
           startButton.parentNode.removeChild(startButton);
           keyEnabled = true;
       } 
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions(allEnemies, player);
        reachEnd();
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
    }

    function render() {
       var rowImages = [
                
                'images/stone-block.png',
                'images/stone-block.png',
                'images/water-block.png',
                'images/water-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],

            rowOneImages = [
                'images/water-block.png',
                'images/Gem_Orange.png',
                'images/water-block.png',
                'images/Gem_Orange.png',
                'images/water-block.png'
            ],

            numRows = 6,
            numCols = 5,
            row, col;

        for(row = 0; row < 1; row++) {
            for(col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowOneImages[col]), col*101, row *83);
            }
        }

        for (row = 1; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            } 
        }
        renderEntities();
    }


    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
        roundLife.render();
    }

    function reset() {
       // noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/Gem_Orange.png',
        'images/Star_small.png'    
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
