var startWorld = function(world, updateMs, canvasDims, context) {
  var canvasWidth = canvasDims['width'],
    canvasHeight = canvasDims['height'],
    rows = canvasDims['rows'],
    cols = canvasDims['cols'],
    colInc = Math.round(canvasWidth / cols),
    rowInc = Math.round(canvasHeight / rows),
    context = canvas.getContext('2d');

  (function seedWorld() {
    var seedGen = [];
    for (var i = 0; i < canvasHeight; i += rowInc) 
      seedGen.push(new Cell(0, i, false));

    seedGen[5].mAlive = true;

    world.seed(seedGen);
  })();
  
  var drawGrid = function(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = '#fff';

    for (var x = 0; x < canvasWidth; x += colInc) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
    }

    for (var y = 0; y < canvasHeight; y += rowInc) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
    }

    ctx.stroke();
  };

  var clearCanvas = function(ctx) {
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  };

  function eventLoop() {
    clearCanvas(context);
    world.draw(context);
    drawGrid(context);
    world.update();
  };

  setInterval(eventLoop, updateMs);
};

