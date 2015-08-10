function Rule30() {
  var applyRule = function(lastGen) {
    var left = lastGen[0],
      mid = lastGen[1],
      right = lastGen[2],
      isAlive = false;

    if ((left.mAlive && !mid.mAlive && !right.mAlive) ||
        (!left.mAlive && mid.mAlive && right.mAlive) ||
        (!left.mAlive && mid.mAlive && !right.mAlive) ||
        (!left.mAlive && !mid.mAlive && right.mAlive)) isAlive = true;
    else if ((left.mAlive && mid.mAlive && right.mAlive) ||
             (left.mAlive && mid.mAlive && !right.mAlive) ||
             (left.mAlive && !mid.mAlive && right.mAlive) ||
             (!left.mAlive && !mid.mAlive && !right.mAlive)) isAlive = false;

    return isAlive;
  };

  return {
    applyRule: applyRule
  };
};

