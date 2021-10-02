import * as Vue from "./vue.js";
import { myComponent } from "./my-component.js";

console.log("my component", myComponent);

Vue.createApp({
    data() {
        return {
            name: "Image Board",
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            modalIsVisible: location.pathname.slice(1),
            id: null,
            moreBtn: true,
            showComment: true,
        };
    },
    mounted() {
        // console.log("MOUNTED");
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
            fd.append("created_at", this.created_at);
            fd.append("showModal", this.showModal);
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
        showModal(ex) {
            this.modalIsVisible = true;
            this.id = ex;
            // console.log("this.id", this.id);
        },
        fileSelectHandler(e) {
            this.file = e.target.files[0];
        },
        // more image button //
        moreClick() {
            // console.log(
            //     "last Image on screen",
            //     this.images[this.images.length - 1]
            // );
            fetch("/moreImages/" + this.images[this.images.length - 1].id)
                .then((response) => response.json())
                .then((response) => {
                    // console.log("result from fetch/moreImage", response.rows);
                    for (let i = 0; i < response.rows.length; i++) {
                        // console.log(response.rows[i]);
                        this.images.push(response.rows[i]);
                        let singleObject = response.rows.length - 1;
                        let lastImage = response.rows[singleObject].id;
                        if (lastImage == response.rows[0].lowestId) {
                            this.moreBtn = false;
                        }
                    }
                })
                .catch((err) => console.log("err in moreClick function", err));
        },
    },

    components: {
        "image-modal": myComponent,
    },
}).mount("#main");
