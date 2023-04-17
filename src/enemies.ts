import { Game } from "./game";
import { Fireball } from "./fire";

abstract class Enemy {
  frameX = 0;
  frameY = 0;
  fps = 2;
  frameInterval = 1000 / this.fps;
  frameTimer = 0;
  lives = 2;

  x: number = 0;
  y: number = 0;

  speed = 0;

  speedX: number = 0;
  speedY: number = 0;
  maxFrame: number = 0;

  abstract image: HTMLImageElement;
  width: number = 0;
  height: number = 0;
  collisionRadius = 10;

  markedForDeletion = false;

  abstract name: string;

  constructor(public game: Game) {
    this.frameY = 0;
  }

  update(deltaTime: number) {
    const gameWidth = this.game.width;
    const playerCoordX = this.game.player.x;

    if (this.x < playerCoordX - gameWidth / 3) {
      this.speedX = -this.game.speed - this.speed;
    } else if (this.x > playerCoordX + gameWidth / 3) {
      this.speedX = this.speed;
    }
    // movement
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // check if off screen
    if (this.x + this.width < 0 || this.x - this.width > gameWidth) {
      this.markedForDeletion = true;
    }
  }
  draw(context: CanvasRenderingContext2D) {
    context.save();
    if (this.speedX > 0) {
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

export class FlyingEnemy extends Enemy {
  name = "pterodactyl";
  sound = new Audio("./sounds/pterodactyl.mp3");
  image = document.getElementById("enemy_fly") as unknown as HTMLImageElement;
  width = 150;
  height = 100;
  maxFrame = 1;

  x = 200;
  y: number;
  collisionRadius = 35;
  speed = Math.random() + 1;
  lives = 7;
  speedX = 1;
  angle = 0;

  constructor(game: Game) {
    super(game);
    this.x = this.game.width + this.width;
    this.y = (Math.random() * this.game.height) / 2;
  }
  update(deltaTime: number) {
    super.update(deltaTime);

    if (this.y <= this.game.player.y - this.game.player.collisionRadius * 4) {
      this.y += 1;
      this.y += Math.abs(Math.sin(this.angle / 2)) * 2;
    } else this.y -= Math.abs(Math.sin(this.angle / 2)) * 2;
  }
}

export class GroundEnemy extends Enemy {
  name = "dino";
  sound = new Audio("./sounds/dino.mp3");
  image = document.getElementById("dino") as unknown as HTMLImageElement;
  width = 150;
  height = 90;
  maxFrame = 1;

  x = 200;
  y: number;
  collisionRadius = 45;
  speed = 1;
  speedX = 0;
  lives = 4;

  constructor(public game: Game) {
    super(game);
    this.x = this.game.width;
    this.y =
      this.game.height -
      this.game.grounds[0]?.y -
      this.height +
      this.collisionRadius;
  }
}

export class JumpingEnemy extends Enemy {
  name = "dragon";
  sound = new Audio("./sounds/dragon.mp3");
  image = document.getElementById("dragon") as unknown as HTMLImageElement;
  width = 300;
  height = 225;
  maxFrame = 1;

  x = 200;
  y: number;
  collisionRadius = 100;
  speed = 6;
  lives = 70;
  elapsedTime = 0;
  totalTime = 6000;

  coef = 20;

  constructor(game: Game) {
    super(game);
    this.speedX = 0;
    this.x = this.game.width * 0.9;
    this.y =
      this.game.height -
      this.game.grounds[0]?.y -
      this.height +
      this.collisionRadius +
      this.coef;
  }

  update(deltaTimeInMilliseconds: number) {
    const halfGameWidth = this.game.width / 2;
    const gameHeight = this.game.height;
    const heightRatio = Math.abs(this.x - halfGameWidth) / gameHeight;
    const verticalSpeed = 14 * heightRatio;

    if (this.x <= halfGameWidth * 2 * 0.1) {
      this.frameY = 0;
      this.fireHorizontal();
      this.speedX = -this.game.speed;
      this.elapsedTime += deltaTimeInMilliseconds;
    } else if (this.x >= halfGameWidth * 2 * 0.9) {
      this.frameY = 0;
      this.fireHorizontal();
      this.speedX = 0.01;
      this.elapsedTime += deltaTimeInMilliseconds;
      this.x += 0.01;
    } else {
      this.frameY = 1;
      if (
        (this.x > halfGameWidth && this.speedX > 0) ||
        (this.x < halfGameWidth && this.speedX < 0)
      ) {
        this.y -= verticalSpeed;
      }
      if (
        (this.x < halfGameWidth && this.speedX > 0) ||
        (this.x > halfGameWidth && this.speedX < 0)
      ) {
        this.y += verticalSpeed;
      }
      this.fireVertical();
    }

    if (this.elapsedTime > this.totalTime) {
      if (this.x > halfGameWidth) {
        this.speedX += this.speed;
      } else {
        this.speedX -= this.speed;
      }
      this.elapsedTime = 0;
    }
    // movement
    this.x -= this.speedX;
    this.y += this.speedY;

    if (this.frameTimer < this.frameInterval) {
      this.frameTimer += deltaTimeInMilliseconds;
    } else {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }
  }

  fireHorizontal() {
    const fireballTimings = [0, 0.3, 0.6, 0.9];
    if (!this.game.fireballs.length) {
      this.newFireball();
    } else {
      for (let i = 1; i <= fireballTimings.length - 1; i++) {
        const isTimingReached =
          this.elapsedTime >= this.totalTime * fireballTimings[i];
        const canAddFireball = i > this.game.fireballs.length - 1;
        if (isTimingReached && canAddFireball) {
          this.newFireball();
        }
      }
    }
  }

  fireVertical() {
    const valuesToCheck = [
      { min: 0.2, max: 0.21 },
      { min: 0.4, max: 0.41 },
      { min: 0.6, max: 0.61 },
      { min: 0.79, max: 0.8 },
    ];

    for (const { min, max } of valuesToCheck) {
      if (
        this.x > this.game.width * min &&
        this.x < this.game.width * max &&
        this.game.fireballs.length < 5
      ) {
        this.newFireball();
        break;
      }
    }
  }

  newFireball() {
    this.game.fireballs.push(new Fireball(this.game, this));
  }
}
