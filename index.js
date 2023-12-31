const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//2:27:00
canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36 ){
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}


const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
       if(symbol === 202){
        collisionBlocks.push(new CollisionBlock({
            position: {
                x: x * 16,
                y: y * 16,
            }
        }))
       }
    })
})




const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36 ){
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
       if(symbol === 202){
        platformCollisionBlocks.push(new CollisionBlock({
            position: {
                x: x * 16,
                y: y * 16,
            }
        }))
       }
    })
})


//console.log(platformCollisions2D)


const gravity = 0.5


const player = new Player({
    position: {
        x: 100,
        y:0,
    },
    collisionBlocks: collisionBlocks, //shorthand: collisionsBlocks, 
    imageSrc: './img/warrior/idle.png',
    frameRate: 8 //how many frames in idle.png
})
/*const player2 = new Player({
    x: 300, 
    y:100})
*/

const keys = {
    d:{
        pressed: false,
    },
    a:{
        pressed: false,
    },
  
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png'
})


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    c.save()
    c.scale(4, 4)// scales up background image but will run over and over again
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()//use before player so it renders first?
    collisionBlocks.forEach(CollisionBlock => { //adds collision blocks to scaled background
        CollisionBlock.update()
    })
    platformCollisionBlocks.forEach(block => { //adds collision blocks to scaled background
        block.update()
    })
    player.update()
    player.velocity.x = 0
    if(keys.d.pressed) player.velocity.x = 4
    else if (keys.a.pressed) player.velocity.x = -4

    c.restore()

  

    
    //player2.update()

   
}

animate()

window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'd':
        keys.d.pressed = true
        break
        case 'a':
        keys.a.pressed = true
        break
        case 'w':
        player.velocity.y = -10
        break
      
    }
})
window.addEventListener('keyup', (e) =>{
    switch(e.key){
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
        
    }
})


    
    //console.log(floorCollisions)