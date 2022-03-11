const express = require('express')
const { accessChat, fetchChats } = require('../controllers/chatController')
const { verifyToken } = require('../middlewares/verifyToken')

const router = express.Router()

router.route('/').post(verifyToken, accessChat).get(verifyToken, fetchChats)

module.exports = router