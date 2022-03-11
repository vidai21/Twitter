const express = require('express')
const {getProfile} = require('../controllers/profileController')

const router = express.Router()

router.route('/:id').get(getProfile)

module.exports = router