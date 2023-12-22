const express = require('express');
const { createServer } = require('node:http')
const { join } = require('node:path');
const { Server } = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'index.html'));
})

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('chat-msg',(msg)=>{
        io.emit('chat-msg',msg);
    })

})

server.listen(3000,()=>{
    console.log('server running at port 3000');
})