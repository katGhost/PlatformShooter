**Platform Shooter**

**Description:**
This project is a simple platform shooter game built using HTML, CSS, and JavaScript. Players control a character that can move horizontally, jump, and shoot enemies while navigating through various platforms (platfroms are static - no movement).

**Features:**
- Smooth player movement and jumping mechanics.
- Ability to shoot enemies with lasers.
- Enemies spawn randomly and move across the screen.
- Collision detection between player, bullets, and enemies.
- Score tracking system.

**Installation:**
1. Clone the repository to your local machine using the following command:
   ```
   git clone https://github.com/username/platformshooter.git
   ```
   --my username--
2. Navigate to the project directory.
3. Open the `index.html` file in your preferred web browser.

**How to Play:**
- Use the left and right arrow keys to move the player character.
- Press the spacebar to jump.
- Click anywhere on the screen to shoot lasers at enemies.
- Avoid touching enemies, as it will result in game over.
- Collect points by shooting enemies.

**Development:**
This project is developed using HTML5 Canvas and JavaScript. The game features object-oriented programming principles, including classes for the player, enemies, and platforms. Physics mechanics such as gravity for player jumping and collision detection are implemented to provide a realistic gaming experience.

**Code Sample:**
Below is a snippet of the code demonstrating the creation of the Player class:

```javascript
// player.js
import { ctx, gravity, canvas } from "./game.js";

export default class Player {
    constructor() {
       this.speed = 5;
       this.position = {
          x: 230,
          y: 100
       }
       this.velocity = {
          x: 0,
          y: 0
       }
       this.width = 30;
       this.height = 30;
    }
    
    draw() {
       ctx.fillStyle = "#6807F9";
       ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
 
    update() {
       this.draw();
       this.position.x += this.velocity.x;
       this.position.y += this.velocity.y;
 
       if (this.position.y + this.height + this.velocity.y <= canvas.height) {
          this.velocity.y += gravity;
       }
       else {
          this.velocity.y = 0;
       }
    }
 }
```
Used import above to access the context (ctx), gravity (world) and canvas.

**Contributing:**
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

**NOTE**
This project is still in works, it is a bit old project that I decided to revive.
Forgot _Laser_ class.

**License:**
This project is licensed under the MIT License. See the `LICENSE` file for more details.

**Author:**
Andries N Mogashoa - https://github.com/katGhost/

**Acknowledgements:**
- This project was inspired by Chris, check out https://www.chriscourses.com and @youtube: https://www.youtube.com/@ChrisCourses.

---

Feel free to customize this README to fit your project's specific details and requirements. Make sure to replace placeholders such as `[Your Name]`, `[Your Email]`, and `[Your GitHub Profile]` with your actual information.
