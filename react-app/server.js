const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'src')));
//app.use(express.static('src'));
// app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname));
});

app.get('/src', function (req, res) {
    res.sendFile(path.join(__dirname));
  });

app.listen(port, () => console.log(`Listening on port ${port}`));