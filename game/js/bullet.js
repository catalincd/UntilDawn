BULLET_SPEED_FACTOR = 15

class BulletManager 
{
    constructor (_scene) {
        this.bullets = []
        this.scene = _scene
    }

    create() {

    }

    update() {
        for(var i=0;i<this.bullets.length;i++)
        {
            // is bullet out of map?
            // in the end, when going multiplayer, bullet is server side so only the server will calculate this
            if(!(this.scene.cameras.main.worldView.contains(this.bullets[i].x, this.bullets[i].y)))
            {
                this.bullets[i].destroy()
                this.bullets.splice(i, 1);

                i--
                continue
            }

            const frontAngle = Phaser.Math.DegToRad(this.bullets[i].angle)
            const deltaX = Math.cos(frontAngle) * BULLET_SPEED_FACTOR
            const deltaY = Math.sin(frontAngle) * BULLET_SPEED_FACTOR

            this.bullets[i].x += deltaX
            this.bullets[i].y += deltaY
        }
    }

}



