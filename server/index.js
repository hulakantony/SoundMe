var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/api/status/', function (req, res) {
  console.log('status');
  return res.status(200).send({});
});

app.get('/api/callback/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'html', 'callback.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(8081, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return err;
  }

  console.log('Listening at localhost:8081');
});
