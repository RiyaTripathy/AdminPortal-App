const JSON = require('circular-json');

var appRouter = function (app) {
  app.post("/", function (req, res) {
    console.log(req.body.data.user.profile);
    
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
}
module.exports = appRouter;
