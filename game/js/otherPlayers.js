class OtherPlayersManagerClass
{
    constructor() {
        this.GameScene = null;
        this.players = [{id: 0}]
        this.id = null
    }

    set(_gameScene) {
        this.GameScene = _gameScene;
    }

    update(data) {
        console.log(data)

        while(data.players.length > this.players.length)
        {
            let newPlayer = new Player(this.GameScene)
            this.players.push(newPlayer)
            console.log("NEW PLAYER")
            console.log(newPlayer)
        }
        
        for(var i=0;i<this.players.length;i++)
        {
            if(i == this.id)
                continue;

            console.log(this.players)

            this.players[i].player.x = data.players[i].x;
            this.players[i].player.y = data.players[i].y;
            this.players[i].player.angle = data.players[i].angle;
        }
    }
}


let OtherPlayersManager = new OtherPlayersManagerClass()