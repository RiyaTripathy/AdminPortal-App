var express = require("express");
var request = require("request");
var https = require('https');
const oktapost = express();

oktapost.get("/info",(req,res) =>{
    res.send("Got message");
});
//approval API call to create user
oktapost.post("/createUser",function (req, res) {
    const okta = require('@okta/okta-sdk-nodejs');
    const client = new okta.Client({
        orgUrl: 'https://halliburton.oktapreview.com/',
        token: '00mS7WX5Hink4vKrAfWq_DoEd98-cGadqgeq-HyztM'    // Obtained from Developer Dashboard
    });
    requestData="";
    client.createUser(requestData)
        .then(user => {
            console.log('Created user', user);
        });
});

oktapost.post('/myaction', function(req, res) {
    console.log(req.body);
    res.send('You sent the name "' + req.body.firstName + '".');
  });
module.exports = oktapost;