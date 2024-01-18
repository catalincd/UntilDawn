class Controller {
    constructor(gameScene, playerClass){
        this.GameScene = gameScene
        this.playerClass = playerClass
    }
    
    onPreload(){

    }

    onCreate(){
        this.movementKeys = this.GameScene.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });
        this.GameScene.input.on('pointerdown', pointer => {
            var newBullet = {
                pos: this.playerClass.getNewBulletPos(),
                angle: this.player.angle
            }

            NetStateManager.FireBullet(newBullet)
        });

        this.player = this.playerClass.player
        this.playerFeet = this.playerClass.playerFeet
        console.log("CONTROLLER")
        console.log(this.playerClass)
        console.log(this.player)
    }

    onUpdate(){
        const frontAngle = Phaser.Math.DegToRad(this.player.angle)
        const deltaX = Math.cos(frontAngle) * PLAYER_SPEED_FACTOR
        const deltaY = Math.sin(frontAngle) * PLAYER_SPEED_FACTOR

        const sideAngle = Phaser.Math.DegToRad(this.player.angle + 90)
        const moveDeltaX = Math.cos(sideAngle) * PLAYER_SPEED_FACTOR
        const moveDeltaY = Math.sin(sideAngle) * PLAYER_SPEED_FACTOR

        let currentAnimation = "idle"
        let currentFeetAnimation = "idleFeet"

        if (this.movementKeys.right.isDown)
        {
            this.player.x += moveDeltaX;
            this.player.y += moveDeltaY;

            currentAnimation = "move"
            currentFeetAnimation = "strafeRightFeet"
        }

        if (this.movementKeys.left.isDown)
        {
            this.player.x -= moveDeltaX;
            this.player.y -= moveDeltaY;

            currentAnimation = "move"
            currentFeetAnimation = "strafeRightFeet"
        }

        if (this.movementKeys.up.isDown)
        {
            this.player.x += deltaX;
            this.player.y += deltaY;

            currentAnimation = "move"
            currentFeetAnimation = "runFeet"
        }

        if (this.movementKeys.down.isDown)
        {
            this.player.x -= deltaX;
            this.player.y -= deltaY;

            currentAnimation = "move"
            currentFeetAnimation = "runBackFeet"
        }

        if(this.player.x > 2000)this.player.x = 2000;
        if(this.player.y > 2000)this.player.y = 2000;

        if(this.lastAnimation != currentAnimation)
        {
            this.lastAnimation = currentAnimation
            this.player.anims.play(currentAnimation);
        }

        if(this.lastFeetAnimation != currentFeetAnimation)
        {
            this.lastFeetAnimation = currentFeetAnimation
            this.playerFeet.anims.play(currentFeetAnimation);
        }

        this.setPlayerAngle()
    }

    setPlayerAngle() {

        let player = this.player
        let cursor = game.input.mousePointer
        
        if(Phaser.Math.Distance.Between(player.x, player.y, cursor.x + this.GameScene.cameras.main.scrollX, cursor.y + this.GameScene.cameras.main.scrollY) < 10)
            return 

        let angle = Phaser.Math.Angle.Between(player.x, player.y, cursor.x + this.GameScene.cameras.main.scrollX, cursor.y + this.GameScene.cameras.main.scrollY)

        this.player.angle = Phaser.Math.RadToDeg(angle)
    }

}