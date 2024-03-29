PLAYER_SCALE = 0.65
PLAYER_SPEED_FACTOR = 4
BULLET_SCALE = 2

class MainScene extends Phaser.Scene
{
    preload ()
    {
        this.load.multiatlas('player_rifle', 'res/player/player_rifle.json', 'res/player');
        this.load.multiatlas('player_feet', 'res/player/player_feet.json', 'res/player');
        this.load.image('bullet', 'res/bullet.png');
        this.load.image('gravel', 'res/gravel.png');
        this.load.image('tree', 'res/tree.png');
        this.load.image('pixel', 'res/pixel.png');
        this.load.tilemapTiledJSON('asd', 'res/map.json');

        this.Player = new Player(this)
        this.Player.nickname = myNickname
        this.Controller = new Controller(this, this.Player)
        this.Animator = new AnimatorClass(this)

        

        OtherPlayersManager.set(this, this.Player)
        
    
    }
    create ()
    {
        
        
        const map = this.make.tilemap({key: 'asd', tileWidth: 256, tileHeight: 256}, {key: 'asd2', tileWidth: 512, tileHeight: 512})
        const tileset1 = map.addTilesetImage('asd','gravel')
        const tileset2 = map.addTilesetImage('asd2','tree')
        const layer1 = map.createLayer("Tile Layer 1", tileset1, 0, 0)
        const layer2 = map.createLayer("trees", tileset2, 0, 0)

        map.getObjectLayer("trees").objects.forEach(object => {
            const sprite = this.physics.add.sprite(object.x, object.y, "tree")
            sprite.depth = 100
        })

        //cam
        this.cameras.main.setBounds(0, 0, 100 * 256, 100 * 256)
        this.physics.world.setBounds(0, 0, 100 * 256, 100 * 256)
        
        const camera = this.cameras.main;

        // random night settings and stuff that shouldn't be here if this was a normal fucking game engine
        var visibility = Phaser.Math.FloatBetween(0.75, 0.85);
        var randTint = Math.floor(Phaser.Math.Between(140, 200) * visibility)
        const colorToHex = (color) => {
            const hexadecimal = color.toString(16);
            return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
        }
        const RGBtoHex = (red, green, blue) => {
            return "0x" + colorToHex(red) + colorToHex(green) + colorToHex(blue);
        }
        var nightIntensity = RGBtoHex(randTint, randTint, randTint)
        console.log(nightIntensity)
        camera.postFX.addVignette(0.5, 0.5, visibility);
        layer1.setTint(nightIntensity, 0, 0, 256*100, 256*100)

        // minimap
        this.minimap = this.cameras.add(10, 10, 200, 200).setZoom(0.18).setName('mini')
        this.minimap.setBounds(0, 0, 100 * 256, 100 * 256)
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 200;
        this.minimap.scrollY = 200;
        
        this.Animator.onCreate()
        this.Player.onCreate(true)
        this.Controller.onCreate()

        this.healthBar = new HealthBar(this, 20, 20);


        var style = { font: "28px Arial", fill: "#ff0000", align: "right", stroke: "#000000"};
        var style2 = { font: "28px Arial", fill: "#ffffff", align: "left", stroke: "#000000"};

        this.killFeedText = this.add.text(1720, 400, '', style).setOrigin(0.5);
        this.killFeedText.depth = 150
        this.killFeedText.setScrollFactor(0)

        this.scoreBoardText = this.add.text(200, 400, '', style2).setOrigin(0.5);
        this.scoreBoardText.depth = 150
        this.scoreBoardText.setScrollFactor(0)

        NetStateManager.player = this.Player.player

        BulletManager = new BulletManagerClass(this)
    }

    update()
    {
        this.Player.onUpdate()
        this.Controller.onUpdate()
        BulletManager.update()
        
    }

}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.ENVELOP ,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);