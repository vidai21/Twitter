const Post = require('../models/post')

exports.getProfile = async (req, res) => {
    try {
        const {id} = req.params
        const posts = await Post.find({author: id}).populate('author', '-password').sort({createdAt: -1})
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: { posts }
        })
    } catch (error) {
        res.status(400).json(error)
    }
}