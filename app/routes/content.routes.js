module.exports = app => {
    const contentController = require("../controllers/content.controller.js");

    // Create a new Content
    app.post("/contents", contentController.create);

    // Retrieve all Contents
    // app.get("/contents", contentController.findAll);

    // Retrieve a single Content with id
    app.get("/contents/:id", contentController.findOne);

    // Retrieve a single Content with key
    app.get("/contents", contentController.findByKey);

    // Update a Content with id
    app.put("/contents/:id", contentController.update);

    // Delete a Content with id
    app.delete("/contents/:id", contentController.delete);

    // Delete all Contents
    app.delete("/contents", contentController.deleteAll);
};