const express = require('express')
const {login, register, checkCurrentUser} = require('../controllers/authController')

const router = express.Router()

router.route('/').get(checkCurrentUser)
router.route('/login').post(login)
router.route('/register').post(register)

module.exports = router