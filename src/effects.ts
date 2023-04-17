import { Game } from "./game";

abstract class Particle {
  collisionX: number;
  collisionY: number;
  radius = Math.floor(Math.random() * 10 + 5);
  speedX: number;
  speedY = Math.random() * 2 + 0.5;
  va = Math.random() * 0.1 + 0.01;
  angle = 0;
  markedForDeletion = false;

  constructor(
    public game: Game,
    public x: number,
    public y: number,
    public color: string
  ) {
    this.collisionX = x;
    this.collisionY = y;
    this.speedX = Math.random() * 6 - 3 + this.game.speed * 1.5;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.collisionX, this.collisionY, this.radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}

export class Firefly extends Particle {
  update() {
    this.angle += this.va;
    this.collisionX += Math.cos(this.angle) * this.speedX;
    this.collisionY -= this.speedY;
    if (this.collisionY < 0 - this.radius) {
      this.markedForDeletion = true;
    }
  }
}

export class Spark extends Particle {
  update() {
    this.angle += this.va * 0.5;
    this.collisionX -= Math.sin(this.angle) * this.speedX;
    this.collisionY -= Math.cos(this.angle) * this.speedY;
    if (this.radius > 0.1) this.radius -= 0.05;
    if (this.radius < 0.2 || this.y < -10) {
      this.markedForDeletion = true;
    }
  }
}
