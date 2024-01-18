// const connString = prompt("Enter connection string:")
const connString = `ws://localhost:8080`

const onloadcallback = () => {
    setTimeout(openSocketCallback, 5000)
}

const openSocketCallback = () => {
    openSocket(connString)
}

window.addEventListener("load", onloadcallback)