const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const  userSchema = new mongoose.Schema({
    fullname: {type: String, unique: true, trim: true, required: [true, 'Username must be required']},
    email: {type: String, unique: true, trim: true, required: [true, 'Email must be required']},
    password: {type: String, trim: true, required: [true, 'Password must be required'], minlength: [6, 'Password must be at least 6 characters']},
    pic: {type: String, default: '../public/images/avt.jpg'}
}, {timestamps: true})

userSchema.pre('save', function(next){
    let user = this
    bcrypt.hash(user.password, 10, function(error, hash){
        if(error){
            return next(error)
        }
        else{
            user.password = hash;
            next()
        }
    })
})

const User = mongoose.model('User', userSchema)
module.exports = User