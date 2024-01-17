class AnimatorClass {
    constructor(gameScene){
        this.GameScene = gameScene
    }
    
    onPreload(){

    }

    onCreate(){

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
    }

    onUpdate(){

    }

}