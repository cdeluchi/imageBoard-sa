const express = require("express");
const app = express();
const db = require("./db");
const { uploader } = require("./upload");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("file:", req.file);
    console.log("input:", req.body);
    if (req.file) {
        const imgUrl =
            "https://s3.amazonaws.com/spicedling/" + req.file.filename;
        db.addImages(
            imgUrl,
            req.body.username,
            req.body.title,
            req.body.description
        ).then((data) => {
            console.log("data return", data);
            return res.json(data);
        });
    } else {
        res.json({ success: false });
    }
});

// **** getImage *** //

app.get("/images", (req, res) => {
    // console.log("req.body", req.body);
    db.getImage().then(({ rows }) => {
        // console.log("rows", rows);
        return res.json({ rows });
    });
});

// **** get Id ***** //

app.get("/images/:id", (req, res) => {
    // console.log("req.params", req.params);
    db.getId(req.params.id).then(({ rows }) => {
        // console.log("rows in getId", rows);
        return res.json({ rows });
    });
});

// **** GET MORE IMAGE / MORE BUTTON route ****//

app.get("/moreImages/:lowestId", (req, res) => {
    console.log("req.params in lowestId", req.params);
    db.addMoreImages(req.params.lowestId).then(({ rows }) => {
        console.log("rows in addMoreImages", rows);
        return res.json({ rows });
    });
});

// **** ADD COMMETS ****//
app.get("/comments/:id", (req, res) => {
    console.log("params in comment id", req.params.id);
    db.getComments(req.params.id).then(({ rows }) => {
        return res.json({ rows });
    });
});

app.post("/comments", (req, res) => {
    console.log("post in comments", req.body);
    db.addComment(req.body.username, req.body.comment, req.body.id);
    return res.json();
});

//  **** DO NOT TOUCH HERE *****//
app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
