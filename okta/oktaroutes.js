var express = require("express");
var request = require("request");
var https = require('https');
const oktapost = express();

oktapost.get("/info",(req,res) =>{
    res.send("Got message");
})
//approval API call to create user
oktapost.post("/createUser",function (req, res) {
    const okta = require('@okta/okta-sdk-nodejs');
    const client = new okta.Client({
        orgUrl: 'https://halliburton.oktapreview.com/',
        token: '00mS7WX5Hink4vKrAfWq_DoEd98-cGadqgeq-HyztM'    // Obtained from Developer Dashboard
    });
    console.log(req.body.data.user);
    requestData=req.body.data.user;
    client.createUser(requestData)
        .then(user => {
            console.log('Created user', user);
        });
});


module.exports = oktapost;