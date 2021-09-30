const spicedPg = require("spiced-pg");
const database = "images";

const { dbUserName, dbPassword } = require("./secrets.json");
const db = spicedPg(
    `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
);

module.exports.getImage = () => {
    const q = `SELECT id, url, username, title, description, created_at FROM images ORDER BY id DESC id ASC
  LIMIT 6`;
    return db.query(q);
};

module.exports.addImages = (url, username, title, description, created_at) => {
    const q = `INSERT INTO images (url, username, title, description, created_at)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const params = [url, username, title, description, created_at];
    return db.query(q, params);
};

module.exports.getId = (id) => {
    const params = [id];
    return db.query(
        `SELECT id, url, username, title, description, created_at FROM images WHERE id =$1`,
        params
    );
};

module.exports.addMoreImages = () => {
    const params = [];
    return db.query(
        `SELECT url, title, id, (SELECT id FROM images ORDER BY id ASC LIMIT 1) AS "lowestId" FROM images WHERE id < $1 ORDER BY id DESC LIMIT 6;`,
        params
    );
};

// **** FIX THE TABLE WITH CREATED_AT****////
