const nodemailer = require('nodemailer');
const http = require("http");
const express = require("express");
const exphbs = require('express-handlebars');

const router = express();

router.post("/notify", function (req, res) {
    console.log(req.body.data.user.profile)
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
  });



module.exports = router;


