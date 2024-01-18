const myNickname = prompt("Enter your nickname:")
const connString = `ws://79.114.80.68:8080`

const onloadcallback = () => {
    setTimeout(openSocketCallback, 2000)
}

const openSocketCallback = () => {
    openSocket(connString)
}

window.addEventListener("load", onloadcallback)