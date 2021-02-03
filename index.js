const express = require('express');
const app = express();
const socket =require('socket.io');
const port = 4000;


const server = app.listen(port,()=>console.log(`Server is Listening at port ${port}`));

app.use(express.static('public'));

//socket setup
const io = socket(server);

io.on('connection',(socket)=>{
    console.log(`new Client Connected ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on('chat',(data)=>{
          console.log(data);
        io.sockets.emit('chat',data);
      })
      socket.on('typing',(data)=>{
            // console.log(data);
            socket.broadcast.emit('typing',data);
      })
})

