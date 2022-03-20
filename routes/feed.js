const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const feedControler = require("../controler/feed");
const isAuth = require("../middleware/is-auth");
// router.use(isAuth);
router.get("/posts", isAuth, feedControler.getPosts);
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedControler.createPost
);
router.get("/post:postId", isAuth, feedControler.getPost);
router.put("/post/:postId", isAuth, feedControler.updatePost);
router.delete("/post/:postId", isAuth, feedControler.deletePost);
module.exports = router;
