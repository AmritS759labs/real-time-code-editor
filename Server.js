const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;
const ACTIONS = require('./src/Actions');
const path = require("path");

app.use(express.static('build'));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const userSocketMap = {};


function getAllConnectedClients(roomId){
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
     return {
       socketId,
       userName: userSocketMap[socketId]
     }
  });
}

io.on('connection', (socket) => {
  console.log('Socket connected ', socket.id);
  socket.once(ACTIONS.JOIN, ({roomId, userName}) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log(clients)
    clients.forEach(({socketId}) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        userName,
        socketId: socket.id
      })
    })
  });

  socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {code})
  })

  socket.on(ACTIONS.SYNC_CODE, ({socketId, code}) => {
    socket.in(socketId).emit(ACTIONS.CODE_CHANGE, {code})
  })

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomID) => {
     socket.in(roomID).emit(ACTIONS.DISCONNECTED, {
       socketId: socket.id,
       userName: userSocketMap[socket.id]
     })

    });
    delete userSocketMap[socket.id];
    socket.leave();
  })
})


server.listen(PORT, () => console.log(`Listen on PORT: ${PORT}`));
