const sql = require("./db.js");

const Painting = function(painting) {
    this.title = painting.title;
    this.date = painting.date;
    this.technique = painting.technique;
    this.description = painting.description;
    this.height = painting.height;
    this.width = painting.width;
};

Painting.create = (newCustomer, result) => {
    sql.query("INSERT INTO Painting SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created painting: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
};

Painting.findById = (customerId, result) => {
    sql.query(`SELECT * FROM Painting WHERE id = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found painting: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Item with the id
        result({ kind: "not_found" }, null);
    });
};

Painting.getAll = result => {
    sql.query("SELECT * FROM Painting", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("paintings: ", res);
        result(null, res);
    });
};

Painting.updateById = (id, painting, result) => {
    sql.query(
        "UPDATE Painting SET title = ?, date = ?, technique = ?, description = ?, height = ?, width = ?, WHERE id = ?",
        [painting.title, painting.date, painting.technique, painting.description, painting.height, painting.width, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Item with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated painting: ", { id: id, ...painting });
            result(null, { id: id, ...painting });
        }
    );
};

Painting.remove = (id, result) => {
    sql.query("DELETE FROM Painting WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Item with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted painting with id: ", id);
        result(null, res);
    });
};

Painting.removeAll = result => {
    sql.query("DELETE FROM Painting", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} paintings`);
        result(null, res);
    });
};

module.exports = Painting;