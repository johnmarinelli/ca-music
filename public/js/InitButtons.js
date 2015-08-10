var initStartButton = function(startButton, cb) {
  startButton.onclick = cb;
};

var initRulesets = function(rulesets, cb) {
  var i = 0,
    len = rulesets.length;

  for ( ; i < len; ++i) rulesets[i].onclick = cb;
};
