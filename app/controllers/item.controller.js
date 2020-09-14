const Item = require("../models/item.model.js");

exports.create = table => (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Item.create(new Item(req.body, table), table, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the ${table}."`
            });
        else res.send(data);
    });
};

exports.findAll = table => (req, res) => {
    Item.getAll(table,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving ${table}.`
            });
        else res.send(data);
    });
};

exports.getByPart = table => (req, res) => {
    Item.getByPart(req.query.part, req.query.year, table, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ${table} with part ${req.query.part} in ${req.query.year}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${table} with part " + ${req.query.part} in ${req.query.year}`
                });
            }
        } else res.send(data);
    });
};

exports.findOne = table => (req, res) => {
    Item.findById(req.params.id, table, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ${table} with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${table} with id " + ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

exports.update = table => (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Item.updateById(
        req.params.id,
        new Item(req.body, table),
        table,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ${table} with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating ${table} with id " ${req.params.id}`
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = table => (req, res) => {
    Item.remove(req.params.id, table, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ${table} with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete ${table} with id ${req.params.id}`
                });
            }
        } else res.send({ message: `${table} was deleted successfully!` });
    });
};

exports.deleteAll = table => (req, res) => {
    Item.removeAll(table, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while removing all ${table}.`
            });
        else res.send({ message: `All ${table} were deleted successfully!` });
    });
};