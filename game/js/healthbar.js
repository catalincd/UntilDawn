class HealthBar {

    constructor (scene, x, y)
    {

        this.outline = scene.add.sprite(960, 100, 'pixel');
        this.background = scene.add.sprite(960, 100, 'pixel');
        this.bar = scene.add.sprite(960, 100, 'pixel');

        var style = { font: "24px Arial", fill: "#000000", align: "center"};
        this.hpText = scene.add.text(960, 100, '100', style).setOrigin(0.5);
        this.hpText.setText('100')

        this.outline.tint = 0x000000
        this.background.tint = 0xeeeeee
        this.bar.tint = 0x00ff77

        this.outline.setScale(40, 4);
        this.background.setScale(39, 3.09);
        this.bar.setScale(39,3.09);

        this.outline.setScrollFactor(0)
        this.background.setScrollFactor(0)
        this.bar.setScrollFactor(0)
        this.hpText.setScrollFactor(0)

        this.outline.depth = 120
        this.background.depth = 120
        this.bar.depth = 120
        this.hpText.depth = 121
    }

    set (amount)
    {
        this.hpText.setText(amount)
        this.bar.setScale(39 * (amount / 100.0),3.09);
        this.bar.x = 960 - 195 + (195 * (amount / 100.0))
    }

    draw ()
    {
        // Phaser.Display.Align.In.Center(outline, this.add.zone(0, 0, 1920, 1080));
        // Phaser.Display.Align.In.Center(background, outline);
        // Phaser.Display.Align.In.LeftCenter(bar, background);
    }

}