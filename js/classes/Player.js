class Player extends Sprite { //get access to sprite class
    constructor({position, collisionBlocks, imageSrc, frameRate}) {//make label
        super({imageSrc, frameRate})//calls sprite class
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }
        /*this.width = 100 / 4
        this.height = 100 / 4*/
        this.collisionBlocks = collisionBlocks
        

    }

    /*make player a simply red rectangle for practice
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.height, this.height)  
    }
    */
    update(){
        /*this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height  + this.velocity.y < canvas.height) 
        this.velocity.y += gravity
        else this.velocity.y = 0 */ //stops player at bottom of canvas
        this.updateFrames()
        this.updateHitbox()

        //draws out the image
        c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        //draw hitbox
        c.fillStyle = 'rgba(255, 0, 0, 0.2)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        
        this.draw()
        this.position.x += this.velocity.x
        this.updateHitbox()
        this.checkForHorizontalCollisions() //must use before applygravity 
        this.applyGravity()
        this.checkForVerticalCollisions()
    }

    updateHitbox(){
        this.hitbox = {
            position:{
                x: this.position.x + 35, //follows players location /35 moves hitbox to players location inside box
                y: this.position.y + 26 //already dictated by gravity
            },
            width: 15,
            height: 27
        }
    }

    applyGravity(){
        this.position.y += this.velocity.y
        this.velocity.y += gravity
    }
    checkForVerticalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            /*if(this.position.y + this.height >= collisionBlock.poistion.y && 
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x
                 )*/
                 if(collision({
                    object1: this.hitbox, //replaces object 1 in function //hit hitbox of player instead of entire box
                    object2: collisionBlock, //replaces object 2 in function
                 })) {
                    if(this.velocity.y > 0) {
                        this.velocity.y = 0

                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                        this.position.y = collisionBlock.position.y - offset - 0.01
                        break
                    }
                 
                  
                    if(this.velocity.y < 0) {
                        this.velocity.y = 0
                        this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                        break
                    }
                 }
                 
                 {
            }
        }
    }
    checkForHorizontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            /*if(this.position.y + this.height >= collisionBlock.poistion.y && 
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x
                 )*/
                 if(collision({
                    object1: this, //replaces object 1 in function
                    object2: collisionBlock, //replaces object 2 in function
                 })) {
                    if(this.velocity.x > 0) {
                        this.velocity.x = 0
                        this.position.x = collisionBlock.position.x - this.width - 0.01
                        break
                    }
                 

                  
                    if(this.velocity.x < 0) {
                        this.velocity.x = 0
                        this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                        break
                    }
                 }
                 
                 {
            }
        }
    }
}