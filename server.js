var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//database connection
var dbConnectionString = "mongodb://localhost/links";
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    dbConnectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
        process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(dbConnectionString);

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public/client"));

require("./public/server/link.service.server.js")(app, mongoose);

app.listen(port, ipaddress);