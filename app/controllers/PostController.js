const Post = require("../models/Post")

async function getAll(req, res) {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (err) {
        res.json({ message: err })
    }
}

async function getById(req, res) {
    try {
        res.json(res.post);
    } catch (err) {
        res.json({ message: err })
    }
}

async function create(req, res) {
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc
    })

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost)
    }
    catch (err) {
        res.json({ message: err })
    }
}

async function update(req, res) {
    try {

        if(req.body.title != null) {
            res.post.title = req.body.title
        }

        if(req.body.desc != null) {
            res.post.desc = req.body.desc
        }

        await res.post.save()
        res.json(res.post)
    }
    catch (err) {
        res.json({ message: err })
    }
}

async function deleteOne(req, res) {
    try {
        await res.post.remove()
        res.json({ "success": true });
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteOne
}