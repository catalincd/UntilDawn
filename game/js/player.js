class Player {
    constructor(gameScene){
        this.GameScene = gameScene

        this.player = null
        this.lastAnimation = ""
        this.lastFeetAnimation = ""
    }

    onPreload() {

    }

    onCreate(isMainPlayer = true) {
        const startX = 500 + Math.floor(Math.random() * 500)
        const startY = 500 + Math.floor(Math.random() * 500)

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

        this.player.health = 5
        this.player.anims.play('idle');
    }

    onUpdate() {
        this.setFeetPos()
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
