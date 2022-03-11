const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    const Authorization = req.header('Authorization')

    if(!Authorization){

    }
    const token = Authorization.replace('Bearer ', '')

    const {userId} = jwt.verify(token, process.env.APP_SECRET)

    req.user = {userId}
    next()
}