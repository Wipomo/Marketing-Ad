const express = require('express');
const router = express.Router();
var ZCRMRestClient = require('zcrmsdk');
var https = require('https');


router.get('/', (req,res)=>{
    console.log("Zoho call to redirect to a url giving OAuth authentication");
    //User sends the request id to cancel the verification request
    https.get('https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.leads.READ,ZohoCRM.modules.leads.CREATE,ZohoCRM.modules.leads.UPDATE&client_id=1000.R92MY46KXLMN671075IM4DH39E84T5&response_type=code&access_type=online&redirect_uri=https://makeitlow-makello-server-stage.herokuapp.com/redirect', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    console.log(res.headers["location"]);
    
    let error;
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }

    if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
        const parsedData = JSON.parse(rawData);
        console.log(rawData);
        } catch (e) {
        console.error(e.message);
        }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });

})

router.get('/redirect', (req,res)=>{
    console.log("accepts Redirect request to which Zoho Accounts redirects you with a grant token(code) after successful authentication");
    //User sends the request id to cancel the verification request
    console.log("Code: " + req.params.code);
    console.log("Account Server: " + req.params.accounts-server);
})

router.get('/redirect/:code/:location/:accounts-server', (req,res)=>{
    console.log("accepts Redirect request to which Zoho Accounts redirects you with a grant token(code) after successful authentication");
    //User sends the request id to cancel the verification request
    console.log("Code: " + req.params.code);
    console.log("Account Server: " + req.params.accounts-server);
})


router.get('/authorize_request', (req,res)=>{
    console.log("Redirect link to which Zoho Accounts redirects you with a grant token(code) after successful authentication");
    //User sends the request id to cancel the verification request

    let grant_type = req.body.grant_type;
    let client_id = req.body.client_id;
    let client_secret = req.body.client_secret;
    let redirect_uri = req.body.redirect_uri;
    let code = req.body.code;
    console.log("Request: " + req);
    console.log("Response: " + res);

})


router.post('', (req,res)=>{
    https://accounts.zoho.com/oauth/v2/token?code=1000.d83951050d65b33af0d3808cd5c69047.93a83287ce5b284619634b119171c071&redirect_uri=https://makello-zoho-testform.herokuapp.com/redirect&client_id=1000.B5O5FWS6VAMR49412JT11M8UYNN7YH&client_secret=0c0a05dcdf9c950cc07a4eb1acdba3a885046f154a&grant_type=authorization_code
    // Pass below params in the body of request
    let grant_type = req.body.grant_type;
    let client_id = req.body.client_id;
    let client_secret = req.body.client_secret;
    let redirect_uri = req.body.redirect_uri;
    let code = req.body.code;

    '/{Accounts_URL}/oauth/v2/token'

    console.log("Redirect link to which Zoho Accounts redirects you with a grant token(code) after successful authentication");
    //User sends the request id to cancel the verification request
    console.log("Request: " + req);
    // Response parameters on succcess contain the following
    // access_token, refresh_token expires_in_sec api_domian token_type and expires_in 
    console.log("Response: " + res);

})
   
router.post('/redirect/{Accounts_URL}/oauth/v2/token', (req,res)=>{
    // Pass below params in the body of request
    let grant_type = req.body.grant_type;
    let client_id = req.body.client_id;
    let client_secret = req.body.client_secret;
    let redirect_uri = req.body.redirect_uri;
    let code = req.body.code;


    console.log("Redirect link to which Zoho Accounts redirects you with a grant token(code) after successful authentication");
    //User sends the request id to cancel the verification request
    console.log("Request: " + req);
    // Response parameters on succcess contain the following
    // access_token, refresh_token expires_in_sec api_domian token_type and expires_in 
    console.log("Response: " + res);
})https://help.zoho.com/portal/kb/articles/nodejs-sdk-initialization#Generating_self-authorized_grant_and_refresh_tokenhttps://help.zoho.com/portal/kb/articles/nodejs-sdk-initialization#Generating_self-authorized_grant_and_refresh_token

// var input ={};
// input.module = "Leads";
// var params = {};
// params.name = 0;
// params.email = 5;
// params.phone = 0;
// input.params = params;
var user_identifier= 'charlie@wipomo.com';


ZCRMRestClient.initialize().then(function()
{
//do whatever required after initialize
// potentially create generated, 'code' for zoho authorization, to be passed to
// dom(ain-specific Zoho Accounts URL to generate access and refresh tokens.
console.log("Automatic INITIALIZATION!");
})
.catch(function(){
    console.log("Failed to INITIALIZATION!");

})

ZCRMRestClient.generateAuthTokens(user_identifier,grant_token).then(function(auth_response){
    console.log("access token :"+auth_response.access_token);
    console.log("refresh token :"+auth_response.refresh_token);
    console.log("expires in :"+auth_response.expires_in);
    }
);

ZCRMRestClient.generateAuthTokenfromRefreshToken(user_identifier,refresh_token).then(function(auth_response){
    console.log("access token :"+auth_response.access_token);
    console.log("refresh token :"+auth_response.refresh_token);
    console.log("expires in :"+auth_response.expires_in);
    }
);

// ZCRMRestClient.API.MODULES.get(input).then(function(response){
//     var url = "https://accounts.zoho.com/oauth/v2/auth?scope=aaaserver.profile.READ,ZohoCRM.modules.leads.READ,ZohoCRM.modules.leads.CREATE,ZohoCRM.modules.leads.UPDATE&client_id=1000.1CBG66VZJMFK978806T54A666AWIXE&response_type=code&access_type=online&redirect_uri=https://makeitlowwithmakello.herokuapp.com"

//     var result = "<html><body><b>Leads</b>";
//     var data = response.body;
//     data = JSON.parse(data);
//     data = data.data;
//     for (i in data){
//         var record = data[i];
//         var name = record.Full_Name;
//         result+="<span>"+name+"</span>";
//     }
//     result+="</body></html>";
//    }
// )


// ZCRMRestClient.API.MODULES.post(input).then(function(response){
//     var data = response.body;
//    }
// )
   
module.exports = router;