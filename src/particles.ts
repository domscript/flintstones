import { Game } from "./game";

abstract class Particle {
  // radius = Math.floor(Math.random() * 10 + 5);
  abstract speedX: number;
  abstract speedY: number;
  // angle = 0;
  // va = Math.random() * 0.1 + 0.01;
  markedForDeletion = false;
  abstract size: number;

  constructor(
    public game: Game,
    public x: number,
    public y: number,
    public color: string
  ) {}

  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
  }
}

export class Dust extends Particle {
  speedX: number = Math.random();
  speedY: number = Math.random();
  size: number = Math.random() * 10 + 10;

  constructor(game: Game, x: number, y: number, color: string) {
    super(game, x, y, color);
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    // context.stroke();
    context.restore();
  }

  update() {
    super.update();
    this.y -= this.speedY;
    if (this.x < 0 - this.size) {
      this.markedForDeletion = true;
    }
  }
}

export class Splash extends Particle {
  image = document.getElementById("fire") as unknown as HTMLImageElement;
  speedX: number = Math.random() * 6 - 3;
  speedY: number = Math.random() * 2 + 2;
  size: number = Math.random() * 100 + 100;

  gravity = 0;
  // angle = 0;
  // va = Math.random() * 0.2 - 0.1;

  constructor(game: Game, x: number, y: number, color: string) {
    super(game, x, y, color);
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.4;
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
  update() {
    super.update();

    this.gravity += 0.1;
    this.y += this.gravity;
    // this.angle += this.va;
    // this.x += Math.sin(this.angle * 10);
    this.y -= this.speedY;
    if (this.x < 0 - this.size) {
      this.markedForDeletion = true;
    }
  }
}

export class Fire extends Particle {
  image = document.getElementById("fire") as unknown as HTMLImageElement;
  speedX: number = 1;
  speedY: number = 1;
  size: number = Math.random() * 30 + 30;

  angle = 0;
  va = Math.random() * 0.2 - 0.1;

  constructor(game: Game, x: number, y: number, color: string) {
    super(game, x, y, color);
  }
  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(this.image, 0, 0, this.size, this.size);
    context.restore();
  }
  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 10);
    this.y -= this.speedY;
    if (this.x < 0 - this.size) {
      this.markedForDeletion = true;
    }
  }
}
