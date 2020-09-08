module.exports = app => {
    const paintings = require("../controllers/painting.controller.js");

    // Create a new Painting
    app.post("/paintings", paintings.create);

    // Retrieve all Paintings
    app.get("/paintings", paintings.findAll);

    // Retrieve a single Painting with paintingId
    app.get("/paintings/:paintingId", paintings.findOne);

    // Update a Painting with paintingId
    app.put("/paintings/:paintingId", paintings.update);

    // Delete a Painting with paintingId
    app.delete("/paintings/:paintingId", paintings.delete);

    // Create a new Painting
    app.delete("/paintings", paintings.deleteAll);
};