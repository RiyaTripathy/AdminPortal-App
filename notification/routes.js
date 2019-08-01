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
            <li>Login: ${req.body.data.user.profile.login}</li>
            <li>Phone: ${req.body.data.user.profile.mobilePhone}</li>
        </ul>`;


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
        to: 'suvaghosh@deloitte.com',
        subject: `New User Request - ${req.body.data.user.profile.firstName} ${req.body.data.user.profile.lastName}`,
        text: 'None',
        html: output
    };

    transport.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log("Message Sent: %s", info.message);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });



module.exports = router;


