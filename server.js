const express = require('express');
const path = require('path');
const app = express();
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

const port = process.env.PORT || 3000;
const { Pool } = require('pg');
const config = {
  host: 'ec2-107-21-98-165.compute-1.amazonaws.com',
  user: 'mtaeawejracytu',
  database: 'dc31esd7lno8fu',
  password: 'b82c2c1930f765df663ea587dba3d3a9f9a1e0065badbb08f0fff66e67ac1e5c',
  port: 5432,
  ssl: true
};

const pool = new Pool(config);

app.use(express.static(path.join(__dirname,'client/build' )));
// app.use(express.static(path.join(__dirname,'client/src' )));



passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://makellozohotestenv.herokuapp.com',
    tokenURL: 'https://makellozohotestenv.herokuapp.como/auth2/token',
    clientID: '1000.B5O5FWS6VAMR49412JT11M8UYNN7YH',
    clientSecret: '0c0a05dcdf9c950cc07a4eb1acdba3a885046f154a',
    callbackURL: 'https://makellozohotestenv.herokuapp.com/redirect'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("Calls passport call back");
    User.findOrCreate(function(err, user) {
      done(err, user);
    });
  }
));

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback',
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));


app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'client/public/'));
  next();
});

app.get('/', function (req, res, next) {
  console.log("Comes in here too");
  res.sendFile(path.join(__dirname, 'client/public/build/static/js'));
  next();
});



// app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname, '/client/public/' ));
// });

// app.get('/client/src/*', function (req, res) {
//   console.log("comes in here");
//   res.sendFile(path.join(__dirname, '/client/src/', req.params[0] ));
// });

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/db', (req, res) => {
  console.log("Comes in here, displayed in terminal");
})

// app.get('*', function (req, res) {
//   res.send({ express: 'Hello From Express' });
//   // res.sendFile(path.join(__dirname, '/client/public' ));
// });

if (process.env.NODE_ENV === 'production') {
  console.log("In production");
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
else{
  console.log("Not in production settings");
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

app.get('/db/:bucket', function (req, res) {
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

// Listen to POST requests on particular link
app.get('/db_customer_posts', (req, res)=>{
//   console.log("At least gets in post method..");
//   db.tx(t => {
//    console.log("gets into db transaction");
//    return t.none(`INSERT INTO customers(customer_id, full_name, email, monthly_bill, full_address, contact_number, daily_mileage, miles_per_gallon, vehicle_model, vehicle_make ) values($1, $2, $3, $4, $5, $6, $7, %8, $9, $10)`,
//    [ 2, 'test_name', 'test_email', 2000, '1 Address Way', 858, 10, 50, 'Vehicle Model', 'Vehicle Make'])
//      .then(()=>{
//          console.log("Entered database!");
//      })
//      .catch(error=>{
//        console.log("Database ERROR...");
//        console.log('ERROR:', error); // print the error;
//      })
//      .finally(db.$pool.end);
//    });

  console.log("Gets into db call method");
  pool.connect((err, client, release) => {
   if (err) {
     return console.error('Error acquiring client', err.stack)
   }
   // SQL Query > Select Data
   client.query(`INSERT INTO customers(customer_id, full_name, email, monthly_bill, full_address, contact_number, daily_mileage, miles_per_gallon, vehicle_model, vehicle_make ) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
     [ 2, 'test_name', 'test_email', 2000, '1 Address Way', 858, 10, 50, 'Vehicle Model', 'Vehicle Make'])
       .then(()=>{
           console.log("Entered database!");
       })
       .catch(error=>{
         console.log("Database ERROR...");
         console.log('ERROR:', error); // print the error;
       })
       .then(() => release())
       //.finally(db.$pool.end);
   })
})




app.listen(port, () => console.log(`Listening on port ${port}`));