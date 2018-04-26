const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
var server = require('http').createServer(app);
var io = require('socket.io')((server));

app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

server.listen(port);
app.listen(port, () => console.log(`Listening on port ${port}`));

io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
	
    console.log("We have a new client: " + socket.id);
    
    socket.on('joinroom', function(room) {
      socket.join(room);
      io.sockets.in(room).emit('message', room);
    });
		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('joinedhost', function() {
			// Data comes in as whatever was sent, including objects
      
      // emit randomly generated game code here

      var data = "hello world";

			// Send it to all of the clients
			socket.broadcast.emit('gamemessage', data);
		});
		
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);