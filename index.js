import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/post", (req, res) => {
    res.render("newPost.ejs");
});

app.post("/posts", (req, res) => {
    const postTitle = req.body["title"];
    const postBody = req.body["post"];
    const postObj = {
        "title": postTitle,
        "post": postBody
    };
    posts.push(postObj);
    const totalPosts = posts.length;
    const date = new Date();
    const currentDay = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    res.render("posts.ejs", {posts: posts, totalPosts: totalPosts, currentDay: currentDay});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
