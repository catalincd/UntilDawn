class NetStateManagerClass {
    constructor() {
        this.player = null
        this.queuedBullets  = []
        this.id = null
    }

    FireBullet(bullet) {
        this.queuedBullets.push(bullet)
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
        return {id: this.id, playerData: {id: this.id, x: this.player.x, y:this.player.y, angle:this.player.angle}, firedBullets: this.queuedBullets}
    }
}

let NetStateManager = new NetStateManagerClass()