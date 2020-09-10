module.exports = app => {
    const userController = require("../controllers/user.controller.js");

    // Create a new Content
    app.post("/users", userController.create);

    // Retrieve all Contents
    app.get("/users", userController.findAll);

    // Retrieve a single Content with id
    app.get("/users/:username", userController.findOne);

    // Update a Content with id
    app.put("/users/:id", userController.update);

    // Delete a Content with id
    app.delete("/users/:id", userController.delete);

    // Delete all Contents
    app.delete("/users", userController.deleteAll);
};