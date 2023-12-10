const connString = prompt("Enter connection string:")

const onloadcallback = () => {
    openSocket(connString)
}

window.addEventListener("load", onloadcallback)