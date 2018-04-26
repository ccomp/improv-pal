import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client'

var gameCode = "";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
var socket = io.connect();

socket.on('connect', function() {
  console.log("Connected");
  gameCode = makeid();
  socket.emit('joinroom', gameCode);
});

socket.on('message', function(data) {
  console.log("Incoming message:", data);
});

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
