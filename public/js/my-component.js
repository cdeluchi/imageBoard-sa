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
                <div class="modal-image modal-cover">
                <div class="bck-modal">

                <img class="img-cover"  :src="images.url">
                <h2>{{images.title}}</h2>
                 {{images.description}}


                <h4>Uploaded by <em>{{images.username}}</em> on 
                
                {{images.created_at}}</h4>
                

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

// ****FIX THE CREATED_AT***//
