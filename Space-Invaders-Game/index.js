//selects canvas
let canvas = document.querySelector('canvas')
//references canvas content
const context = canvas.getContext('2d')
//set canvas width and height
canvas.width = innerWidth
canvas.height = innerHeight

//creates a player, 
class Player{
    constructor() {
//moves around the screen
        this.velocity = {
            x: 0,
            y: 0
        }
//add property for rotation
        this.rotation = 0
//creates html image, image object come from javascript api
        let image = new Image()
//declare image to use
        image.src ='./assets/spaceship.png'
//waits for image to load
        image.onload = () => {
//scale for img            
        let scale = 0.15
//image for player
        this.image = image
//width and height for player, set to default image width and height, then multiply by #, but maintains aspect ratio
        this.width = image.width * scale
        this.height= image.height * scale
        //position of the player
        this.position = {
 //sets player to width, and divides so thats its at the middle, x-axsis starts on left side of image, so subtracting it 
         x: canvas.width / 2 - this.width / 2,
         y: canvas.height - this.height - 20
        }
        }
    }
//function for drawing player
        draw() {
        //  context.fillStyle = 'red'
        //  context.fillRect(this.position.x, this.position.y, this.width, this.height)
        
//gets snapshot of canvas
        context.save()
//rotates player section of the canvas
        context.translate(
        player.position.x + player.width / 2, 
        player.position.y + player.height / 2 
        )
        context.rotate(this.rotation)
//moves canvas back to original spot
        context.translate(
        -player.position.x - player.width / 2, 
        -player.position.y - player.height / 2 
        )
//draws image
         context.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )
            context.restore()
        }

//to effect velocity of player
        update(){
        if(this.image){
//draws image
          this.draw()
//positions image
        this.position.x += this.velocity.x
        }
        }
    }
//creates player
let player =  new Player()
//creates keys to stop
let keys = {
a: {
pressed: false
},
d: {
pressed: false
},
space: {
pressed: false
},
}

//animation loop to wait for the img src's to be loaded, then used
function animate(){
    requestAnimationFrame(animate)
    //changes canvas background
    context.fillStyle = 'black'
    context.fillRect(0,0,canvas.width, canvas.height)
    player.update()
//moves player to the left & sets boundary
    if(keys.a.pressed && player.position.x >= 0){
        player.velocity.x = -7
//rotates player when going left
        player.rotation = -0.15
//moves player to the right & sets boundary
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width){
        player.velocity.x = 7
//rotates player when going right
        player.rotation = 0.15
 }else{
//stops moving player
        player.velocity.x = 0
//when nothing is pressed
        player.rotation = 0
    }
}
animate()
//gets what key is being pressed
addEventListener('keydown', ({key}) => {
        switch(key){
        case 'a':                
        console.log('left')
        keys.a.pressed = true
         break
         case 'd':                
        console.log('right')
        keys.d.pressed = true
         break
         case ' ':                
        console.log('space')
         break
        }
})
//gets when key is not being pressed
//gets what key is being pressed
addEventListener('keyup', ({key}) => {
        switch(key){
        case 'a':                
        console.log('left')
        keys.a.pressed = false
         break
         case 'd':                
        console.log('right')
        keys.d.pressed = false
         break
         case ' ':                
        console.log('space')
         break
        }
})