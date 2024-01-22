const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

const gravity = 0.375;

canvas.width = 1024;
canvas.height = 576;

const platformImg = new Image();
platformImg.src = './img/platform.png';

const hillsImg = new Image();
hillsImg.src = './img/hills.png';

const backgroungImg = new Image();
backgroungImg.src = './img/background.png' 

const platformSmallTallImg = new Image();
platformSmallTallImg.src = './img/platformSmallTall.png'

const spriteRunLeft = new Image();
spriteRunLeft.src = './img/spriteRunLeft.png'

const spriteRunRight = new Image();
spriteRunRight.src = './img/spriteRunRight.png'

const spriteStandLeft = new Image();
spriteStandLeft.src = './img/spriteStandLeft.png'

const spriteStandRight = new Image();
spriteStandRight.src = './img/spriteStandRight.png'

class Player{

    constructor(){

        this.speed = 5;

        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.sprites = {
            stand: {

                right: this.spriteStandRightImage = spriteStandRight,
                left: this.spritesStandLeftImage = spriteStandLeft,
                CropWith: 177,
                width: 66

            },

            run: {

                right: this.spriteRunRightImage = spriteRunRight,
                left: this.spritesRunLeftImage = spriteRunLeft,
                CropWith: 341,
                width: 127.875

            }    
        }

        this.width = 66;
        this.height = 150;

        this.CurrentSprite = this.sprites.stand.right;
        this.CurrentCropWith = 177;
        this.frames = 0;

    }

    draw() {
        c.drawImage(
            this.CurrentSprite, 
            this.CurrentCropWith * this.frames,
            0,
            177,
            400,
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        );
    }

    update(){
        this.frames++;

        if(this.frames > 28) this.frames = 0

        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }
    }
}

class Platform{

    constructor({ platformImg, x, y }){

        this.position = {
            x,
            y
        }

        this.platformImg = platformImg
        this.width = platformImg.width
        this.height = platformImg.height

    }

    draw(){
        c.drawImage(this.platformImg, this.position.x, this.position.y);
    }

}

class PlatformSmallTall{

    constructor({ platformSmallTallImg, x, y }){

        this.position = {
            x,
            y
        }

        this.platformSmallTallImg = platformSmallTallImg
        this.width = platformSmallTallImg.width
        this.height = 144

    }

    draw(){
        c.drawImage(this.platformSmallTallImg, this.position.x, this.position.y);
    }

}

class GenericObject{

    constructor({ backgroungImg, x, y }){

        this.position = {
            x,
            y
        }

        this.backgroungImg = backgroungImg
        this.width = backgroungImg.width
        this.height = 20

    }

    draw(){
        c.drawImage(this.backgroungImg, this.position.x, this.position.y);
    }

}

class Hills{

    constructor({ hillsImg, x, y }){

        this.position = {
            x,
            y
        }

        this.hillsImg = hillsImg
        this.width = hillsImg.width
        this.height = 20

    }

    draw(){
        c.drawImage(this.hillsImg, this.position.x, this.position.y);
    }

}

let scrollOffset = 0;

function init(){

    scrollOffset = 0;

    onPlat = false;

    player = new Player();

    genereticObjects = [new GenericObject({backgroungImg, x: -1, y: -1})]

    hills = [new Hills({hillsImg, x: -1, y: -1})]

    platformSmallTalls = [new PlatformSmallTall({ platformSmallTallImg, x: platformImg.width * 3 + 100 - platformSmallTallImg.width, y: 250}),
                          new PlatformSmallTall({ platformSmallTallImg, x: platformImg.width * 6 - 50 - platformSmallTallImg.width, y: 130}),
                          new PlatformSmallTall({ platformSmallTallImg, x: platformImg.width * 6 - 50 - platformSmallTallImg.width, y: 280}),
                          new PlatformSmallTall({ platformSmallTallImg, x: platformImg.width * 6 - 337 - platformSmallTallImg.width, y: 280})     
                         ];

    platforms = [new Platform({ platformImg, x: 0, y: 452 }), 
                 new Platform({ platformImg, x: 578, y: 452 }),
                 new Platform({ platformImg, x: platformImg.width * 2 + 100, y: 452}),
                 new Platform({ platformImg, x: platformImg.width * 3 + 530, y: 452}),
                 new Platform({ platformImg, x: platformImg.width * 4 + 528, y: 452}),
                 new Platform({ platformImg, x: platformImg.width * 6 + 500, y: 452})
                ];

}


let onPlat = false;

let player = new Player();

let genereticObjects = [new GenericObject({backgroungImg, x: -1, y: -1})]

let hills = [new Hills({hillsImg, x: -1, y: -1})]

let platformSmallTalls = [new PlatformSmallTall({ platformSmallTallImg, x: platformImg.width * 3 + 100 - platformSmallTallImg.width, y: 250}),
                          new PlatformSmallTall({ platformSmallTallImg, x: platformImg.width * 6 - 50 - platformSmallTallImg.width, y: 130}),
                          new PlatformSmallTall({ platformSmallTallImg, x: platformImg.width * 6 - 50 - platformSmallTallImg.width, y: 280}),
                          new PlatformSmallTall({ platformSmallTallImg, x: platformImg.width * 6 - 337 - platformSmallTallImg.width, y: 280})     
];

let platforms = [new Platform({ platformImg, x: 0, y: 452 }), 
                 new Platform({ platformImg, x: 578, y: 452 }),
                 new Platform({ platformImg, x: platformImg.width * 2 + 100, y: 452}),
                 new Platform({ platformImg, x: platformImg.width * 3 + 530, y: 452}),
                 new Platform({ platformImg, x: platformImg.width * 4 + 528, y: 452}),
                 new Platform({ platformImg, x: platformImg.width * 6 + 500, y: 452})
                ];

const keys = {

    right: {
        pressed: false
    },
    left: {
        pressed: false
    },

}



animate();

function animate(){

    requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    genereticObjects.forEach(genereticObjects => {
        genereticObjects.draw();
    })

    hills.forEach(hills => {
        hills.draw();
    })

    platformSmallTalls.forEach(platformSmallTalls => {
        platformSmallTalls.draw();
    })

    platforms.forEach(platforms => {
        platforms.draw();
    });
    player.update();
    
    //lose condition
    if(player.position.y > canvas.height){
        console.log("you dead!")
        init();
    }

    if(scrollOffset >= 3800){
        console.log("you win!")
    }

    //platform collision detection
    platforms.forEach(platform => {
        if(player.position.y + platform.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x 
            && player.position.x <= platform.position.x + platform.width){
     
            player.velocity.y = 0 
            onPlat = true
        }
        else{
            onPlat = false
        }
    });
    

    platformSmallTalls.forEach(platformSmallTalls => {
        if(player.position.y + platformSmallTalls.height <= platformSmallTalls.position.y 
            && player.position.y + player.height + player.velocity.y >= platformSmallTalls.position.y
            && player.position.x + player.width >= platformSmallTalls.position.x 
            && player.position.x <= platformSmallTalls.position.x + platformSmallTalls.width){
     
            player.velocity.y = 0 
            onPlat = true

        }
        else{
            onPlat = false
        }
    });

    //player move detection

    if ( keys.right.pressed && player.position.x < 400 ){
        player.velocity.x = player.speed;
    }
    else if( keys.left.pressed && player.position.x > 100 || keys.left.pressed && scrollOffset === 0 && player.position.x > 0){
        player.velocity.x = -player.speed;
    }
    else {
        player.velocity.x = 0;

        if(keys.right.pressed){
            console.log(scrollOffset);
            scrollOffset += player.speed;

            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            });        
            
            genereticObjects.forEach(genereticObjects => {
                genereticObjects.position.x -= player.speed * 0.66;
            })

            hills.forEach(hills => {
                hills.position.x -= player.speed * 0.66;
            })

            platformSmallTalls.forEach(platformSmallTalls => {
                platformSmallTalls.position.x -= player.speed;
            })

        }

        else if(keys.left.pressed && scrollOffset > 0){

            scrollOffset -= player.speed;

            platforms.forEach(platform => {
                platform.position.x += player.speed;
            });        
            
            genereticObjects.forEach(genereticObjects => {
                genereticObjects.position.x += player.speed * 0.66;
            })

            hills.forEach(hills => {
                hills.position.x += player.speed * 0.66;
            })

            platformSmallTalls.forEach(platformSmallTalls => {
                platformSmallTalls.position.x += player.speed;
            })

        }
    }
}

addEventListener('keydown', ({ keyCode }) => {
    
    switch(keyCode){
        
        case 65:
            keys.left.pressed = true;
            player.CurrentSprite = player.sprites.run.left;
            player.CurrentCropWith = player.sprites.run.CropWith;
            player.width = player.sprites.run.width;
            break

        case 68:
            keys.right.pressed = true;
            player.CurrentSprite = player.sprites.run.right;
            player.CurrentCropWith = player.sprites.run.CropWith;
            player.width = player.sprites.run.width;
            break

        case 83:

            if (onPlat == true){
                player.velocity.y += 20;
            }
           
            break

        case 32:
            player.velocity.y -= 14;
            break

    }
})

addEventListener('keyup', ({ keyCode }) => {
    
    switch(keyCode){

        case 65:
            keys.left.pressed = false;
            player.CurrentSprite = player.sprites.stand.left;
            player.CurrentCropWith = player.sprites.stand.CropWith;
            player.width = player.sprites.stand.width;
            break

        case 68:
            keys.right.pressed = false;
            player.CurrentSprite = player.sprites.stand.right;
            player.CurrentCropWith = player.sprites.stand.CropWith;
            player.width = player.sprites.stand.width;
            break

    }
})