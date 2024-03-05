import Enemy from './enemy.js';
import Platform from './platform.js';
import Player from './player.js';

// get the canvas from the DOM
export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

let scoreUpdate = document.getElementById('result');
const startGameBtn = document.querySelector('#startGame-btn');
const gameOverEl = document.querySelector('#score-update');
const modalEl = document.querySelector('#modalEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

// DECLARE GRAVITY FOR WHEN THE PLAYER JUMPS
export const gravity = 1.5;

console.log(canvas.width)


/*=============================================
   
==============================================*/

// implement the player class
let player = new Player();
// set the bullets to an array constant to loop through all of them
// instead of just one
let lasers = [];
let enemies = [];
// DRAW OUT NEW PLATFORMS MANUALLY TO THEIR RESPECTIVE LOCATIONS
let platforms = [new Platform({x: 1080, y: 350}),
   new Platform({x: 390, y: 120}),
   new Platform({x: 100, y: 160}),
   new Platform({x: 30, y: 90}),
   new Platform({x: 1000, y: 400}),
   new Platform({x: 900, y: 300}),
   new Platform({x: 1150, y: 200}),
   new Platform({x: 600, y: 100}),
   new Platform({x: 980, y: 500}),
   new Platform({x: 780, y: 460}),
   new Platform({x: 890, y: 520}),
   new Platform({x: 400, y: 340}),
   new Platform({x: 1200, y: 500}),
   new Platform({x: 620, y: 300}),
   new Platform({x: 80, y: 400}),
   new Platform({x: 150, y: 300}),
   new Platform({x: 250, y: 476}),
   new Platform({x: 1000, y: 200}),
   new Platform({x: 990, y: 250}),
   new Platform({x: 850, y: 500}),
];


// add an init fuunction tp restart the game whenever
function init() {
   player = new Player();
   // set the bullets to an array constant to loop through all of them
   // instead of just one
   lasers = [];
   enemies = [];
   // DRAW OUT NEW PLATFORMS MANUALLY TO THEIR RESPECTIVE LOCATIONS
   platforms = [new Platform({x: 1080, y: 350}),
      new Platform({x: 390, y: 120}),
      new Platform({x: 100, y: 160}),
      new Platform({x: 30, y: 90}),
      new Platform({x: 1000, y: 400}),
      new Platform({x: 900, y: 300}),
      new Platform({x: 1150, y: 200}),
      new Platform({x: 600, y: 100}),
      new Platform({x: 980, y: 500}),
      new Platform({x: 780, y: 460}),
      new Platform({x: 890, y: 520}),
      new Platform({x: 400, y: 340}),
      new Platform({x: 1200, y: 500}),
      new Platform({x: 620, y: 300}),
      new Platform({x: 80, y: 400}),
      new Platform({x: 150, y: 300}),
      new Platform({x: 250, y: 476}),
      new Platform({x: 1000, y: 200}),
      new Platform({x: 990, y: 250}),
      new Platform({x: 850, y: 500}),
   ]

   score = 0

   scoreUpdate.innerHTML = score
   gameOverEl.innerHTML = score
}

// FUNCTION TO SPAWN ENEMIES OT THE CANVAS, FROM POSITION {X AND Y}
function spawnEnemies() {
   setInterval(() => {
      const radius = 25;
      let x;
      let y;
      
      if (Math.random() < 0.5) {
         x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
         y = Math.random() * canvas.height;
      } else {
         x = Math.random() * canvas.width
         y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      }
      
      const color = `hsl(${Math.random() * 360}, 50%, 50%)`
      // '#45EBA5';

      const angle = Math.atan2((canvas.height + player.position.y + player.height) / 2 - y,
      (canvas.width + player.position.x + player.width) / 2 - x
      )

      const velocity = {
         x: Math.cos(angle),
         y: Math.sin(angle)
      }

      enemies.push(new Enemy(x, y, radius, color, velocity))
   }, 1000);

   console.log(enemies)
}

// if these conditionns are correct prior to the keycode entered then..
const keys = {
   // the right is the only one we choose since our player will only be moving
   // to the right awy from the left
   right: {
      pressed: false
   },
   left: {
      pressed: false
   }
}

let animationId
let score = 0

function animate() {
   animationId = requestAnimationFrame(animate)
   ctx.fillStyle = "rgba(1, 2, 6, 0.1)";
   ctx.fillRect(0, 0, canvas.width, canvas.height)
   player.draw()

   platforms.forEach(platform => {
      platform.draw();
   })

   player.update();

   lasers.forEach((laser, index) => {
      laser.update();

      // remove lasers from screen when shot out
      if (laser.x + laser.radius < 0 || laser.x - laser.radius > canvas.width ||
         laser.y - laser.radius < 0 || laser.y - laser.radius > canvas.height) {
         setTimeout(() => {
            lasers.splice(index, 1)
         }, 0);
      }
   })
   
   // call the enemies
   enemies.forEach((enemy, index) => {
      enemy.update();

      const dist = Math.hypot(player.position.x - enemy.x, player.position.y - enemy.y)

      if (dist - enemy.radius - ((player.width / 2) + (player.height / 2)) < 1){
         cancelAnimationFrame(animationId)
         modalEl.style.display = 'flex'
         gameOverEl.innerHTML = score
      }

      lasers.forEach((laser, laserIndex) => {
         const dist = Math.hypot(laser.x - enemy.x, laser.y - enemy.y)

      // detect collision between enemies and the bullets and remove both
      // from screen / canvas
         if (dist - enemy.radius - laser.radius < 1) {
            // update the score
            score += 25
            scoreUpdate.innerHTML = score;

            setTimeout(() => {
               enemies.splice(index, 1);
               lasers.splice(laserIndex, 1)
            }, 0);
         }
      });
   })


   if(keys.right.pressed ) {
      player.velocity.x = player.speed
   } else if (keys.left.pressed){
      player.velocity.x - player.speed
   }
   else {
      player.velocity.x = 0
   }
   /*===================================================================
   PLATFORM AND PLAYER COLLISION DETECTION
      have the player jump and be able to land on top of the platforms
      and jump from one to the other with ease
   ====================================================================*/
   // use rectangular collision detection with chrisCourses.
   platforms.forEach(platform => {
      if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x && 
      player.position.x <= platform.position.x + platform.width)
      {
         player.velocity.y = 0;
      };
   });
   

}

// HAVE THE BULLETS DISCHARGE WHENEVER SCREEN CLICK
addEventListener('click', (event) => {
   // console.log(lasers)
   const angle = Math.atan2(event.clientY - player.position.y + player.height / 2,
    event.x - player.position.x + player.width / 2
   )

   const velocity = {
      x: Math.cos(angle) * 6,
      y: Math.sin(angle) * 6
   }
   lasers.push(new Laser(
      player.position.x + player.width / 2, player.position.y
      + player.height / 2, 6, '#E00E1A', velocity
   ));
});

startGameBtn.addEventListener('click', () => {
   init()
   animate()
   spawnEnemies()
   modalEl.style.display = 'none'
})

// ADD EVENT LISTNERS FOR THE MOVEMENT OF THE PLAYER
addEventListener('keydown', ({keyCode}) => {
   switch (keyCode) {
      // move player to the left
      case 65:
         keys.left.pressed = true;
         player.velocity.x = -5
         break;
      case 87:
         // with the key A the player has to jumps
         player.velocity.y -= 30;
         break;
      case 68:
         // with the key D the player has to run
         keys.right.pressed = true;
         player.velocity.x = player.speed;
         break;
   }
})

addEventListener('keyup', ({keyCode}) => {
   switch (keyCode) {
      // move player to the left
      case 65:
         keys.left.pressed = false
         break;
      case 87:
         // with the key A the player has to jumps
      player.velocity.y = 0;
         break;

      case 68:
         // with the key D the player has to run
         keys.right.pressed = false
         break;
   }
})





/* let platforms;

function init() {
   platforms = [];

   for (let i = 0; i < 7; i++) {
      let x =  Math.floor(Math.random() * canvas.width);
      let y =  Math.floor(Math.random() * canvas.height);
      const width = 100;
      const height = 20;
      const color = 'brown';

      // make sure platforms are not spawn on top of each other
      if (i !== 0) {
         for (let j = 0; j < platforms.length; j++){
            if (distance(x, y, platforms[j].x, platforms[j].y) - width * 2 < 0)
            {
               x =  Math.floor(Math.random() * canvas.width);
               y =  Math.floor(Math.random() * canvas.height);

               j = -1;
            }
         }
      }

      platforms.push(new Platform(x, y, width, height, color))
   }
   console.log(platforms)
} */