// 1d world that will only have n generations
function Finite1dWorld(graph) {
  var self = this,
    mNumGenerations = 0,
    mMaxGenerations = 1;
  World.call(self, graph);

  var baseUpdate = self.update;
  self.update = function() {
    if (mNumGenerations++ < mMaxGenerations) {
      World.prototype.update.call(this); 
    }
  }
}

Finite1dWorld.prototype = Object.create(World.prototype);
Finite1dWorld.prototype.constructor = Finite1dWorld;
Finite1dWorld.prototype.setMaxGenerations = function(generations) {
  this.mMaxGenerations = generations;
}
