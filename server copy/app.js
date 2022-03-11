require('dotenv').config()
//connect DB
const {connectDB} = require('./configs/db')
connectDB()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')
const profileRoute = require('./routes/profileRoute')

const app = express()

app.use(bodyParser.json()); 
app.use(cors())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/post', postRoute)
app.use('/api/v1/profile', profileRoute)

const port = process.env.APP_PORT

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: `http://localhost:3000`,
    }
})

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("disconnect", () => {

    })

    socket.on('chat_with', (data) => {
        socket.join(data)
        console.log(data)
    })
})

app.listen(port, () => {
    console.log(port)
})