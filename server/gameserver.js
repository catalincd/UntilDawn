let BULLET_SPEED_FACTOR = 35
let MAX_HEALTH = 100
let BULLET_HIT = 20

let clients;
let broadcast;
let lastBulletId = 0
let currentData = {
    players: {},
    bullets: {},
    health: {} ,
    dead: {},
    killFeed: [],
    kd: {}
}


const clearKillFeedEntry = () => {
    currentData.killFeed = currentData.killFeed.slice(1)
}

const addKillFeedEntry = (killed, killer) => {
    currentData.killFeed.push(`${killer} killed ${killed}`)
    setTimeout(clearKillFeedEntry, 4000)
}

const DeletePlayer = (id) => {
    delete currentData.players[id]
}

const Start = (_clients, _broadcast) => {
    clients = _clients
    broadcast = _broadcast

    setInterval(() => {
        onUpdate()
    }, 8)
}

const NewPlayer = (id) => {
    currentData.health[id] = MAX_HEALTH
    currentData.dead[id] = false
    currentData.kd[id] = {k: 0, d: 0}
}

const onUpdate = () => {
    
    UpdateBullets()
    UpdatePlayers()
    // check health & update scoreboard

    broadcast(currentData)
}

const distance = (x1, y1, x2, y2) => {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt( a*a + b*b );
}

const checkBulletHit = (bullet) => {
    let playerKeys = Object.keys(currentData.players)
    for(var i=0;i<playerKeys.length;i++)
    {
        let thisPlayer = currentData.players[playerKeys[i]]
 
        if(distance(thisPlayer.x, thisPlayer.y, bullet.pos.x, bullet.pos.y) < 50)
        {
            return playerKeys[i]
        }
    }

    return null
}

const KillPlayer = (playerId) => {
    currentData.dead[playerId] = true
    currentData.health[playerId] = MAX_HEALTH
    addKillFeedEntry(currentData.players[playerId].nick, currentData.players[currentData.players[playerId].lastHit].nick)
    currentData.kd[currentData.players[playerId].lastHit].k += 1
    currentData.kd[playerId].d += 1
}

const RespawnPlayer = (playerId) => {
    currentData.dead[playerId] = false
}

const UpdatePlayers = () => {
    let playerKeys = Object.keys(currentData.players)
    for(var i=0;i<playerKeys.length;i++)
    {
        if(currentData.health[playerKeys[i]] <= 0)
        {
            console.log(`DED: ${playerKeys[i]}`)
            KillPlayer(playerKeys[i])
            setTimeout(RespawnPlayer, 100, playerKeys[i])
        }
    }
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

        targetHit = checkBulletHit(currentBullet)
        if(targetHit != null)
        {
            currentData.health[targetHit] -= BULLET_HIT
            currentData.players[targetHit].lastHit = currentBullet.playerId
            delete currentData.bullets[bulletsKeys[i]]
            continue
        }

        const frontAngle = 0.0174532925 * currentBullet.angle //deg2rad
        const deltaX = Math.cos(frontAngle) * BULLET_SPEED_FACTOR
        const deltaY = Math.sin(frontAngle) * BULLET_SPEED_FACTOR

        currentBullet.pos.x += deltaX
        currentBullet.pos.y += deltaY

        // console.log(currentBullet)
    }

    // console.log(Object.keys(currentData.bullets).length)
}

const DeleteBullet = (bulletId) => {
    delete currentData.bullets[bulletId]
}

const FireBullets = (firedBullets) => {
    for(var i=0;i<firedBullets.length;i++)
    {
        currentData.bullets[lastBulletId] = {...firedBullets[i], id: lastBulletId}
        setTimeout(DeleteBullet, 5000, lastBulletId)
        lastBulletId++
    }
}

const LoadReceivedData = (data) => {
    currentData.players[data.id] = data.playerData
    FireBullets(data.firedBullets)
}

module.exports = {Start, LoadReceivedData, NewPlayer, DeletePlayer}