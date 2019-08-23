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
    console.log(req.body.data.user.profile);
    console.log(req.body.data.user.credentials.password)
    console.log("fname: "+ req.body.data.user.profile.firstName);

    firstname = req.body.data.user.profile.firstName;
    lastname = req.body.data.user.profile.lastName;
    email = req.body.data.user.profile.email;
    login = req.body.data.user.profile.login;
    mobilePhone = req.body.data.user.profile.mobilePhone;
    upn = req.body.data.user.profile.email;
    password = req.body.data.user.credentials.password;
    const newUser = {
        profile: {
            firstName: firstname,
            lastName: lastname,
            email: email,
            login: login,
            mobilePhone: mobilePhone,
            upn: upn
        },
        credentials: {
            password: password
        }
    };
    console.log(newUser)
    const okta = require('@okta/okta-sdk-nodejs');
    const client = new okta.Client({
        orgUrl: 'https://halliburton.oktapreview.com/',
        token: '00mS7WX5Hink4vKrAfWq_DoEd98-cGadqgeq-HyztM'    // Obtained from Developer Dashboard
    });


    client.createUser(newUser)
        .then(user => {
           console.log('Created user', user);
        });
});

oktapost.post('/myaction', function(req, res) {
    console.log(req.body);
    res.send('You sent the name "' + req.body.firstName + '".');
  });
module.exports = oktapost;

