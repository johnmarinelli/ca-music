function World(graph) {
  this.mGraph = graph;

  this.mCurrentGeneration = 0;

  this.mCellWidth = graph.mColumnWidth;
  this.mCellHeight = graph.mRowHeight;

  // array of arrays to store previously calculated data.
  this.mCells = [];
}

World.prototype.seed = function(cells) {
  this.mCells.push(cells);
};

World.prototype.draw = function(context) {
  var world = this,
      graphColumnWidth = world.mGraph.mColumnWidth,
      graphRowHeight = world.mGraph.mRowHeight;
  
  function paint(x_, y_) {
    // convert cell coordinates to screen coordinates
    var x = x_ * graphColumnWidth,
        y = y_ * graphRowHeight;
    context.fillRect(x, y, world.mCellWidth, world.mCellHeight);
  }

  this.mCells.forEach(function(cellArray) {
    cellArray.forEach(function(cell) {
      if (cell.mAlive) context.fillStyle = '#fff';
      else context.fillStyle = '#000';

      paint(cell.mX, cell.mY);
    });
  });
};

World.prototype.update = function() {
  var newGeneration = [],
    cells = this.mCells,
    lastGeneration = cells[cells.length - 1],
    rowLength = lastGeneration.length,
    i = 0;

  function getNeighborhood(idx, lastGen) {
    var neighbors = [];
    for (var i = -1; i < 2; ++i) neighbors.push(lastGen[idx+i]);
    return neighbors;
  }

  // 010. straight line down.
  function applyRule(idx, lastNeighborhood) {
    if (lastNeighborhood[1].mAlive) {
      newGeneration[idx].mAlive = true;
    }
    else {
      newGeneration[idx].mAlive = false;
    }
  }

  for ( ; i < rowLength; ++i) {
    var cell = lastGeneration[i],
      neighborhood = getNeighborhood(i, lastGeneration);

    newGeneration[i] = new Cell(i * this.mGraph.mColumnWidth, cells.length - 1 * this.mGraph.mRowHeight, false);
    applyRule(i, neighborhood);
  }

  this.mCells.push(newGeneration);
};
