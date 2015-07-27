var express = require('express'),
    app = express(),
    http = require('http').Server(app);

// configure express
app.use(express.static('public'));
app.use(express.static('views'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

http.listen(process.env.PORT || 3000, function() {
  console.log('Listening on 3000');
});
