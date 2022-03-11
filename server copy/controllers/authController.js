const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.checkCurrentUser = async (req, res) => {
    try {
        const Authorization = req.header('Authorization')
        if(!Authorization){

        }
        const token = Authorization.replace('Bearer ', '')
        const {userId} = jwt.verify(token, process.env.APP_SECRET)
        const user = await User.findById(userId)
        res.json({
            user: user
        })
    } catch (error) {
        
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            res.status(400).json({
                status: "failure",
                message: "Email does not exist" 
            })
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({userId: user._id}, process.env.APP_SECRET)
            res.status(200).json({
                status: "success",
                data: { token, user: user }
            })
        }
        else{
            res.status(400).json({
                status: "failure",
                message: "Incorrect password"
            })
        }
    } catch (error) {
        
    }
}

exports.register = async (req, res) => {
    try {
        const checkEmail = await User.findOne({email: req.body.email})
        const checkName = await User.findOne({fullname: req.body.fullname})
        if(checkName && !checkEmail){
            res.status(400).json({
                status: "failure",
                message: "Username already exists"
            })
        }
        else if(checkEmail && !checkName){
            res.status(400).json({
                status: "failure",
                message: "Email already exists"
            })
        }
        else if(checkName && checkEmail){
            res.status(400).json({
                status: "failure",
                message: ["Username already exists", "Email already exists"]
            })
        }
        else{
            const user = await User.create(req.body)
            const token = jwt.sign(user._id, process.env.APP_SECRET)
            res.status(200).json({
                status: "success",
                data: { user, token }
            })
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
