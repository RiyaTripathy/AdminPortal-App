const express = require("express");
const logger = require("./middleware/logger");
const app = express();

//middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//notification API
app.use('/createUser', require('./notification/routes'));


//Okta API
app.use('/okta', require('./okta/oktaroutes'));



var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
