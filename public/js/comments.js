const comment = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    mounted() {
        // console.log("this is a component mounted in comments");
        fetch(`/comments/${this.id}`)
            .then((response) => response.json())
            .then(({ rows }) => {
                // console.log("comments", rows);
                this.comments = rows;
                // console.log("this.comments", this.comments);
            });
    },
    methods: {
        submitComment() {
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
                .then((result) => {
                    // console.log(result);
                    this.comments.push(result.rows[0]);
                })
                .catch((err) => console.log(err));
        },
        deleteComment(index) {
            this.comments.splice(index, 1);
        },
    },

    props: ["id"],
    template: `
        <div class="commWrapper" >
            <form class="form-input">
            <input v-model="comment" type="text" name="comment" placeholder="comment">
            <input v-model="username" type="text" name="username" placeholder="username">
            <button @click.prevent="submitComment" type="submit">SUBMIT THE COMMENT</button>
            <button @click.prevent="deleteComment" type="delete">DELETE THE COMMENT</button>
            </form>
            <div id="showComment">
                        <div v-for="comment in comments">
                            <p> <strong> Name:</strong> {{comment.username}} <br/> <strong>Comment: </strong>{{comment.comment}}</p>
                        </div>
                    </div>
            </div>
    `,
};

export { comment as myComment };
