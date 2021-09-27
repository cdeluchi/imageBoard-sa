const spicedPg = require("spiced-pg");
const database = "images";

const { dbUserName, dbPassword } = require("./secrets.json");
db = spicedPg(
    `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
);

module.exports.getImage = () => {
    const q = `SELECT url, username, title, description, created_at FROM images ORDER BY id DESC`;
    return db.query(q);
};

module.exports.addImages = (url, username, title, description, created_at) => {
    const q = `INSERT INTO images (url, username, title, description, created_at)
            VALUES ($1, $2, $3, $4, $5)`;
    const params = [url, username, title, description, created_at];
    return db.query(q, params);
};
