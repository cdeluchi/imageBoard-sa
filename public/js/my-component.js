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
            });
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
                <h1>My Modal </h1>
                    id:{{id}}
                    <img  :src="images.url"><br/> 
                    Username: {{images.username}}<br/>
                    Title: {{images.title}}<br/>
                    Description: {{images.description}}<br/>
                    Url: {{images.url}}<br/>
                    Date: {{images.created_at}}<br/>
                    <button @click="$emit('close')">close</button><br/>
                `,
};

export { component as myComponent };
