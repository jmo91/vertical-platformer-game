class Sprite {
    constructor({position, imageSrc, frameRate = 1, frameBuffer = 3}) {
        this.position = position
        this.image = new Image()
        this.image.onload = () => { //get width and height of player to send to player.js
            this.width = this.image.width /this.frameRate
            this.height = this.image.height
        }
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.currentFrame = 0
        this.frameBuffer = frameBuffer//slows down speed of player animation
        this.elapsedFrames = 0 //how many frames have elapsed since creation of sprite
    }

    draw() {
        if (!this.image) return //only if image exist and is loaded
       
       const cropbox = {
        position: {
            x: this.currentFrame * (this.image.width/ this.frameRate),
            y: 0,
        },
        width: this.image.width / this.frameRate,
        height: this.image.height,
       }

        c.drawImage(this.image, 
            cropbox.position.x, 
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x, 
            this.position.y,
            this.width,
            this.height
            )

    }
    update(){
        this.draw()
        this.updateFrames()
    }

    updateFrames() {
        this.elapsedFrames++
        
        if(this.elapsedFrames % this.frameBuffer === 0) { 
        if(this.currentFrame < this.frameRate - 1) this.currentFrame++ //make png start from begging after being looped through
        else this.currentFrame = 0
     }
    }
    
}

