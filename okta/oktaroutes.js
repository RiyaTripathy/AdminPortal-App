var express = require("express");
var request = require("request");
var https = require('https');
const oktapost = express();
const IncomingForm = require('formidable').IncomingForm;
//var bodyParser = require('body-parser')
//var urlencodedParser = bodyParser.urlencoded({extended: false});
//oktapost.use(express.urlencoded())



oktapost.get("/info",(req,res) =>{
    res.send("Got message");
});
//approval API call to create user
oktapost.post("/createUser",function (req, res) {
    const okta = require('@okta/okta-sdk-nodejs');
    const client = new okta.Client({
        orgUrl: 'https://dev-121295.oktapreview.com/',
        token: '00nD8h8Xo56f59Ergwt1W0UR-4AXu_9LaglSEGE-wE'    // Obtained from Developer Dashboard
    });
    firstname = "App";
    lastname = "User2";
    email = "App.User2@mailinator.com";
    login = "App.User2@mailinator.com";

    client.listUsers({
        search: 'profile.login eq "App.User2@mailinator.com"'
    }).each(user => {
        console.log('User matches search:', user);
    });
    const newUser = {
        profile: {
            firstName: firstname,
            lastName: lastname,
            email: email,
            login: login
        }
    };
    console.log(newUser)

var id = "";
var appid="";
    client.createUser(newUser)
        .then(user => {
                console.log("newUser created");
            id=user.id;
            appid="0oaguj9fq4YzAdxFn0h7";
                client.assignUserToApplication(appid, {
                    id
                })
                    .then(appUser => {
                        console.log('Assigned user to app, app user instance:');
                    });
        }
        );
});

oktapost.post('/myaction', function(req, res) {
    console.log(req.body);
    res.send('You sent the name "' + req.body.firstName + '".');
  });


oktapost.post("/assignUsertoApp",function (req, res) {
    const okta = require('@okta/okta-sdk-nodejs');
    const client = new okta.Client({
        orgUrl: 'https://dev-121295.oktapreview.com/',
        token: '00nD8h8Xo56f59Ergwt1W0UR-4AXu_9LaglSEGE-wE'    // Obtained from Developer Dashboard
    });
    id="00umf9vnheYMUXV2b0h7"
    const orgUsersCollection = client.listAssignedRoles(id);

    orgUsersCollection.each(roles => {
        label=roles.label
        if(label=="Application Administrator")
        console.log("user is app admin");
    })
        .then(() => console.log('All roles have been verified'));
});


oktapost.post("/readexcel",function (req, res) {
    console.log(req.query['filename'])
    const okta = require('@okta/okta-sdk-nodejs');
    const client = new okta.Client({
        orgUrl: 'https://dev-121295.oktapreview.com/',
        token: '00nD8h8Xo56f59Ergwt1W0UR-4AXu_9LaglSEGE-wE'    // Obtained from Developer Dashboard
    });
    const XLSX = require('xlsx');
    const workbook = XLSX.readFile('C:\\Users\\rtripathy\\Documents\\Work\\NodeJS\\Custom App\\'+req.query['filename']);
    const sheet_name_list = workbook.SheetNames;
    // console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
    var ws = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    //console.log(ws[0]['firstName'])
    data=ws.length

    for (let i = 0; i < data; i += 1) {
        firstName = ws[i]['firstName'],
            lastName = ws[i]['lastName'],
            email = ws[i]['email'],
            login = ws[i]['login']
        const newUser = {
            profile: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                login: login
            }
        };
       console.log(newUser)
       // createUser(newUser);
    }
    function createUser(User)
    {

      //  console.log(newUser)

        client.createUser(User)
            .then(user => {
                console.log("newUser created");
    });
    }
        });
oktapost.post("/readcsv",function (req, res) {
    console.log(req.query['filename'])
    const okta = require('@okta/okta-sdk-nodejs');
    const client = new okta.Client({
        orgUrl: 'https://dev-121295.oktapreview.com/',
        token: '00nD8h8Xo56f59Ergwt1W0UR-4AXu_9LaglSEGE-wE'    // Obtained from Developer Dashboard
    });
let csvToJson = require('convert-csv-to-json');

let json = csvToJson.fieldDelimiter(',') .getJsonFromCsv('C:\\Users\\rtripathy\\Documents\\Work\\NodeJS\\Custom App\\'+req.query['filename']);
for(let i=0; i<json.length;i++){
    console.log(json[i]);
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
   // console.log(newUser)
    createUser(newUser);
}
    function createUser(User)
    {

        //  console.log(newUser)

        client.createUser(User)
            .then(user => {
                console.log("newUser created");
            });
    }

});

oktapost.post("/readoneuser",function (req, res) {
    const okta = require('@okta/okta-sdk-nodejs');
    const client = new okta.Client({
        orgUrl: 'https://dev-121295.oktapreview.com/',
        token: '00nD8h8Xo56f59Ergwt1W0UR-4AXu_9LaglSEGE-wE'    // Obtained from Developer Dashboard
    });
    firstname = req.body.data.user.profile.firstName;
    console.log(firstname)
    lastname = req.body.data.user.profile.lastName;
    email = req.body.data.user.profile.email;
    login = req.body.data.user.profile.login;

    const newUser = {
        profile: {
            firstName: firstname,
            lastName: lastname,
            email: email,
            login: login,
        }
        };
    // console.log(newUser)

        client.createUser(newUser)
            .then(user => {
                console.log("newUser created");
            });
});

oktapost.post("/upload",function (req, res) {
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
        console.log(file.path);
        const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: 'https://halliburton.oktapreview.com/',
            token: '00mS7WX5Hink4vKrAfWq_DoEd98-cGadqgeq-HyztM'    // Obtained from Developer Dashboard
        });
        let csvToJson = require('convert-csv-to-json');

        let json = csvToJson.fieldDelimiter(',') .getJsonFromCsv(file.path);
        for(let i=0; i<json.length;i++) {
        console.log(json[i]);
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
            // console.log(newUser)
            createUser(newUser);
        }
        function createUser(User)
        {

            //  console.log(newUser)

            client.createUser(User)
                .then(user => {
                    console.log("newUser created");
                });
}
})
form.on('end', () => {
res.json()
});


})
module.exports = oktapost;

