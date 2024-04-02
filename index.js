const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const express = require('express');
const app = express();

const PORT = process.env.PORT;

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'))

io.on("connection", (socket) => {
    console.log("Connected...");
    socket.on('message', (msg) => {
        //send to client
        socket.broadcast.emit('message', msg);
    })
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

