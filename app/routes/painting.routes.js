const CONST = require('../config/constants');

const table = CONST.tableName_painting;

module.exports = app => {
    const itemController = require("../controllers/item.controller.js");

    app.post("/peintures", itemController.create(table));

    // Retrieve all Paintings
    app.get("/peintures", itemController.findAll(table));

    // Retrieve a single Painting with id
    app.get("/peintures/:id", itemController.findOne(table));

    // Update a Painting with id
    app.put("/peintures/:id", itemController.update(table));

    // Delete a Painting with id
    app.delete("/peintures/:id", itemController.delete(table));

    // Create a new Painting
    app.delete("/peintures", itemController.deleteAll(table));
};