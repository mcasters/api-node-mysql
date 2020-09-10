const CONST = require('../config/constants');

const table = CONST.tableName_drawing;

module.exports = app => {
    const itemController = require("../controllers/item.controller.js");

    // Create a new Drawing
    app.post("/dessins", itemController.create(table));

    // Retrieve all Drawings
    app.get("/dessins", itemController.findAll(table));

    // Retrieve a single Drawing with id
    app.get("/dessins/:id", itemController.findOne(table));

    // Update a Drawing with id
    app.put("/dessins/:id", itemController.update(table));

    // Delete a Drawing with id
    app.delete("/dessins/:id", itemController.delete(table));

    // Delete all Drawings
    app.delete("/dessins", itemController.deleteAll(table));
};