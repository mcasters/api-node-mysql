const CONST = require('../config/constants');

const table = CONST.tableName_drawing;

module.exports = app => {
    const itemController = require("../controllers/item.controller.js");

    // Create a new Drawing
    app.post("/drawings", itemController.create(table));

    // Retrieve all Drawings
    app.get("/drawings", itemController.findAll(table));

    // Retrieve a single Drawing with id
    app.get("/drawings/:id", itemController.findOne(table));

    // Update a Drawing with id
    app.put("/drawings/:id", itemController.update(table));

    // Delete a Drawing with id
    app.delete("/drawings/:id", itemController.delete(table));

    // Delete all Drawings
    app.delete("/drawings", itemController.deleteAll(table));
};