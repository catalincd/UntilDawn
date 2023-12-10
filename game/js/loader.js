const onPreloadLoader = () => {
    this.load.multiatlas('player_rifle', 'res/player/player_rifle.json', 'res/player');
    this.load.multiatlas('player_feet', 'res/player/player_feet.json', 'res/player');
    this.load.image('bullet', 'res/bullet.png');
    this.load.image('gravel', 'res/gravel.png');
    this.load.tilemapTiledJSON('asd', 'res/map.json');
}

const onCreateLoader = () => {
    
}

const onUpdateLoader = () => {
    
}

const loader = {onPreload: onPreloadLoader, onCreate: onCreateLoader, onUpdate: onUpdateLoader}