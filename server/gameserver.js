let BULLET_SPEED_FACTOR = 35

let clients;
let broadcast;
let lastBulletId = 0
let currentData = {
    players: {},
    bullets: {}
}


const Start = (_clients, _broadcast) => {
    clients = _clients
    broadcast = _broadcast

    setInterval(() => {
        onUpdate()
    }, 8)
}

const onUpdate = () => {
    
    UpdateBullets()
    // check health


    broadcast(currentData)
}


const UpdateBullets = () => {
    let bulletsKeys = Object.keys(currentData.bullets)
    for(var i=0;i<bulletsKeys.length;i++)
    {
        let currentBullet = currentData.bullets[bulletsKeys[i]]

        if(currentBullet.x < -500 || currentBullet.x > 3000 || currentBullet.y < -500 || currentBullet.y > 3000)
        {
            delete currentData.bullets[bulletsKeys[i]]
            continue
        }

        // did it hit any player??

        const frontAngle = 0.0174532925 * currentBullet.angle //deg2rad
        const deltaX = Math.cos(frontAngle) * BULLET_SPEED_FACTOR
        const deltaY = Math.sin(frontAngle) * BULLET_SPEED_FACTOR

        currentBullet.pos.x += deltaX
        currentBullet.pos.y += deltaY

        // console.log(currentBullet)
    }
}

const FireBullets = (firedBullets) => {
    for(var i=0;i<firedBullets.length;i++)
    {
        currentData.bullets[lastBulletId] = {...firedBullets[i], id: lastBulletId}
        lastBulletId++
    }
}

const LoadReceivedData = (data) => {
    currentData.players[data.id] = data.playerData
    FireBullets(data.firedBullets)
}

module.exports = {Start, LoadReceivedData}