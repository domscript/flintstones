import { Game } from "./game";
import { JumpingEnemy } from "./enemies";

abstract class Fire {
  abstract image: HTMLImageElement;
  width: number = 0;
  height: number = 0;
  frameX = 0;
  frameY = 0;
  maxFrame: number = 0;
  fps = 2;
  frameInterval = 1000 / this.fps;
  x = 0;
  y = 0;
  speed: number = 4;
  speedX: number = 0;
  speedY: number = 0;
  collisionRadius = 0;
  markedForDeletion = false;
  coef = 25;

  constructor(public game: Game, public dragon: JumpingEnemy) {
    this.x = this.dragon.x;
    if (this.dragon.y < this.game.height * 0.45) {
      this.speedX = 0;
      this.speedY = 2;
      this.x = this.dragon.x;
      this.y = this.dragon.y;
    } else {
      this.x = this.dragon.x;
      this.y = this.dragon.y + this.coef;
      if (this.x > this.game.width / 2) {
        this.speedX = -this.speed;
        this.x = this.dragon.x - this.dragon.collisionRadius;
      } else if (this.x < this.game.width / 2) {
        this.speedX = this.speed;
        this.x = this.dragon.x + this.dragon.collisionRadius;
      }
    }
  }

  update() {
    // movement
    this.x += this.speedX - this.game.speed;
    this.y += this.speedY;
    // check if off screen
    if (
      this.x + this.width < 0 ||
      this.x + this.width > this.game.width ||
      this.y > this.game.height
    ) {
      this.markedForDeletion = true;
    }
  }
  draw(context: CanvasRenderingContext2D) {
    context.save();
    if (this.speedX > 0 || this.speedY > 0) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    } else {
      context.translate(this.width, 0);
      context.scale(-1, 1);
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        -this.x + this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    }
    context.restore();

    if (this.game.debug) {
      context.beginPath();
      context.arc(this.x, this.y, this.collisionRadius, 0, Math.PI * 2);
      context.save();
      context.globalAlpha = 0.3;
      context.fill();
      context.restore();
      context.stroke();
    }
  }
}

export class Fireball extends Fire {
  sound = new Audio("./sounds/fireball_whoosh.mp3");
  image = document.getElementById("fireball") as unknown as HTMLImageElement;
  width = 40;
  height = 40;
  maxFrame = 0;
  collisionRadius = 20;
  coef = 30;
}
