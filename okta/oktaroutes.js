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
    console.log(req.body);
    var profile={};
    var firstName ='firstName';
    var lastName ='lastName';
    var email ='email';
    var mobilePhone ='mobilePhone';
    profile[firstName] = req.body.firstName;
    profile[lastName] = req.body.lastName;
    profile[email] = req.body.email;
    profile[mobilePhone] = req.body.mobilePhone;

    var o = {} // empty Object
    var key = 'Profile';
    o[key] = [];
    o[key].push(profile)
    console.log(o);
    requestData=o;
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