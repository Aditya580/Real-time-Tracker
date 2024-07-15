const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', function(socket) {
    socket.on("send-location",function(data) {
        io.emit("location-received", {id: socket.id, ...data}); // Broadcasting the location to all connected users.
      });

      socket.on('disconnect', function() {
        io.emit('user-disconnected',socket.id);
      });

    })


  console.log('New user connected');


app.get('/', function(req, res) {
  res.render("index");
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});