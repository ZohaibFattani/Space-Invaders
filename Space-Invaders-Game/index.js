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
//creates shooting from player
class Projectile{
       constructor({position, velocity}){
//moves across the screen, set dynamically
        this.position = position
//projectiles moves
        this.velocity = velocity

//projectiles will be circular
        this.radius = 3
       }
//draws projectile
       draw(){
        context.beginPath()
//method that creates circle
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = 'red'
        context.fill()
        context.closePath()
       }
//moves projectile
       update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
       }
}
//creates an invader, 
class Invader {
        constructor({position}) {
    //moves around the screen
            this.velocity = {
                x: 0,
                y: 0
            }
    //creates html image, image object come from javascript api
            let image = new Image()
    //declare image to use
            image.src ='./assets/invader.png'
    //waits for image to load
            image.onload = () => {
    //scale for img            
            let scale = 1
    //image for invader
            this.image = image
    //width and height for inavder, set to default image width and height, then multiply by #, but maintains aspect ratio
            this.width = image.width * scale
            this.height= image.height * scale
            //position of the inavder
            this.position = {
     //sets invader to width, and divides so thats its at the middle, x-axsis starts on left side of image, so subtracting it 
             x: position.x,
             y: position.y
            }
            }
        }
    //function for drawing invader
            draw() {
    //draws image
             context.drawImage(
                this.image, 
                this.position.x, 
                this.position.y, 
                this.width, 
                this.height
                )
            }
    //to effect velocity of invader
            update({velocity}){
            if(this.image){
    //draws image
              this.draw()
    //positions image
            this.position.x += velocity.x
            this.position.y += velocity.y
            }
            }
        }
//creates grid of invaders
        class Grid{
        constructor(){
        this.position = {
         x: 0,
         y: 0
         }
        this.velocity = {
        x: 3,
        y: 0
        }
//each grid has an array of invaders
        this.invaders = []
//limits amount of columns 2-12
let columns = Math.floor(Math.random() * 10 + 2)
//limits amount of rows 2-7
        let rows = Math.floor(Math.random() * 5 + 2)
//declares width property for grid
        this.width = columns * 30
//creates multiple columns of invaders
        for(let x = 0; x < columns; x++){
//creates multiple rows of invaders
        for(let y = 0; y < rows; y++){
//creates 10 invaders
                this.invaders.push(new Invader({
                        position: {
// x, and y * width, and height of the invader img
                        x: x * 30,
                        y: y * 30
                }}))
        }
        }
}
        update(){
//move inavder grid side to side
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
                this.velocity.y = 0
//make boundareis for grid
                if(this.position.x + this.width >= canvas.width || this.position.x <= 0){
                        this.velocity.x = -this.velocity.x
//push grid down everytime it bounces of canvas
                        this.velocity.y = 30
                }
        }
        }
//creates player
let player =  new Player()
//creates multiple projectiles
let projectiles = [
//spawn projectiles whenever spacebar is clicked
]
//stores grids
let grids = [new Grid()]
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
//renders projectiles onto screen
        projectiles.forEach((Projectile, index)  => {
//removes projectiles once off of screen
           if (Projectile.position.y + Projectile.radius <= 0){
//for when projectiles flash
              setTimeout( () => {
                projectiles.splice(index, 1)
              }, 0) 
           }else{
                Projectile.update()
           }     
        })
//selects grid, and calls grid.update()
        grids.forEach(grid => {
                grid.update()
                grid.invaders.forEach(invader => {
                        invader.update({velocity: grid.velocity})
                })
        })
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
//pushing projectiles into array
        projectiles.push(new Projectile({
                position: {
//spawns projectiles from player
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                },
                velocity: {
                        x: 0,
                        y: -10
                }
        }))
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