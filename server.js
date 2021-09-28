const express = require("express");
const app = express();
const db = require("./db");
const { uploader } = require("./upload");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    if (req.file) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get("/images", (req, res) => {
    // console.log("req.body", req.body);
    db.getImage().then(({ rows }) => {
        // console.log("rows", rows);
        return res.json({ rows });
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
