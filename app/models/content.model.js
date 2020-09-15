const sql = require('./db.js');

const Content = function(content) {
    this.keyContent = content.keyContent;
    this.text = content.text;
};

Content.create = (content, result) => {
    sql.query(`INSERT INTO Content SET ?`, content, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`Created Content : `, { id: res.insertId, ...content });
        result(null, { id: res.insertId, ...content });
    });
};

Content.getAll = result => {
    sql.query(`SELECT * FROM Content`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`Content : `, res);
        result(null, res);
    });
};

Content.findById = (id, result) => {
    sql.query(`SELECT * FROM Content WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found Content : `, res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Content.findByKey = (keyContent, result) => {
    sql.query(`SELECT * FROM Content WHERE key_content = ?`, keyContent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found Content : `, res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};


Content.updateById = (id, content, result) => {
    sql.query(
        `UPDATE Content SET ? WHERE id = ?`,
        [content, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Content with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log(`Updated Content : `, { id: id, ...content });
            result(null, { id: id, ...content });
        }
    );
};

Content.remove = (id, result) => {
    sql.query(`DELETE FROM Content WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log(`Deleted content with id : `, id);
        result(null, res);
    });
};

Content.removeAll = result => {
    sql.query(`DELETE FROM Content`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} contents`);
        result(null, res);
    });
};

module.exports = Content;