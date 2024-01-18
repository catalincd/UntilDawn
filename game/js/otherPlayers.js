class OtherPlayersManagerClass
{
    constructor() {
        this.GameScene = null;
        this.players = {}
        this.mainPlayer = null
        this.id = null
    }

    set(_gameScene, _player) {
        this.GameScene = _gameScene;
        this.mainPlayer = _player
    }

    update(data) {
        // console.log(data)

        let otherKeys = Object.keys(data.players)

        for(var i=0;i<otherKeys.length;i++)
        {
            let thisKey = parseInt(otherKeys[i])
            
            if(this.players[thisKey] == undefined)
            {
                console.log(`unfoundkey: ${thisKey}`)
                if(thisKey == this.id)
                {
                    this.players[thisKey] = {id: "ORIGINAL GANGSTA"}
                    console.log("OG:")
                    console.log(this.players)
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
            {
                this.mainPlayer.player.health = data.health[i]
                this.GameScene.healthBar.set(this.mainPlayer.player.health)

                if(data.dead[i] != undefined)
                    if(data.dead[i] && !this.mainPlayer.dead)
                    {
                        this.mainPlayer.onDeath()
                    }

                continue;
            }

            

            this.players[i].nickname = data.players[i].nick;
            this.players[i].player.x = data.players[i].x;
            this.players[i].player.y = data.players[i].y;
            this.players[i].player.angle = data.players[i].angle;

            if(data.dead[i] != undefined)
                this.players[i].setVisibility(!data.dead[i])
            

            this.players[i].onUpdate()
        }

        let theseKeys = Object.keys(this.players)

        for(var i=0;i<theseKeys.length;i++)
        {
            if(otherKeys.indexOf(theseKeys[i]) == -1)
            {
                if(this.players[theseKeys[i]] != undefined)
                {
                    this.players[theseKeys[i]].onDelete()
                    delete this.players[theseKeys[i]]
                    i--
                }
            }
        }
    }

}


let OtherPlayersManager = new OtherPlayersManagerClass()