const sql = require('./db.js');

const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

User.create = (user, result) => {
    sql.query(`INSERT INTO User SET ?`, user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`created User : `, { id: res.insertId, ...user });
        result(null, { id: res.insertId, ...user });
    });
};

User.findByUsername = (username, result) => {
    sql.query(`SELECT * FROM User WHERE username = ?`, username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found User : `, res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query(`SELECT * FROM User`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`User : `, res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        `UPDATE User SET ? WHERE id = ?`,
        [user, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log(`Updated User : `, { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {
    sql.query(`DELETE FROM User WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log(`Deleted user with id : `, id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query(`DELETE FROM User`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} contents`);
        result(null, res);
    });
};

module.exports = User;