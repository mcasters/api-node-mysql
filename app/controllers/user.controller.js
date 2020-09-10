const User = require("../models/user.model.js");

exports.create = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "User can not be empty!"
        });
    }

    User.create(new User(req.body), (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the user."`
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving users.`
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    User.findByUsername(req.params.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with username ${req.params.username}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving user with username " + ${req.params.username}`
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "User can not be empty!"
        });
    }

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found user with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating user with id " ${req.params.id}`
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete user with id ${req.params.id}`
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    User.removeAll( (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while removing all users.`
            });
        else res.send({ message: `All users were deleted successfully!` });
    });
};