const GameServer = require("./gameserver")
var WebSocketServer = require('ws').Server;   

const wssPort = process.env.PORT || 8080;            
const wss = new WebSocketServer({port: wssPort});
var clients = new Array;    

function handleConnection(client, request) {
	console.log("New Connection");       
	clients.push(client);  
	GameServer.NewPlayer(clients.indexOf(client))  

	function endClient() {
		var position = clients.indexOf(client);
		clients.splice(position, 1);
		console.log("connection closed");
	}

	function clientResponse(data) {
		// broadcast(data);
        onResponse(data, client)
	}

	client.on('message', clientResponse);
	client.on('close', endClient);
}

function onResponse(data, client) {
	data.id = clients.indexOf(client)
    const parsedData = JSON.parse(data)
    GameServer.LoadReceivedData(parsedData)
}

function broadcast(data) {
	for (c in clients) {
		clients[c].send(JSON.stringify({...data, id: c}));
	}
}


wss.on('connection', handleConnection);
GameServer.Start(clients, broadcast)