class NetStateManagerClass {
    constructor() {
        this.player = null
        this.id = null
    }

    LoadReceivedData(data) {
        this.id = data.id
        OtherPlayersManager.id = data.id
        OtherPlayersManager.update(data)
    }
    
    GetCurrentData() {
        return {id: this.id, x: this.player.x, y:this.player.y, angle:this.player.angle}
    }
}

let NetStateManager = new NetStateManagerClass()