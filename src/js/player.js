// import { canvas, ctx, gravity } from "./game.js";
// // create a player
// export default class Player {
//     constructor() {
//        this.speed = 5;
//        this.position = {
//           x: 230,
//           y: 100
//        }
//        this.velocity = {
//           x: 0,
//           y: 0
//        }
//        this.width = 30;
//        this.height = 30;
//     }
    
//     // the draw function or method to layout my player
//     draw() {
//        ctx.fillStyle = "#6807F9";
//        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//     }
 
//     update() {
//        this.draw();
//        this.position.x += this.velocity.x;
//        this.position.y += this.velocity.y;
 
//        // only add a velocity if the below condition exist
//        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
//           this.velocity.y += gravity;
//        }
//        else {
//           this.velocity.y = 0;
//        }
//     }
//  }