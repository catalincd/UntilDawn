let socket;

const openSocket = (url) => {
    socket = new WebSocket(url);
    socket.addEventListener('open', openConnection);
    socket.addEventListener('close', closeConnection);
    socket.addEventListener('message', readIncomingMessage);
}

function openConnection() {
    console.log("on-connect")
}

function closeConnection() {
    console.log("on-close")
}

function readIncomingMessage(event) {
    NetStateManager.LoadReceivedData(JSON.parse(event.data))

    sendMessage(JSON.stringify(NetStateManager.GetCurrentData()))
    NetStateManager.ClearTempData()
}

function sendMessage(data) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
    }
}