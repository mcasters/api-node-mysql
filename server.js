require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

const host = 'api.localhost';
const port = 5000;
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to mcasters api." });
});

require("./app/routes/painting.routes.js")(app);
require("./app/routes/drawing.routes.js")(app);
require("./app/routes/sculpture.routes.js")(app);
require("./app/routes/content.routes.js")(app);
require("./app/routes/user.routes.js")(app);

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}/`);
});