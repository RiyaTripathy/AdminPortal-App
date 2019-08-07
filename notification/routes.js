const nodemailer = require('nodemailer');
const express = require("express");

const router = express();

router.post("/notify", function (req, res) {
    console.log(req.body.data.user.profile);
	  data= req.body.data.user.profile;
//Send deny command to Okta registration hook
    res.status(200).json({
    	   "commands":[
    		      {
    		         "type":"com.okta.action.update",
    		         "value":{
    		            "registration":"DENY"
    		         }
    		      }
    		   ]
    		});

    const output = `
        <p>You have a new user request</p>
        <h3>User Details</h3>
        <ul>
            <li>First Name: ${req.body.data.user.profile.firstName}</li>
            <li>Last Name: ${req.body.data.user.profile.lastName}</li>
            <li>Email: ${req.body.data.user.profile.email}</li>
            <li>Login: ${req.body.data.user.profile.login}</li>
            <li>Justification: ${req.body.data.user.profile.justification}</li>
            <li>Phone: ${req.body.data.user.profile.mobilePhone}</li>
        </ul>
        <a href="http://ec2-3-17-73-62.us-east-2.compute.amazonaws.com:3000/okta/info">Approve here</a>
        <form action="http://ec2-3-17-73-62.us-east-2.compute.amazonaws.com:3000/okta/info" method="get">
        <input type="submit" value="Approve" 
             name="Approve" id="frm1_submit" />
    </form>
`;


    const form=`<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <title>CSS3 Contact Form</title>
    </head>
    <body>
    <div id="contact">
        <h1>Send an email</h1>
        <form action="http://ec2-3-17-73-62.us-east-2.compute.amazonaws.com:3000/okta/myaction" method="post">
            <fieldset>
                <label for="name">First Name:</label>
                <input type="text" id="name" name="name" value= "${req.body.data.user.profile.firstName}"/>

                <label for="name">Last Name:</label>
                <input type="text" id="name" name="name" value= "${req.body.data.user.profile.lastName}"/>

                <label for="name">Login:</label>
                <input type="text" id="name" name="name" value= "${req.body.data.user.profile.login}"/>

                <label for="name">Email:</label>
                <input type="text" id="name" name="name" value= "${req.body.data.user.profile.email}"/>

                <label for="name">Phone Number:</label>
                <input type="text" id="name" name="name" value= "${req.body.data.user.profile.mobilePhone}"/>
    
                <label for="message">Justification:</label>
                <textarea id="message" value=value= "${req.body.data.user.profile.justification}" placeholder="What's on your mind?"></textarea>
    
                <input type="submit" value="Approve" />
    
            </fieldset>
        </form>
    </div>
    </body>
    </html>`;

    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'oktatestingactivity@gmail.com',
            pass: 'Password@123'
        }
    });


    let mailOptions = {
        from: 'noreply.halliburton.com',
        to: 's.ghosh3671@gmail.com',
        subject: `New User Request - ${req.body.data.user.profile.firstName} ${req.body.data.user.profile.lastName}`,
        text: 'None',
        html: form
    };

    transport.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log("Message Sent");
    });
  });

module.exports = router;


