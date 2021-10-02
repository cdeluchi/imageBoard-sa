const spicedPg = require("spiced-pg");
const database = "images";

const { dbUserName, dbPassword } = require("./secrets.json");
const db = spicedPg(
    `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
);

module.exports.getImage = () => {
    const q = `SELECT id, url, username, title, description, created_at FROM images ORDER BY id DESC LIMIT 6`;
    return db.query(q);
};

module.exports.addImages = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description)
            VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

module.exports.getId = (id) => {
    const params = [id];
    return db.query(
        `SELECT id, url, username, title, description, created_at 
        FROM images WHERE id =$1`,
        params
    );
};

module.exports.addMoreImages = (id) => {
    const params = [id];
    return db.query(
        `SELECT url, title, id, (SELECT id FROM images ORDER BY id ASC LIMIT 1) 
        AS "lowestId" FROM images WHERE id < $1 ORDER BY id DESC LIMIT 3;`,
        params
    );
};

//  COMMENTS ROUTE //
module.exports.addComment = (username, comment, img_id) => {
    const params = [username, comment, img_id];
    console.log("params in add comment", params);
    const q = `INSERT INTO comments (username, comment, img_id) 
    VALUES ($1, $2, $3) RETURNING username, comment, img_id, id`;
    return db.query(q, params);
};

module.exports.getComments = (img_id) => {
    const params = [img_id];
    const q = `SELECT * FROM comments WHERE img_id=$1`;
    return db.query(q, params);
};

// *****DELETE COMMENT ******//
module.exports.deleteComment = (id) => {
    const params = [id];
    const q = `
            DELETE
            FROM comments
            WHERE img_id=$1
    `;
    return db.query(q, params);
};
