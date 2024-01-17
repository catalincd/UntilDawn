// const connString = prompt("Enter connection string:")
const connString = `ws://localhost:8080`

const onloadcallback = () => {
    openSocket(connString)
}

window.addEventListener("load", onloadcallback)