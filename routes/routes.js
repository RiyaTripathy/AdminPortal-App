var faker = require("faker");
const JSON = require('circular-json');

var appRouter = function (app) {
  app.post("/", function (req, res) {
    console.log(req.body)
    res.status(200).send({ message: "Hello" });
  });
}
module.exports = appRouter;
