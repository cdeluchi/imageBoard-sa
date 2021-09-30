const comment = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    mounted() {
        console.log("this is a component mounted in comments");
        fetch(`/comments/${this.id}`)
            .then((response) => response.json())
            .then(({ rows }) => {
                console.log("comments", rows);
                this.comments = rows[0];
            });
    },
    methods: {
        // addCommentButton() {
        //     console.log("add comment button");
        //     this.comment;
        //     this.username;
        //     this.id;
        //     this.$emit("close");
        //     const userComment = {};
        //     userComment.username = this.username;
        //     userComment.comment =
        // },
    },

    props: ["id"],
    template: `
        <div class="comWrapper" >
            
        </div>
    `,
};

export { comment as myComponent };
