PLAYER_SCALE = 0.65
PLAYER_SPEED_FACTOR = 1.5
BULLET_SCALE = 2

class MainScene extends Phaser.Scene
{
    preload ()
    {
        this.load.multiatlas('player_rifle', 'res/player/player_rifle.json', 'res/player');
        this.load.multiatlas('player_feet', 'res/player/player_feet.json', 'res/player');
        this.load.image('bullet', 'res/bullet.png');
    }

    create ()
    {
        this.playerFeet = this.add.sprite(100, 200, 'player_feet', 'idle/survivor-idle_0.png');
        this.playerFeet.setScale(PLAYER_SCALE, PLAYER_SCALE);
        this.playerFeet.setOrigin(0.5, 0.6);

        this.player = this.add.sprite(100, 200, 'player_rifle', 'idle/survivor-idle_rifle_0.png');
        this.player.setScale(PLAYER_SCALE, PLAYER_SCALE);
        this.player.setOrigin(0.4, 0.73);

        this.lastAnimation = ""
        this.lastFeetAnimation = ""

        const idleFrames = this.anims.generateFrameNames('player_rifle', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'idle/survivor-idle_rifle_', suffix: '.png'
        });

        const moveFrames = this.anims.generateFrameNames('player_rifle', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'move/survivor-move_rifle_', suffix: '.png'
        });

        const shootFrames = this.anims.generateFrameNames('player_rifle', {
            start: 0, end: 2, zeroPad: 0,
            prefix: 'shoot/survivor-shoot_rifle_', suffix: '.png'
        });

        const reloadFrames = this.anims.generateFrameNames('player_rifle', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'reload/survivor-reload_rifle_', suffix: '.png'
        });

        const idleFeetFrames = this.anims.generateFrameNames('player_feet', {
            start: 0, end: 0, zeroPad: 0,
            prefix: 'idle/survivor-idle_', suffix: '.png'
        }); 

        const runFeetFrames = this.anims.generateFrameNames('player_feet', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'run/survivor-run_', suffix: '.png'
        }); 

        const runBackFeetFrames = this.anims.generateFrameNames('player_feet', {
            start: 19, end: 0, zeroPad: 0,
            prefix: 'run/survivor-run_', suffix: '.png'
        }); 

        const strafeLeftFrames = this.anims.generateFrameNames('player_feet', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'strafe_left/survivor-strafe_left_', suffix: '.png'
        }); 

        const strafeRightFrames = this.anims.generateFrameNames('player_feet', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'strafe_right/survivor-strafe_right_', suffix: '.png'
        }); 

        this.anims.create({ key: 'idle', frames: idleFrames, frameRate: 20, repeat: -1 });
        this.anims.create({ key: 'move', frames: moveFrames, frameRate: 20, repeat: -1 });
        this.anims.create({ key: 'shoot', frames: shootFrames, frameRate: 20, repeat: -1 });
        this.anims.create({ key: 'reload', frames: reloadFrames, frameRate: 20, repeat: -1 });

        this.anims.create({ key: 'idleFeet', frames: idleFeetFrames, frameRate: 30, repeat: -1 });
        this.anims.create({ key: 'runFeet', frames: runFeetFrames, frameRate: 30, repeat: -1 });
        this.anims.create({ key: 'runBackFeet', frames: runBackFeetFrames, frameRate: 30, repeat: -1 });
        this.anims.create({ key: 'strafeLeftFeet', frames: strafeLeftFrames, frameRate: 30, repeat: -1 });
        this.anims.create({ key: 'strafeRightFeet', frames: strafeRightFrames, frameRate: 30, repeat: -1 });


        this.player.anims.play('idle');

        this.movementKeys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });
        this.input.on('pointerdown', pointer => {
            let newBulletPos = this.getNewBulletPos()
            let newBullet = this.add.sprite(newBulletPos.x, newBulletPos.y, 'bullet')
            newBullet.setScale(BULLET_SCALE, BULLET_SCALE)
            newBullet.angle = this.player.angle
            this.bulletManager.bullets.push(newBullet)
        });

        this.bulletManager = new BulletManager(this)
    }

    update()
    {
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
        this.setFeetPos()
        this.bulletManager.update()
    }

    setPlayerAngle() {

        let player = this.player
        let cursor = game.input.mousePointer
        
        if(Phaser.Math.Distance.Between(player.x, player.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY) < 10)
            return 

        let angle = Phaser.Math.Angle.Between(player.x, player.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY)

        this.player.angle = Phaser.Math.RadToDeg(angle)
    }

    setFeetPos() {
        this.playerFeet.x = this.player.x
        this.playerFeet.y = this.player.y
        this.playerFeet.angle = this.player.angle
    }

    getNewBulletPos() {
        const frontAngle = Phaser.Math.DegToRad(this.player.angle)
        const deltaX = Math.cos(frontAngle) * PLAYER_SCALE * 165
        const deltaY = Math.sin(frontAngle) * PLAYER_SCALE * 165

        return {x: this.player.x + deltaX, y: this.player.y + deltaY}
    }
}




const config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);