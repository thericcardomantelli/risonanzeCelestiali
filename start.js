const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

app.get('/render', (req, res) => {
  const scene = req.query.scene || 'black';
  io.emit('scene', scene);
  res.send(`Scene '${scene}' dispatched.`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});