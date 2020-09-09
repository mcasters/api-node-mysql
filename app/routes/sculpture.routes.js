const CONST = require('../config/constants');

const table = CONST.tableName_sculpture;

module.exports = app => {
    const itemController = require("../controllers/item.controller.js");

    // Create a new Sculpture
    app.post("/sculptures", itemController.create(table));

    // Retrieve all Sculptures
    app.get("/sculptures", itemController.findAll(table));

    // Retrieve a single Sculpture with id
    app.get("/sculptures/:id", itemController.findOne(table));

    // Update a Sculpture with id
    app.put("/sculptures/:id", itemController.update(table));

    // Delete a Sculpture with id
    app.delete("/sculptures/:id", itemController.delete(table));

    // Delete all Sculptures
    app.delete("/sculptures", itemController.deleteAll(table));
};