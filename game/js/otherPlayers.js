class OtherPlayersManagerClass
{
    constructor() {
        this.GameScene = null;
        this.players = {}
        this.id = null
    }

    set(_gameScene) {
        this.GameScene = _gameScene;
    }

    update(data) {
        //console.log(data)


        let otherKeys = Object.keys(data.players)

        for(var i=0;i<otherKeys.length;i++)
        {
            let thisKey = otherKeys[i]
            
            if(this.players[thisKey] == undefined)
            {
                console.log(`unfoundkey: ${thisKey}`)
                if(thisKey == this.id)
                {
                    this.players[thisKey] = {id: "ORIGINAL GANGSTA"}
                    continue
                }
                else
                {
                    let newPlayer = new Player(this.GameScene)
                    newPlayer.onCreate(false)
    
                    this.players[thisKey] = newPlayer
                    console.log(`Hello player ${thisKey}!!!!!!`)
                }
            }
        }

        for(var i=0;i<otherKeys.length;i++)
        {
            if(i == this.id)
                continue;

            this.players[i].player.x = data.players[i].x;
            this.players[i].player.y = data.players[i].y;
            this.players[i].player.angle = data.players[i].angle;
            this.players[i].onUpdate()
        }

    }
}


let OtherPlayersManager = new OtherPlayersManagerClass()