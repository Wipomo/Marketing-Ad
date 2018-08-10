const express = require('express');
const path = require('path');
const app = express();
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBq45y1WJCQZSY4smNIwLN__ZUNJk1fEMI',
  Promise: Promise
});
// const Promise = require('q').Promise;
const port = process.env.PORT || 5000;

var arrayContaining = null;
var objectContaining = null;

// it('gets autocomplete predictions for places', function(done) {
googleMapsClient.placesAutoComplete({
  input: '1315 Sea Vill',
  language: 'en',
  components: {country: 'us'},
  type: 'address'
})
.asPromise()
.then(function(response) {

  console.log(response.json.results);

  expect(response.json.predictions).toEqual(
      arrayContaining([
        objectContaining({
          terms: arrayContaining([
            objectContaining({
              value: 'NY'
            })
          ])
        })
      ]));
    })
.catch((err)=>{
  console.log(err);
})
.then(done, fail);
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