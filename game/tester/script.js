let serverURL;

let socket;
let incomingSpan;
let outgoingText;
let connectionSpan;
let connectButton;

function setup() {
  incomingSpan = document.getElementById('incoming');
  outgoingText = document.getElementById('outgoing');
  connectionSpan = document.getElementById('connection');
  connectButton = document.getElementById('connectButton');
  outgoingText.addEventListener('change', sendMessage);
  connectButton.addEventListener('click', changeConnection);
  serverURL = document.getElementById('serverURL').value;
  openSocket(serverURL);
}

function openSocket(url) {
  socket = new WebSocket(url);
  socket.addEventListener('open', openConnection);
  socket.addEventListener('close', closeConnection);
  socket.addEventListener('message', readIncomingMessage);
}


function changeConnection(event) {
  if (socket.readyState === WebSocket.CLOSED) {
    openSocket(serverURL);
  } else {
    socket.close();
  }
}

function openConnection() {
  connectionSpan.innerHTML = "true";
  connectButton.value = "Disconnect";
}

function closeConnection() {
  connectionSpan.innerHTML = "false";
  connectButton.value = "Connect";
}

function readIncomingMessage(event) {
  incomingSpan.innerHTML = event.data;
}

function sendMessage() {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(outgoingText.value);
  }
}

window.addEventListener('load', setup);