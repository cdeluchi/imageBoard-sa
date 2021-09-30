// import { comment } from "../myComment";

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

                <img class="img-cover"  :src="images.url"><br/>

                <h2>{{images.title}}<br/></h2>

                <h4>Uploaded by {{images.username}} on 
                </br>
                {{images.created_at}}</h4>

                Description: {{images.description}}<br/>

                <button class="btn" @click="$emit('close')">close</button><br/>
                
                </div>
                </div>
                
                `,

    // <comment v-if="id :id="id"></comment>
    // components: {
    //     "comment-modal": myComment,
    // },
};

export { component as myComponent };
