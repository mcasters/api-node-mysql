const Painting = require("../models/painting.model.js");

// Create and Save a new Painting
exports.create = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const painting = new Painting({
        title: req.body.title,
        date: req.body.date,
        technique: req.body.technique,
        description: req.body.description,
        height: req.body.height,
        width: req.body.width,
    });

    // Save painting in the database
    Painting.create(painting, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Painting."
            });
        else res.send(data);
    });
};

// Retrieve all paintings from the database.
exports.findAll = (req, res) => {
    Painting.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving paintings."
            });
        else res.send(data);
    });
};

// Find a single painting with a paintingId
exports.findOne = (req, res) => {
    Painting.findById(req.params.paintingId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Painting with id ${req.params.paintingId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Painting with id " + req.params.paintingId
                });
            }
        } else res.send(data);
    });
};

// Update a painting identified by the paintingId in the request
exports.update = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Painting.updateById(
        req.params.paintingId,
        new Painting(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Painting with id ${req.params.paintingId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Painting with id " + req.params.paintingId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a painting with the specified paintingId in the request
exports.delete = (req, res) => {
    Painting.remove(req.params.paintingId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Painting with id ${req.params.paintingId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Painting with id " + req.params.paintingId
                });
            }
        } else res.send({ message: `Painting was deleted successfully!` });
    });
};

// Delete all paintings from the database.
exports.deleteAll = (req, res) => {
    Painting.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all paintings."
            });
        else res.send({ message: `All paintings were deleted successfully!` });
    });
};