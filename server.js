const express = require("express");
const bodyParser = require("body-parser");
const vhost = require('vhost');

const hostname = 'api.localhost';
const port = 3001;
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to mcasters application." });
});

require("./app/routes/painting.routes.js")(app);
require("./app/routes/drawing.routes.js")(app);
require("./app/routes/sculpture.routes.js")(app);
require("./app/routes/content.routes.js")(app);
require("./app/routes/user.routes.js")(app);

const api = express();

// set the sub-domain
api.use(vhost(hostname, app));

// set port, listen for requests
api.listen(port, () => {
    console.log(`Server is running on http://${hostname}:${port}/`);
});