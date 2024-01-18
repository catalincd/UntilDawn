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
            sprite.depth = 100
        })

        //cam
        this.cameras.main.setBounds(0, 0, 100 * 256, 100 * 256)
        this.physics.world.setBounds(0, 0, 100 * 256, 100 * 256)
        
        const camera = this.cameras.main;

        // initial "night" setting
        camera.postFX.addVignette(0.5, 0.5, 0.9);

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

        // static timeline for "night" so it works and looks good...
        const timeline = this.add.timeline([
            {at: 60000, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.9); layer1.setTint(0x999999, 0, 0, 256*100, 256*100); }},
            {at: 65000, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.85) }},
            {at: 70100, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.8) }},
            {at: 75100, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.75) }},
            {at: 80200, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.7) }},
            {at: 130000, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.6); layer1.setTint(0x666666, 0, 0, 256*100, 256*100);}},
            {at: 135000, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.55) }},
            {at: 140100, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.5) }},
            {at: 240000, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.4); layer1.setTint(0x444444, 0, 0, 256*100, 256*100);}},
            {at: 245000, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.33) }},
            {at: 250100, run: () => { camera.postFX.addVignette(0.5, 0.5, 0.3) }},
        ]);

        timeline.play();
        
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