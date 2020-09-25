var conf = require("./conf.js");
const express = require('express')
const app = express()
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app['conf']=conf;
var ApiRoutes = require("./routes.js");
var adminRoutes = new ApiRoutes(app);
adminRoutes.init();
app.listen(conf.api.port);
console.log(`Product Module listening at http://localhost:${conf.api.port}`)
