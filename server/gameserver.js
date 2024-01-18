let clients;
let broadcast;
let currentData = {
    players: {}
}


const Start = (_clients, _broadcast) => {
    clients = _clients
    broadcast = _broadcast

    setInterval(() => {
        onUpdate()
    }, 15)
}

const onUpdate = () => {
    broadcast(currentData)
}

const LoadReceivedData = (data) => {
    currentData.players[data.id] = data
}

module.exports = {Start, LoadReceivedData}