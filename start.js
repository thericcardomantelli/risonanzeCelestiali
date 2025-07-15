const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

console.log('Express server and Socket.IO initialized.');

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.get('/render', (req, res) => {
  const scene = req.query.scene || 'black';
  console.log(`/render called. Dispatching scene: '${scene}'`);
  io.emit('scene', scene);
  res.send(`Scene '${scene}' dispatched to all clients.`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
