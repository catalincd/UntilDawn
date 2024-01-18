class NetStateManagerClass {
    constructor() {
        this.player = null
        this.queuedBullets  = []
        this.id = null
    }

    FireBullet(bullet) {
        this.queuedBullets.push({...bullet, playerId: this.id})
    }

    ClearTempData() {
        this.queuedBullets = []
    }

    LoadReceivedData(data) {
        this.id = data.id

        OtherPlayersManager.id = data.id
        OtherPlayersManager.update(data)

        BulletManager.addAndCheckBullets(data.bullets)
    }
    
    GetCurrentData() {
        const data = {id: this.id, playerData: {id: this.id, nick: myNickname, x: this.player.x, y:this.player.y, angle:this.player.angle}, firedBullets: this.queuedBullets}
        // console.log(data)
        return data
    }
}

let NetStateManager = new NetStateManagerClass()