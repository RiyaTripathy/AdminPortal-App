var express = require("express");
var request = require("request");
var https = require('https');
const oktapost = express();
//var bodyParser = require('body-parser')
//var urlencodedParser = bodyParser.urlencoded({extended: false});
//oktapost.use(express.urlencoded())



oktapost.get("/info",(req,res) =>{
    res.send("Got message");
});
//approval API call to create user
oktapost.post("/createUser",function (req, res) {
    console.log(req.body)
    console.log("fname: "+ req.body.firstName);
    firstname = req.body.firstName;
    lastname = req.body.lastName;
    email = req.body.email;
    login = req.body.login;
    mobilePhone = req.body.mobilePhone;
    const newUser = {
        profile: {
            firstName: firstname,
            lastName: lastname,
            email: email,
            login: login,
            mobilePhone: mobilePhone
        }
    };
    const okta = require('@okta/okta-sdk-nodejs');
    const client = new okta.Client({
        orgUrl: 'https://halliburton.oktapreview.com/',
        token: '00mS7WX5Hink4vKrAfWq_DoEd98-cGadqgeq-HyztM'    // Obtained from Developer Dashboard
    });


    client.createUser(newUser)
        .then(user => {
           console.log('Created user', user);
           res.send("User Created");
        });
});

oktapost.post('/myaction', function(req, res) {
    console.log(req.body);
    res.send('You sent the name "' + req.body.firstName + '".');
  });
module.exports = oktapost;

