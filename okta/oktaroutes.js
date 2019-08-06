var express = require("express");
var request = require("request");
var https = require('https');

const oktapost = express();
//const getemaillist = express();
const oktaget = express();

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



   var getemaillist = function() {
        var recipientlist = [];
        var emaillist = [];
        const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: 'https://halliburton.oktapreview.com/',
            token: '00mS7WX5Hink4vKrAfWq_DoEd98-cGadqgeq-HyztM'    // Obtained from Developer Dashboard
        });
        client.listGroups({
            q: 'HookTesting'
        }).each(group => {
            var groupid = ""
            //console.log('group matches query: ', group.id);
            groupid = group.id;
            const groupmembers = client.listGroupUsers(groupid)
            groupmembers.each(groupuser => {
                //console.log(groupuser);
                //console.log(groupuser.profile.email);
                var email = groupuser.profile.email
                //console.log(email)
                recipientlist.push(email)
            })

                .then(() => (console.log(recipientlist)));



        })


        //return recipientlist;
    }


module.exports = oktaget;










