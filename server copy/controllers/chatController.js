const Chat = require('../models/chat')
const User = require('../models/user')

const accessChat = async(req, res) => {
    const userId = req.body
    
    if(!userId){
        console.log('id not sent')
        return res.status(400)
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user.userId}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    }).populate('users','-password').populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name email'
    })

    if(isChat.length > 0){
        res.json(isChat[0])
    }else{
        var chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user.userId, userId]
        }

        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate('users','-password')
            res.status(200).json(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error (error.message)
        }
    }
}

const fetchChats = async(req, res) => {
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user.userId}}})
        .populate('users', '-password')
        .populate('latestMessage')
        .sort({updatedAt: -1})
        .then(async (results) => {
            results = await User.populate(results, {
                path: 'latestMessage.sender',
                select: 'name email'
            })
            res.status(200).json(results)
        })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
}

module.exports = { accessChat, fetchChats }