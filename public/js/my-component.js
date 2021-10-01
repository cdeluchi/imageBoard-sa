import { myComment } from "./comments.js";

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
        // window.History.pushState(
        //     { url: "http://localhost:8080/" },
        //     "",
        //     "/images/:id"
        // );
    },
    methods: {
        showModal() {
            this.images;
            this.$emit("close");
        },
    },
    props: ["id"],
    template: `
                <div class="modal-image modal-cover">
                <div class="bck-modal">

                <img class="img-cover"  :src="images.url"><br/>
                <h2>{{images.title}}</h2><br/>
                 {{images.description}}<br/>

                <h4>Uploaded by <em>{{images.username}}</em><br/></h4>
                
                <button class="btn" @click="$emit('close')">close</button>
                
                <comment v-if="id" :id="id"></comment>
                </div>
                </div>
                
                `,

    components: {
        comment: myComment,
    },
};

export { component as myComponent };
