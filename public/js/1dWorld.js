function World(graph, ruleset) {
  this.mGraph = graph;

  this.mCurrentGeneration = 0;

  this.mCellWidth = graph.mColumnWidth;
  this.mCellHeight = graph.mRowHeight;

  // array of arrays to store previously calculated data.
  this.mCells = [];

  this.mRuleset = ruleset;
}

World.prototype.seed = function(cells) {
  this.mCells.push(cells);
};

World.prototype.draw = function(context) {
  var world = this,
      graphColumnWidth = world.mGraph.mColumnWidth,
      graphRowHeight = world.mGraph.mRowHeight;
  
  function paint(x, y) {
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
    ruleset = this.mRuleset,
    lastGeneration = cells[cells.length - 1],
    rowLength = lastGeneration.length,
    i = 0;

  function getNeighborhood(idx, lastGen) {
    var neighbors = [];
    for (var i = -1; i < 2; ++i) neighbors.push(lastGen[idx+i]);
    return neighbors.map(function (i) {
      return undefined === i ? new Cell(-1, -1, false) : i;
    });
  }

  function applyRule(idx, lastNeighborhood) {
    newGeneration[idx].mAlive = ruleset.applyRule(lastNeighborhood);
  }

  for ( ; i < rowLength; ++i) {
    var cell = lastGeneration[i],
      neighborhood = getNeighborhood(i, lastGeneration);

    // NOTE: the x axis is time instead of traditional y axis
    newGeneration[i] = new Cell((cells.length - 1) * this.mGraph.mColumnWidth, i * this.mGraph.mRowHeight, false);
    applyRule(i, neighborhood);
  }

  this.mCells.push(newGeneration);
  if (this.mCells.length > this.mGraph.Cols) this.mCells.shift();
};

World.prototype.setRuleset = function(ruleset) {
  this.mRuleset = ruleset; 
}
