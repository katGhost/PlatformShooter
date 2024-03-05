import { ctx } from "./game.js";
/*
    PLATFORMS 
*/
export default class Platform {
    constructor({x, y}) {
       this.position = {
          x,
          y
       }
 
       this.width = 150;
       this.height = 20;
    }
 
    draw() {
       ctx.fillStyle = '#556677'
       ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
 }

