const GameServer = require("./gameserver")
var WebSocketServer = require('ws').Server;   

const wssPort = process.env.PORT || 8080;            
const wss = new WebSocketServer({port: wssPort});
var clients = new Array;    

function handleConnection(client, request) {
	console.log("New Connection");       
	clients.push(client);    

	function endClient() {
		var position = clients.indexOf(client);
		clients.splice(position, 1);
		console.log("connection closed");
	}

	function clientResponse(data) {
		// broadcast(data);
        onResponse(data)
	}

	client.on('message', clientResponse);
	client.on('close', endClient);
}

function onResponse(data) {
    const parsedData = JSON.parse(data)
	console.log("RECEIVED:")
	console.log(parsedData)
    GameServer.LoadReceivedData(parsedData)
}

function broadcast(data) {
    console.log("--SEND--")
	console.log("CLIENTS LEN" + clients.length)
    console.log(data)
	for (c in clients) {
		
		clients[c].send(JSON.stringify({...data, id: c}));
	}
}


wss.on('connection', handleConnection);
GameServer.Start(clients, broadcast)