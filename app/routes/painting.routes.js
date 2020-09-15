const CONST = require('../config/constants');

const table = CONST.tableName_painting;

module.exports = app => {
    const itemController = require("../controllers/item.controller.js");

    app.post("/paintings", itemController.create(table));

    // Retrieve all Paintings
    // app.get("/paintings", itemController.findAll(table));

    // Retrieve Paintings by part
    app.get("/paintings", itemController.getByPart(table));

    // Retrieve a single Painting with id
    app.get("/paintings/:id", itemController.findOne(table));

    // Update a Painting with id
    app.put("/paintings/:id", itemController.update(table));

    // Delete a Painting with id
    app.delete("/paintings/:id", itemController.delete(table));

    // Create a new Painting
    app.delete("/paintings", itemController.deleteAll(table));
};