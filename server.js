const express = require('express');
const path = require('path');
const app = express();
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBq45y1WJCQZSY4smNIwLN__ZUNJk1fEMI',
  // Promise: Promise
});
const port = process.env.PORT || 5000;
const { Pool } = require('pg');
const config = {
  host: 'ec2-107-21-98-165.compute-1.amazonaws.com',
  user: 'mtaeawejracytu',
  database: 'dc31esd7lno8fu',
  password: 'b82c2c1930f765df663ea587dba3d3a9f9a1e0065badbb08f0fff66e67ac1e5c',
  port: 5432
};
var arrayContaining = null;
var objectContaining = null;

// it('gets autocomplete predictions for places', function(done) {
// googleMapsClient.placesAutoComplete({
//   input: '1315 Sea Vill',
//   language: 'en',
//   components: {country: 'us'},
//   type: 'address'
// })

// .asPromise()
// .then(function(response) {

//   console.log(response.json.results);

//   expect(response.json.predictions).toEqual(
//       arrayContaining([
//         objectContaining({
//           terms: arrayContaining([
//             objectContaining({
//               value: 'NY'
//             })
//           ])
//         })
//       ]));
//     })
// .catch((err)=>{
//   console.log(err);
// })
// .then(done, fail);

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'src')));
//app.use(express.static('src'));
// app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html' ));
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/public')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
  });
}

app.get('/db/:bill_amt/:sys_size', (req, res, next) => {
  //console.log("Attempt to Starts db func");
  // Get a Postgres client from the connection pool
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    values = [req.params.bill_amt, req.params.sys_size];
    // SQL Query > Select Data
    console.log("Gets in page savings route, now querying for chart and customer");
    client.query(`SELECT yr1, yr2, yr3, yr4, yr5, yr6, yr7, yr8, yr9, yr10 FROM cumulative_cash_flow_temp AS c
INNER JOIN buckets AS b ON b.id = c.bucket_id
WHERE b.billing_amt = $1 AND b.system_size = $2`, values)
      .then(result => {
        res.send(result.rows);
      })
      .catch(e => console.error('querying error', e.stack))
      .then(() => release())

    console.log("Comes in here for once");
    values = [1, "Foo", "Bar", "foo@bar.com", 420];
    client.query(`INSERT INTO customers (customer_id, customer_first_name, customer_last_name, customer_email, customer_monthly)
VALUES ($1, $2, $3, $4, $5)`, values, function (err, rows, fields) {
      if (err) {
        console.log('Connection result error' + err);
      } else {
        console.log("------------NO ERROR")
      }

    })

  })
})

.get('/db/:bucket', function (req, res) {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    values = [req.params.bucket];
    // SQL Query > Select Data
    console.log("Gets in DB route func now querying for percentage");

    client.query(`SELECT max_discount_percentage FROM buckets AS b
 WHERE b.billing_amt = $1 LIMIT 1`, values)
      .then(result => {
        console.log("------------------------------------------------------------------------------");
        console.log(result.rows);
        res.send(result.rows);
      })
      .catch(e => console.error('querying error', e.stack))
      .then(() => release())
  })
})



app.get('/src', function (req, res) {
    res.sendFile(path.join(__dirname));
  });

app.listen(port, () => console.log(`Listening on port ${port}`));