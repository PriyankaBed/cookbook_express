const express = require("express");
const cors = require("cors");
const data = require("./data.json");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.get("/posts", (req, res) => {
    res.json(data.items);
});

app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    const post = data.items.find((post) => {
        return post.sys.id === id;
    });
    res.json(post);
});

app.listen(port, () => {
    console.log(`Server is working on port http://localhost:${port}`);
});
