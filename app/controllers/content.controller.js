const Content = require("../models/content.model.js");

exports.create = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Content.create(new Content(req.body), (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the content."`
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Content.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving contents.`
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Content.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found content with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving content with id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

exports.findByKey = (req, res) => {
    Content.findByKey(req.query.keycontent, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found content with keycontent : ${req.query.keycontent}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving content with keycontent : ${req.query.keycontent}`
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Content.updateById(
        req.params.id,
        new Content(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found content with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating content with id " ${req.params.id}`
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Content.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found content with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete content with id ${req.params.id}`
                });
            }
        } else res.send({ message: `Content was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Content.removeAll( (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while removing all contents.`
            });
        else res.send({ message: `All contents were deleted successfully!` });
    });
};