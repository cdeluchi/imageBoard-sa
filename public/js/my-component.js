const component = {
    data() {
        return {
            images: [],
        };
    },
    mounted() {
        console.log("this is a component mounted!", this.id);
        fetch(`/images/${this.id}`)
            .then((response) => response.json())
            .then(({ rows }) => {
                console.log("images", rows);
                this.images = rows[0];
            })
            .catch(console.log);
    },
    methods: {
        showModal() {
            this.images;
            this.$emit("close");
        },
        close() {},
    },
    props: ["id"],
    template: `
                <h1>My Modal {{id}}</h1>
                <img :scr="images.url">
                 <button class="modal-button" @click="close">CLOSE</button>
                `,
};

export { component as myComponent };
