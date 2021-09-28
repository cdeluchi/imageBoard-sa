import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            name: "Image Board",
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
        };
    },
    mounted() {
        console.log("MOUNTED");
        fetch("/images") //make http request
            .then((response) => response.json())
            .then(({ rows }) => {
                // console.log("images", rows);
                this.images = rows;
            })
            .catch(console.log);
    },
    methods: {
        clickHandler() {
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            fd.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((response) => response.json())
                .then((result) => {
                    this.images.unshift(result.rows[0]);
                })
                .catch((err) => console.log(err));
        },
        fileSelectHandler(e) {
            this.file = e.target.files[0];
        },
    },
}).mount("#main");
