import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            name: "Image Board",
            images: [],
        };
    },
    mounted() {
        console.log("MOUNTED");
        fetch("/images")
            .then((response) => response.json())
            .then(({ rows }) => {
                console.log("images", rows);
                this.images = rows;
            });
    },
    methods: {
        setName(images) {
            console.log(images);
            this.name = images;
        },
    },
}).mount("#main");
