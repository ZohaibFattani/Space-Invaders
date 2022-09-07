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
        this.radius = 4
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
//creates shooting from invaders
class InvaderProjectile{
        constructor({position, velocity}){
 //moves across the screen, set dynamically
         this.position = position
 //projectiles moves
         this.velocity = velocity
//projectiles will be rectangular
         this.width = 3
         this.height = 10
        }
 //draws projectile
        draw(){
        context.fillStyle = 'white'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
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
//shooting for invaders
          shoot(invaderProjectiles){
//adds projectiles array
        invaderProjectiles.push(
        new InvaderProjectile({
//references current invaders middle bottom
        position: {
//gets middle
        x: this.position.x + this.width / 2,
//gets bottom
        y: this.position.y + this.height
        },
        velocity: {
        x: 0,
//goes up to down
        y: 5 
        }
        }))
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
//sets velocity to 0 every frame
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
let grids = []
//creates multiple invader projectiles
let invaderProjectiles = []
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
//spawning grids at intervals
        let frames = 0
//for new grids to spawn every 500-1000 frames
//wrapped in math.floor to make sure the variable is an integer
     let randomInterval = Math.floor((Math.random () * 500) + 500)
//animation loop to wait for the img src's to be loaded, then used
function animate(){
    requestAnimationFrame(animate)
    //changes canvas background
    context.fillStyle = 'black'
    context.fillRect(0,0,canvas.width, canvas.height)
    player.update()
//renders out invader projectiles
        invaderProjectiles.forEach((invaderProjectile, index) => {
//garbage collection
              if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
                setTimeout( () => {
                        invaderProjectiles.splice(index, 1)
                      }, 0) 
              } else
                invaderProjectile.update()
//hit detection when invader projectiles hits player
//bottom of projectile is >= top of player
              if(invaderProjectile.position.y + invaderProjectile.height >= 
                player.position.y &&
//right side of invader projectile >= left side of player
                invaderProjectile.position.x + invaderProjectile.width >= 
                player.position.x &&
//left side of invader projectile <= right side of player
        invaderProjectile.position.x <= player.position.x +
        player.width
                ){
                console.log('You Lose!')
              }
        })
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
        grids.forEach((grid) => {
        grid.update()
//spawn projectiles from random invaders
//shoot projectiles every 100th frame
    if (frames % 100 === 0 && grid.invaders.length > 0){
//grabs random invader from array
        grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
    }
        grid.invaders.forEach((invader, i) => {
        invader.update({velocity: grid.velocity})
//loop through each projectile shot
        projectiles.forEach((Projectile, j)=> {
//detects for collison, if top of projectile is less than the bootom of one of the invaders
                if(Projectile.position.y - Projectile.radius <= 
                invader.position.y + invader.height &&
//checks to see if right side of projectile is > the left side of the invader
                Projectile.position.x + Projectile.radius >=
                invader.position.x &&
//checks to see if left side of projectile is < the right side of the invader
                Projectile.position.x - Projectile.radius <=
                invader.position.x + invader.width &&
//only remove enemey if bottom of projectile is > bottom of invader
                Projectile.position.y + Projectile.radius>= 
                invader.position.y
                 ){
//removes the invader, and projectile if true
                setTimeout( () => {
//makes sure whatever is spliced is in the invaders array
                let invaderFound = grid.invaders.find(invader2 => 
//checks if invader being shot is in the array
                        invader2 === invader
                )
//makes sure whatever is spliced is in the projectiles array
                let projectileFound = projectiles.find(projectile2 => 
//checks if projectile being shot is in the array
                        projectile2 === Projectile
                        )
//once invader and projectile is i the array run the splice
                if(invaderFound && projectileFound){
                grid.invaders.splice(i, 1)
                 projectiles.splice(j, 1)

//takes in count of new width of grid when invaders are spliced
//if invaders are in the grid
               if(grid.invaders.length > 0){
//first invader in left hand column
                let firstInvader = grid.invaders[0]
//last invader in right hand column
                let lastInvader = grid.invaders[grid.invaders.length - 1]
//far right column - far left column to get new grid width
                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width
                grid.position.x = firstInvader.position.x
//if all invaders on grid have been removed, remove it so its not being animated for no reason
               }else{
                grids.splice(gridIndex, 1)
               }
                }
                }, 0)
                }
        })
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
// spawns new set of invaders for every 500 to 1000 frames
    if (frames % randomInterval === 0){
        grids.push(new Grid())
//spawns enemies at new intervals
        randomInterval = Math.floor((Math.random () * 500) + 500)
//makes sure frames is divisble 
        frames = 0
    }
//went through one loop of animation
        frames++
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