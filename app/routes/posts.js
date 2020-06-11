const express = require("express");
const Post = require("../models/Post")

const router = express.Router();
const ProductController = require("../controllers/PostController")

router.get("/", ProductController.getAll)
router.get("/:id", isPostExists, ProductController.getById)
router.post("/", ProductController.create)
router.put("/:id", isPostExists, ProductController.update)
router.delete("/:id", isPostExists, ProductController.deleteOne)

async function isPostExists(req, res, next) {
    let post;
    try {
        post = await Post.findOne({ _id: req.params.id });
        if (post == null) return res.status(404).json({ "success": false, "message": "The id is not exists" })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }

    res.post = post
    next()
}

module.exports = router;