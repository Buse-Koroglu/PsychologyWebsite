const express = require("express");
const router = express.Router();

const {allPosts} = require("../controllers/postController");

router.get('/api/posts', allPosts);

module.exports = router;
