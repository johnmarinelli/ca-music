// 1d world...WITH MUSIC
function MusicalWorld(graph, ruleset, synth) {
  var mSynth = synth;
  Finite1dWorld.call(this, graph, ruleset);

  // Cell Y coord -> pitch
  // Reverse because the cell coordinates go from top to bottom.
  var mCoordinatePitchMap = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
                             'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 
                             'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 
                             'C6', 'D6', 'E6', 'F6', 'G6', 'A6', 'B6']
                              .map(function(e, idx, arr) {
                                return arr[(arr.length - 1) - idx];
                              });

  this.update = function() {
    console.log(Finite1dWorld.prototype.getNumGenerations.call(this));

    if (Finite1dWorld.prototype.getNumGenerations.call(this) > Finite1dWorld.prototype.getMaxGenerations.call(this)) return;

    Finite1dWorld.prototype.incrementNumGenerations.call(this);
    Finite1dWorld.prototype.update.call(this);
    var lastGeneration = this.mCells[this.mCells.length - 1];
    
    var pitches = lastGeneration.map(function(e, idx, arr) {
      var pitch = null;
      if (e.mAlive) {
        pitch = mCoordinatePitchMap[idx]; 
      }
      return pitch;
    });

    pitches.forEach(function(p) {
      if (null !== p) mSynth.play({ pitch: p }); 
    });
  }
}

MusicalWorld.prototype = Object.create(Finite1dWorld.prototype);
MusicalWorld.prototype.constructor = MusicalWorld;

