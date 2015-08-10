// 1d world that will only have n generations
function Finite1dWorld(graph, ruleset) {
  this.mNumGenerations = 0,
  this.mMaxGenerations = 1;
  World.call(this, graph, ruleset);

  this.update = function() {
    World.prototype.update.call(this); 
  }

}

Finite1dWorld.prototype = Object.create(World.prototype);
Finite1dWorld.prototype.constructor = Finite1dWorld;
Finite1dWorld.prototype.incrementNumGenerations = function() {
  this.mNumGenerations++;
}

Finite1dWorld.prototype.getNumGenerations = function() {
  return this.mNumGenerations;
}

Finite1dWorld.prototype.getMaxGenerations = function() {
  return this.mMaxGenerations;
}

Finite1dWorld.prototype.setMaxGenerations = function(generations) {
  this.mMaxGenerations = generations;
}
