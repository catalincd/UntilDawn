class Player {
    constructor(gameScene){
        this.GameScene = gameScene

        this.player = null
        this.lastAnimation = ""
        this.lastFeetAnimation = ""
    }

    onPreload() {

    }

    onCreate() {
        const startX = 500 + Math.floor(Math.random() * 500)
        const startY = 500 + Math.floor(Math.random() * 500)

        this.playerFeet = this.GameScene.physics.add.sprite(startX, startY, 'player_feet', 'idle/survivor-idle_0.png');
        this.playerFeet.setScale(PLAYER_SCALE, PLAYER_SCALE);
        this.playerFeet.setOrigin(0.5, 0.6);

        this.player = this.GameScene.physics.add.sprite(startX, startY, 'player_rifle', 'idle/survivor-idle_rifle_0.png');
        this.player.setScale(PLAYER_SCALE, PLAYER_SCALE);
        this.player.setOrigin(0.4, 0.73);

        console.log(this.player)
        
        this.player.setCollideWorldBounds(true)
        this.playerFeet.setCollideWorldBounds(true)

        this.GameScene.cameras.main.startFollow(this.player)
        this.GameScene.minimap.startFollow(this.player)        

        const idleFrames = this.GameScene.anims.generateFrameNames('player_rifle', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'idle/survivor-idle_rifle_', suffix: '.png'
        });

        const moveFrames = this.GameScene.anims.generateFrameNames('player_rifle', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'move/survivor-move_rifle_', suffix: '.png'
        });

        const shootFrames = this.GameScene.anims.generateFrameNames('player_rifle', {
            start: 0, end: 2, zeroPad: 0,
            prefix: 'shoot/survivor-shoot_rifle_', suffix: '.png'
        });

        const reloadFrames = this.GameScene.anims.generateFrameNames('player_rifle', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'reload/survivor-reload_rifle_', suffix: '.png'
        });

        const idleFeetFrames = this.GameScene.anims.generateFrameNames('player_feet', {
            start: 0, end: 0, zeroPad: 0,
            prefix: 'idle/survivor-idle_', suffix: '.png'
        }); 

        const runFeetFrames = this.GameScene.anims.generateFrameNames('player_feet', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'run/survivor-run_', suffix: '.png'
        }); 

        const runBackFeetFrames = this.GameScene.anims.generateFrameNames('player_feet', {
            start: 19, end: 0, zeroPad: 0,
            prefix: 'run/survivor-run_', suffix: '.png'
        }); 

        const strafeLeftFrames = this.GameScene.anims.generateFrameNames('player_feet', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'strafe_left/survivor-strafe_left_', suffix: '.png'
        }); 

        const strafeRightFrames = this.GameScene.anims.generateFrameNames('player_feet', {
            start: 0, end: 19, zeroPad: 0,
            prefix: 'strafe_right/survivor-strafe_right_', suffix: '.png'
        }); 

        this.GameScene.anims.create({ key: 'idle', frames: idleFrames, frameRate: 20, repeat: -1 });
        this.GameScene.anims.create({ key: 'move', frames: moveFrames, frameRate: 20, repeat: -1 });
        this.GameScene.anims.create({ key: 'shoot', frames: shootFrames, frameRate: 20, repeat: -1 });
        this.GameScene.anims.create({ key: 'reload', frames: reloadFrames, frameRate: 20, repeat: -1 });

        this.GameScene.anims.create({ key: 'idleFeet', frames: idleFeetFrames, frameRate: 30, repeat: -1 });
        this.GameScene.anims.create({ key: 'runFeet', frames: runFeetFrames, frameRate: 30, repeat: -1 });
        this.GameScene.anims.create({ key: 'runBackFeet', frames: runBackFeetFrames, frameRate: 30, repeat: -1 });
        this.GameScene.anims.create({ key: 'strafeLeftFeet', frames: strafeLeftFrames, frameRate: 30, repeat: -1 });
        this.GameScene.anims.create({ key: 'strafeRightFeet', frames: strafeRightFrames, frameRate: 30, repeat: -1 });

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
        const deltaX = Math.cos(frontAngle) * PLAYER_SCALE * 165
        const deltaY = Math.sin(frontAngle) * PLAYER_SCALE * 165

        return {x: this.player.x + deltaX, y: this.player.y + deltaY}
    }
}