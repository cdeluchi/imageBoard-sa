const component = {
    data() {
        return {};
    },
    mounted() {
        console.log("this is a component mounted!", this.id);
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
                <h1>My Modal</h1>
                 <button class="modal-button" @click="close">CLOSE</button>
                `,
};

export { component as myComponent };
