
class BulletManagerClass
{
    constructor (_scene) {
        this.bullets = {}
        this.scene = _scene
    }

    create() {

    }

    newBullet(bullet) {
        let newBullet = this.scene.add.sprite(bullet.pos.x, bullet.pos.y, 'bullet')
        newBullet.setScale(BULLET_SCALE, BULLET_SCALE)
        newBullet.angle = bullet.angle
        newBullet.id = bullet.id
        newBullet.destroyed = false
        this.bullets[newBullet.id] = newBullet
    }

    addAndCheckBullets(currentBullets) {
        for(var i=0;i<Object.values(this.bullets).length;i++)
            Object.values(this.bullets)[i].destroyed = true

        for(var i=0;i<Object.values(currentBullets).length;i++)
        {
            let currentBullet = Object.values(currentBullets)[i]

            if(this.bullets[currentBullet.id] == undefined || this.bullets[currentBullet.id] == null)
            {
                this.newBullet(currentBullet)
            }
            else
            {
                this.bullets[currentBullet.id].destroyed = false
                this.bullets[currentBullet.id].x = currentBullet.pos.x
                this.bullets[currentBullet.id].y = currentBullet.pos.y
            }
        }
    }

    update() {
        let bulletsKeys = Object.keys(this.bullets)
        for(var i=0;i<bulletsKeys.length;i++)
        {
            let currentBullet = this.bullets[bulletsKeys[i]]
            
            if(currentBullet.destroyed)
            {
                currentBullet.destroy()
                delete this.bullets[bulletsKeys[i]]
            }
        }
    }

}



let BulletManager = null