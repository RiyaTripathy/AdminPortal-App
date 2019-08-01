var express = require("express");
const http = require("http");
const okta = express();


//approval API call to create user
okta.post("/createUser", function (req, res) {
    console.log(req.body.data.user.profile);
    var apiKey = 'SSWS 00mS7WX5Hink4vKrAfWq_DoEd98-cGadqgeq-HyztM';
    let url = "http://halliburton.oktapreview.com/api/v1/users?activate=false";
    //call Okta to create a user
});

module.exports = okta;