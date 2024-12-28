const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors package

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS for all origins (or specify the frontend URL)
app.use(cors({ origin: 'http://localhost:3333' })); // Change this to your frontend URL if needed

let tableData = [
  ["John", "Doe", "johndoe@example.com"],
  ["Jane", "Smith", "janesmith@example.com"]
];

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Send current table data to the new user
  socket.emit('load-data', tableData);

  // Broadcast table data updates to all connected clients
  socket.on('update-data', (updatedData) => {
    tableData = updatedData;
    socket.broadcast.emit('load-data', tableData); // Broadcast to all clients
  });

  // Function to emit the number of connected users
  const updateConnectedUsersCount = () => {
    io.emit('connected-users', io.sockets.sockets.size);
  };

  // Send the initial count when a user connects
  updateConnectedUsersCount();

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    updateConnectedUsersCount(); // Update the count after a user disconnects
  });
});

server.listen(3333, () => {
  console.log('Server is running on http://localhost:3333');
});
