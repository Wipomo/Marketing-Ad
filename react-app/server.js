const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'src')));
//app.use(express.static('src'));
app.use(express.static(path.join(__dirname, 'src')));


app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname));
});

app.get('/src', function (req, res) {
    res.sendFile(path.join(__dirname));
  });

app.listen(PORT, ()=>console.log(`Listening on ${ PORT }`));