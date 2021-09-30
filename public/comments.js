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
                this.comments = rows;
                console.log("this.comments", this.comments);
            });
    },
    methods: {
        submitComment() {
            console.log("add comment", this.username, this.comment, this.id);

            const newComment = {};
            newComment.username = this.username;
            newComment.comment = this.comment;
            newComment.id = this.id;

            fetch("/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            })
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch((err) => console.log(err));
        },
    },

    props: ["id"],
    template: `
        <div class="comWrapper" >
            <h3>Comment the image</h3>
            <form class="form-input">
            <input v-model="comment" type="text" name="comment" placeholder="comment">
            <input v-model="username" type="text" name="username" placeholder="username">
            <button @click.prevent="submitComment" type="submit">SUBMIT THE COMMENT</button>
            </form>
            <div id="comment-grid">
            <div v-for="comment in comments">
            <h4>{{comment.username}} commented {{comment.comment}} on {{comment.created_at}}</h4>
            </div>
            </div>
            </div>
    `,
};

export { comment as myComment };
