const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom route to get all posts with isLiked field
server.get("/posts-enriched", (req, res) => {
  const db = router.db; // lowdb instance
  const posts = db.get("posts").value();
  const likes = db.get("likes").value();
  const userId = 2; // hardcoded user id for the "isLiked" field

  const enrichedPosts = posts.map((post) => {
    const postLikes = likes.filter((like) => like.postId === post.id);
    const isLiked = postLikes.some((like) => like.userId === userId);

    return {
      ...post,
      isLiked: isLiked,
    };
  });

  res.json(enrichedPosts);
});

server.use(router);
server.listen(8000, () => {
  console.log("Author: Lawther Nguyen");
  console.log("json-server running on port:");
  console.log("http://localhost:8000");
});
