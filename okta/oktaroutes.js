var express = require("express");
var request = require("request");
var https = require('https');
const oktapost = express();
var config = require('../config/config.json');
const fs = require('fs')
const IncomingForm = require('formidable').IncomingForm;


oktapost.post("/upload",function (req, res) {
    var url=config.url;
    var apikey=config.token;

  var form=new IncomingForm();
    form.uploadDir = "C:\\Users\\rtripathy\\Documents\\Work";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error', err)
            throw err
        }
    });
    form.on('file', (field, file) => {
        const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: url,
            token: apikey
            // orgUrl: 'https://dev-121295.oktapreview.com/',
            //token: '00nD8h8Xo56f59Ergwt1W0UR-4AXu_9LaglSEGE-wE' // Obtained from Developer Dashboard
        });
        let csvToJson = require('convert-csv-to-json');

        let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(file.path);
        for (let i = 0; i < json.length; i++) {
            firstName = json[i]['firstName'],
                lastName = json[i]['lastName'],
                email = json[i]['email'],
                login = json[i]['login']
            const newUser = {
                profile: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    login: login
                }
            };

            createUser(newUser);
        }

        function createUser(User) {
                
                var result = client.createUser(User)
                .catch(err =>fs.appendFile('Failure.txt', User.profile.email + " " + 'Creation Failed'+'\r\n', 'utf8',
                // callback function
                function(err) { 
                    if (err) throw err;
                    // if no error
                    //console.log("Data is appended to file successfully.")
            })
             ); 
               
             

        }
    })
form.on('end', () => {
res.json()
});


})

module.exports = oktapost;

