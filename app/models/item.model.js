const sql = require('./db.js');
const CONST = require('../config/constants');

const Item = function(item, table) {
    this.title = item.title;
    this.date = item.date;
    this.technique = item.technique;
    this.description = item.description;
    this.height = item.height;
    this.width = item.width;
    if (table === CONST.tableName_sculpture) {
        this.length = item.length;
    }
};

Item.create = (newItem, table, result) => {
    sql.query(`INSERT INTO ${table} SET ?`, newItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`created ${table} : `, { id: res.insertId, ...newItem });
        result(null, { id: res.insertId, ...newItem });
    });
};

Item.findById = (id, table, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found ${table} : `, res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Item.getAll = (table, result) => {
    sql.query(`SELECT * FROM ${table}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`${table} : `, res);
        result(null, res);
    });
};

Item.updateById = (id, item, table, result) => {
       sql.query(
        `UPDATE ${table} SET ? WHERE id = ?`,
        [item, id],
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

            console.log(`updated ${table} : `, { id: id, ...item });
            result(null, { id: id, ...item });
        }
    );
};

Item.remove = (id, table, result) => {
    sql.query(`DELETE FROM ${table} WHERE id = ?`, id, (err, res) => {
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

        console.log(`deleted ${table} with id : `, id);
        result(null, res);
    });
};

Item.removeAll = (table, result) => {
    sql.query(`DELETE FROM ${table}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} ${table}`);
        result(null, res);
    });
};

module.exports = Item;