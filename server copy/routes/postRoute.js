const express = require('express')
const {getAllPosts, createPost, updatePost, deletePost} = require('../controllers/postController')
const { verifyToken } = require('../middlewares/verifyToken')

const router = express.Router()

router.route('/').get(getAllPosts).post(verifyToken, createPost)
router.route('/:postId').put(verifyToken, updatePost).delete(verifyToken, deletePost)

module.exports = router