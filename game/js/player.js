class Player {
    constructor(gameScene){
        this.GameScene = gameScene

        this.dead = false
        this.player = null
        this.nickname = "Player"
        this.lastAnimation = ""
        this.lastFeetAnimation = ""

        MainPlayer = this
    }

    onPreload() {

    }

    onCreate(isMainPlayer = true) {
        const startX = 200 + Math.floor(Math.random() * 1800)
        const startY = 200 + Math.floor(Math.random() * 1800)


        var style = { font: "16px Arial", fill: "#ffffff", align: "left", stroke: "#000000"};
        this.nickText = this.GameScene.add.text(0, 0, '', style).setOrigin(0.5);
        this.nickText.depth = 99
        
        this.playerFeet = this.GameScene.physics.add.sprite(startX, startY, 'player_feet', 'idle/survivor-idle_0.png');
        this.playerFeet.setScale(PLAYER_SCALE, PLAYER_SCALE);
        this.playerFeet.setOrigin(0.5, 0.6);

        this.player = this.GameScene.physics.add.sprite(startX, startY, 'player_rifle', 'idle/survivor-idle_rifle_0.png');
        this.player.setScale(PLAYER_SCALE, PLAYER_SCALE);
        this.player.setOrigin(0.4, 0.73);
        
        this.player.setCollideWorldBounds(true, 200, 200)

        if(isMainPlayer)
        {
            this.GameScene.cameras.main.startFollow(this.player)
            this.GameScene.minimap.startFollow(this.player)      
        }  

        this.player.anims.play('idle');
    }

    setVisibility(vis) {
        /*
        this.player.visible = vis
        this.playerFeet.visible = vis
        this.nickText.visible = vis
        */
    }

    onDeath() {
        this.dead = true
        
        this.player.x = 200 + Math.floor(Math.random() * 1800);
        this.player.y = 200 + Math.floor(Math.random() * 1800);

        this.dead = false
    }


    onUpdate() {
        this.setFeetPos()

        this.nickText.x = this.player.x
        this.nickText.y = this.player.y - 80
        this.nickText.setText(this.nickname)
    }

    onDelete() {
        this.player.destroy()
        this.playerFeet.destroy()
        this.nickText.destroy()
    }

    setFeetPos() {
        this.playerFeet.x = this.player.x
        this.playerFeet.y = this.player.y
        this.playerFeet.angle = this.player.angle
    }

    getNewBulletPos() {
        const frontAngle = Phaser.Math.DegToRad(this.player.angle)
        const deltaX = Math.cos(frontAngle) * PLAYER_SCALE * 150
        const deltaY = Math.sin(frontAngle) * PLAYER_SCALE * 150

        return {x: this.player.x + deltaX, y: this.player.y + deltaY}
    }
}


var MainPlayer = null