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
        this.load.image('gravel', 'res/gravel.png');
        this.load.image('tree', 'res/tree.png');
        this.load.tilemapTiledJSON('asd', 'res/map.json');

        this.Player = new Player(this)
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
        })

        //cam
        this.cameras.main.setBounds(0, 0, 100 * 256, 100 * 256)
        this.physics.world.setBounds(0, 0, 100 * 256, 100 * 256)

        // minimap
        this.minimap = this.cameras.add(10, 10, 200, 200).setZoom(0.18).setName('mini')
        this.minimap.setBounds(0, 0, 100 * 256, 100 * 256)
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 200;
        this.minimap.scrollY = 200;
        
        this.Animator.onCreate()
        this.Player.onCreate(true)
        this.Controller.onCreate()
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