const Post = require('../models/post')

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('author', '-password').sort({createdAt: -1})
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: { posts }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.createPost = async (req, res) => {
    try {
        const {userId} = req.user
        
        const post = await Post.create({...req.body, author: userId})
        res.status(200).json({
            status: "success",
            data: { post }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.updatePost = async (req, res) => {
    try {
        const {postId} = req.params
        const post = await Post.findByIdAndUpdate(postId, {...req.body}, {new: true, runValidators: true})
        res.status(200).json({
            status: "success",
            data: { post }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const {postId} = req.params
        await Post.findByIdAndDelete(postId)
        res.status(200).json({
            status: "success",
            message: "Post has been deleted"
        })
    } catch (error) {
        res.json(error)
    }
}