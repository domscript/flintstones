import { Game } from "./game";
import { Control } from "./input";
import { PerksE } from "./Exp";
import { ShowProgramm } from "./showProgramm";
import {
  Staying,
  Sitting,
  Walking,
  Jumping,
  Falling,
  Attack1,
  Hugging,
  Climbing,
  Hit,
  Attack2,
  Attack2Staying,
  Attack2Walking,
  Attack2Jumping,
  Attack2Falling,
  StateInt,
  States,
} from "./playerStates";
import { CollisionAnimation, HitAnimation } from "./collisionAnimation";
import { FloatingMessage } from "./floatingMessage";

export class Player {
  image = document.getElementById("playerImage") as unknown as HTMLImageElement;
  frameX = [0];
  frameY = 0;
  maxFrame = 1;
  fps = 20;
  frameIntervar: number;
  frameTimer = 0;

  i = 0;

  images = {
    [States.STAYING]: {
      sizeX: 35,
      sizeY: 50,
      img: [{ coorX: 0, coorY: 0 }],
    },
    [States.SITTING]: {
      sizeX: 35,
      sizeY: 50,
      img: [{ coorX: 33, coorY: 0 }],
    },
    [States.WALKING]: {
      sizeX: 32,
      sizeY: 50,
      img: [
        { coorX: 101, coorY: 0 },
        { coorX: 132, coorY: 0 },
        { coorX: 165, coorY: 0 },
        { coorX: 199, coorY: 0 },
        { coorX: 232, coorY: 0 },
        { coorX: 263, coorY: 0 },
      ],
    },
    [States.STOP1]: {
      sizeX: 35,
      sizeY: 50,
      img: [{ coorX: 332, coorY: 0 }],
    },
    [States.STOP2]: {
      sizeX: 35,
      sizeY: 50,
      img: [{ coorX: 373, coorY: 0 }],
    },
    [States.JUMPING]: {
      sizeX: 35,
      sizeY: 50,
      img: [{ coorX: 443, coorY: 0 }],
    },
    [States.FALLING]: {
      sizeX: 35,
      sizeY: 50,
      img: [{ coorX: 481, coorY: 0 }],
    },
    [States.ATTACK1]: {
      sizeX: 60,
      sizeY: 50,
      img: [
        { coorX: 35, coorY: 78 },
        { coorX: 35, coorY: 78 },
        { coorX: 35, coorY: 78 },
        { coorX: 310, coorY: 78 },
        { coorX: 310, coorY: 78 },
        { coorX: 310, coorY: 78 },
        { coorX: 35, coorY: 78 },
        { coorX: 35, coorY: 78 },
      ],
    },
    [States.ATTACK2]: {
      sizeX: 41,
      sizeY: 50,
      img: [
        { coorX: 328, coorY: 78 },
        { coorX: 328, coorY: 78 },
        { coorX: 328, coorY: 78 },
        { coorX: 328, coorY: 78 },
        { coorX: 328, coorY: 78 },
      ],
    },
    [States.ATTACK3]: {
      sizeX: 41,
      sizeY: 50,
      img: [{ coorX: 0, coorY: 0 }],
    },
    [States.ATTACK2STAYING]: {
      sizeX: 41,
      sizeY: 50,
      img: [
        { coorX: 0, coorY: 78 },
        { coorX: 0, coorY: 78 },
        { coorX: 0, coorY: 78 },
        { coorX: 37, coorY: 78 },
        { coorX: 37, coorY: 78 },
        { coorX: 37, coorY: 78 },
      ],
    },
    [States.ATTACK2WALKING]: {
      sizeX: 41,
      sizeY: 50,
      img: [
        { coorX: 91, coorY: 78 },
        { coorX: 91, coorY: 78 },
        { coorX: 133, coorY: 78 },
        { coorX: 133, coorY: 78 },
        { coorX: 172, coorY: 78 },
        { coorX: 172, coorY: 78 },
        { coorX: 211, coorY: 78 },
        { coorX: 211, coorY: 78 },
      ],
    },
    [States.ATTACK2JUMPING]: {
      sizeX: 41,
      sizeY: 50,
      img: [
        { coorX: 266, coorY: 78 },
        { coorX: 266, coorY: 78 },
      ],
    },
    [States.ATTACK2FALLING]: {
      sizeX: 41,
      sizeY: 50,
      img: [
        { coorX: 266, coorY: 78 },
        { coorX: 266, coorY: 78 },
      ],
    },
    [States.HUGGING]: {
      sizeX: 31,
      sizeY: 50,
      img: [
        { coorX: -2, coorY: 171 },
        { coorX: -2, coorY: 171 },
        { coorX: -2, coorY: 171 },
        { coorX: -2, coorY: 171 },
        { coorX: 31, coorY: 171 },
        { coorX: 31, coorY: 171 },
        { coorX: 31, coorY: 171 },
        { coorX: 31, coorY: 171 },
        { coorX: 63, coorY: 171 },
        { coorX: 63, coorY: 171 },
        { coorX: 63, coorY: 171 },
        { coorX: 63, coorY: 171 },
      ],
    },
    [States.CLIMBING]: {
      sizeX: 30,
      sizeY: 60,
      img: [
        { coorX: 111, coorY: 138 },
        { coorX: 111, coorY: 138 },
        { coorX: 111, coorY: 138 },
        { coorX: 111, coorY: 138 },
        { coorX: 138, coorY: 138 },
        { coorX: 138, coorY: 138 },
        { coorX: 138, coorY: 138 },
        { coorX: 138, coorY: 138 },
        { coorX: 168, coorY: 137 },
        { coorX: 168, coorY: 137 },
        { coorX: 168, coorY: 137 },
        { coorX: 168, coorY: 137 },
        { coorX: 198, coorY: 136 },
        { coorX: 198, coorY: 136 },
        { coorX: 198, coorY: 136 },
        { coorX: 198, coorY: 136 },
        { coorX: 231, coorY: 130 },
        { coorX: 231, coorY: 130 },
        { coorX: 231, coorY: 130 },
        { coorX: 231, coorY: 130 },
      ],
    },
    [States.HIT]: {
      sizeX: 35,
      sizeY: 50,
      img: [
        { coorX: 284, coorY: 170 },
        { coorX: 325, coorY: 170 },
        { coorX: 284, coorY: 170 },
        { coorX: 325, coorY: 170 },
        { coorX: 284, coorY: 170 },
        { coorX: 325, coorY: 170 },
        { coorX: 284, coorY: 170 },
      ],
    },
  };
  width: number;
  height: number;
  sx: number = 0;
  sy: number = 0;
  x: number = 0;
  y: number = 0;
  head0 = 40;
  head: number = 40;
  y0 = 0;
  aY = 9.8; // Earth
  // aY = 3.721; // Mars
  // aY = 1.62; // Moon
  speed = 0;
  vy = 0;

  states: {
    [key: number]: StateInt;
  };
  currentState: StateInt;

  scale = 2.5;
  collisionRadius: number = 20;
  collisionRadiusHead: number = 20;
  collisionRadiusAttack: number = 0;
  collisionRadius0 = 90;
  look = true;

  hitTimer = 2000;
  hitTime = 2000;
  killTimer = 1000;
  killTime = 1000;

  hug: [boolean, number, number] = [false, 0, 0];

  groundX = true;

  constructor(public game: Game, public deltaTime: number) {
    this.width = this.images[`${States.STAYING}`].sizeX;
    this.height = this.images[`${States.STAYING}`].sizeY;
    this.x = -this.width * this.scale;
    this.y = 0;
    this.y0 = this.y - this.head;
    this.frameIntervar = 1000 / this.fps;

    this.states = {
      [States.STAYING]: new Staying(this.game),
      [States.SITTING]: new Sitting(this.game),
      [States.WALKING]: new Walking(this.game),
      [States.ATTACK1]: new Attack1(this.game),
      [States.JUMPING]: new Jumping(this.game),
      [States.FALLING]: new Falling(this.game),
      [States.HIT]: new Hit(this.game),
      [States.HUGGING]: new Hugging(this.game),
      [States.CLIMBING]: new Climbing(this.game),
      [States.ATTACK2]: new Attack2(this.game),
      [States.ATTACK2STAYING]: new Attack2Staying(this.game),
      [States.ATTACK2WALKING]: new Attack2Walking(this.game),
      [States.ATTACK2JUMPING]: new Attack2Jumping(this.game),
      [States.ATTACK2FALLING]: new Attack2Falling(this.game),
    };

    this.currentState = this.states[States.SITTING];
  }

  draw(context: CanvasRenderingContext2D) {
    this.y0 = this.y - this.head;
    if (this.currentState === this.states[States.HIT]) {
      this.drawPlayerHit(context);
    } else {
      this.drawPlayer(context);
    }
    this.drawDebugCircles(context);
  }

  update(input: string[], deltaTime: number) {
    this.hitTimer += deltaTime;
    this.killTime -= deltaTime;

    this.horisontalMovements(input);
    this.verticalMovements();

    this.spriteAnimation(deltaTime);

    this.collisionWithStars();
    this.collisionWithEnemies();
    this.collisionWithFireballs();
    this.collisionWithPerks();
    this.collisionWithSkills();
    this.collisionWithBarrels(deltaTime);
    this.collisionWithHomeRoof();
  }

  drawPlayer(context: CanvasRenderingContext2D): void {
    context.save();

    if (this.speed > 0) {
      this.look = true;
    }
    if (this.speed < 0) {
      this.look = false;
    }

    const { image, width, height, scale, x, y } = this;
    const scaleFactor = 1.3;

    if (this.speed >= 0 && this.look) {
      context.drawImage(
        image,
        this.frameX[this.i],
        this.frameY,
        width,
        height,
        x - (width * scale) / 2,
        y - (height * scale) / scaleFactor,
        width * scale,
        height * scale
      );
    } else {
      context.translate(width, 0);
      context.scale(-1, 1);
      context.drawImage(
        image,
        this.frameX[this.i],
        this.frameY,
        width,
        height,
        -x - (width * scale) / 5,
        y - (height * scale) / scaleFactor,
        width * scale,
        height * scale
      );
    }

    context.restore();
  }

  drawPlayerHit(context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(0, -this.collisionRadius);
    context.drawImage(
      this.image,
      this.frameX[this.i],
      this.frameY,
      this.width,
      this.height,
      this.x - (this.width * this.scale) / 2,
      this.y - (this.height * this.scale) / 1.3,
      this.width * this.scale,
      this.height * this.scale
    );
    context.restore();
  }

  drawDebugCircles(context: CanvasRenderingContext2D): void {
    if (this.game.debug) {
      context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.collisionRadius, 0, Math.PI * 2);
      context.globalAlpha = 0.3;
      context.arc(this.x, this.y0, this.collisionRadiusHead, 0, Math.PI * 2);
      context.arc(this.x, this.y0, this.collisionRadiusAttack, 0, Math.PI * 2);
      context.fill();
      context.restore();
      context.stroke();
    }
  }

  verticalMovements(): void {
    if (!this.onGround() || !this.groundX) {
      this.vy += Math.asin((this.aY / 90) * Math.PI);
      this.y += this.vy;
    }
    if (this.currentState === this.states[States.HUGGING]) {
      this.vy = 0;
      this.x = this.hug[1];
      this.y = this.hug[2] + this.collisionRadius * 4;
    } else {
      this.hug[0] = false;
    }
    if (this.currentState === this.states[States.CLIMBING]) {
      this.vy = 0;
      this.x = this.hug[1] + 5;
      this.y = this.hug[2] + this.collisionRadius;
    }

    if (this.onGround() && this.groundX) {
      this.vy = 0;
      this.game.grounds.forEach((ground) => {
        this.y = ground.y - this.collisionRadius;
      });
    } else {
      this.game.height - this.game.groundMarginMain - this.collisionRadius;
    }

    if (
      this.y >
      this.game.height - this.game.groundMarginMain - this.collisionRadius
    ) {
      this.vy = 0;
      this.y =
        this.game.height - this.game.groundMarginMain - this.collisionRadius;
    }
  }

  horisontalMovements(input: string[]): void {
    this.currentState.handleInput(input);

    this.x += this.speed;
    if (
      input.includes(Control.ArrowRight) &&
      this.currentState !== this.states[States.HIT]
    )
      this.speed = this.game.maxSpeed;
    else if (
      input.includes(Control.ArrowLeft) &&
      this.currentState !== this.states[States.HIT]
    )
      this.speed = -this.game.maxSpeed;
    else if (this.currentState === this.states[States.HIT]) {
      if (this.hitTimer < this.hitTime / 2) {
        this.speed = 0;
      } else if (input.includes(Control.ArrowRight)) {
        this.speed = this.game.maxSpeed;
      } else if (input.includes(Control.ArrowLeft)) {
        this.speed = -this.game.maxSpeed;
      }
    } else {
      this.speed = 0;
    }
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
  }

  spriteAnimation(deltaTime: number): void {
    if (this.frameTimer > this.frameIntervar) {
      this.frameTimer = 0;
      if (this.i < this.maxFrame - 1) {
        this.i++;
      } else {
        this.i = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }

  collisionWithStars() {
    this.game.stars = this.game.stars.filter((star) => {
      const [collision] = this.game.checkCollision(this, star);
      if (collision) {
        star.markedForDeletion = true;
        this.game.starHitSound.volume = 0.5;
        this.game.starHitSound.play();
        this.game.starsTook += 1;
      }
      star.update();
      return !star.markedForDeletion;
    });
  }

  collisionWithEnemies() {
    this.game.enemies.forEach((enemy) => {
      // const [collision, distance, sumOfRadiuses, dx, dy] =
      const [collision] = this.game.checkCollision(this, enemy);
      const [collisionHead] = this.game.checkCollisionHead(this, enemy);
      const [collisionAttack] = this.game.checkCollisionAttack(this, enemy);

      if (
        collisionAttack &&
        this.currentState === this.states[States.ATTACK2]
      ) {
        // TODO .
        if (this.killTime < 0) {
          if (this.game.strength < 0) enemy.lives -= this.game.burger * 2;
          else enemy.lives -= this.game.burger + this.game.strength;
          if (enemy.lives > 0) {
            this.game.collisions.push(
              new HitAnimation(this.game, enemy.x, enemy.y)
            );
            this.game.whooshSound.pause();
            this.game.whooshSound.currentTime = 0;
            this.game.punchSound.play();

            this.killTime = this.killTimer;
          }
        }

        if (enemy.lives <= 0) {
          enemy.markedForDeletion = true;
          this.game.score++;
          this.game.floatingMessages.push(
            new FloatingMessage(`+1`, enemy.x, enemy.y, 150, 50)
          );
          this.game.collisions.push(
            new CollisionAnimation(this.game, enemy.x, enemy.y)
          );
          this.game.whooshSound.pause();
          this.game.whooshSound.currentTime = 0;
          this.game.punchSound.play();

          if (enemy.name === "dragon") {
            this.game.gameWon = true;
          }
        }
      } else if (
        (collision || collisionHead) &&
        this.hitTimer >= this.hitTime
      ) {
        this.setState(States.HIT, 0);
        this.hitTimer = 0;
        this.game.hitSound.play();

        --this.game.lives;
        // TODO .
        setTimeout(() => {
          this.setState(States.FALLING, 0);
        }, this.hitTime / 2);
      } else if (
        collisionAttack &&
        this.currentState === this.states[States.ATTACK1]
      ) {
        this.game.whooshSound.pause();
        this.game.whooshSound.currentTime = 0;
        if (this.killTime < 0) {
          enemy.lives -= this.game.burger;

          if (enemy.lives > 0) {
            this.game.collisions.push(
              new HitAnimation(this.game, enemy.x, enemy.y)
            );
            this.game.punchSound.play();
            this.killTime = this.killTimer;
          }
        }

        if (enemy.lives <= 0) {
          enemy.markedForDeletion = true;
          this.game.score++;
          this.game.floatingMessages.push(
            new FloatingMessage(`+1`, enemy.x, enemy.y, 150, 50)
          );
          this.game.collisions.push(
            new CollisionAnimation(this.game, enemy.x, enemy.y)
          );
          this.game.punchSound.play();

          if (enemy.name === "dragon") {
            this.game.gameWon = true;
          }
        }
      }
      if (this.game.lives <= 0) this.game.gameOver = true;
    });
  }

  collisionWithFireballs() {
    this.game.fireballs.forEach((fireball) => {
      const [collision] = this.game.checkCollision(this, fireball);
      const [collisionHead] = this.game.checkCollisionHead(this, fireball);

      if ((collision || collisionHead) && this.hitTimer >= this.hitTime) {
        this.setState(States.HIT, 0);
        this.hitTimer = 0;
        this.game.hitSound.play();
        --this.game.lives;
        // TODO .
        setTimeout(() => {
          this.setState(States.FALLING, 0);
        }, this.hitTime / 2);
      }
      if (this.game.lives <= 0) this.game.gameOver = true;
    });
  }

  collisionWithPerks() {
    this.game.perks.forEach((perk) => {
      // const [collision, distance, sumOfRadiuses, dx, dy] =
      const [collision] = this.game.checkCollision(this, perk);
      const [collisionHead] = this.game.checkCollisionHead(this, perk);
      if ((collision || collisionHead) && perk.ready) {
        this.game.bellTransitionSound.play();

        if (perk.name === PerksE.piggy && !this.game.piggy) {
          this.game.piggy = true;
        }
        if (perk.name === PerksE.programm && !this.game.programm1) {
          this.game.programm1 = true;
          this.game.programm.push(new ShowProgramm(this.game, PerksE.programm));
        }
        if (perk.name === PerksE.graduate) {
          this.game.graduate = true;
          this.game.showGraduate = true;
        }
        if (perk.name === PerksE.perfolenta) {
          this.game.perfolenta = true;
          this.game.programm.push(
            new ShowProgramm(this.game, PerksE.perfolenta)
          );
        }
        if (perk.name === PerksE.radiolamp) {
          this.game.radiolamp = true;
          this.game.programm.push(
            new ShowProgramm(this.game, PerksE.radiolamp)
          );
        }
        if (perk.name === PerksE.teamwin) {
          this.game.teamwin = true;
          this.game.programm.push(new ShowProgramm(this.game, PerksE.teamwin));
        }
        if (perk.name === PerksE.lochman) {
          this.game.lochman = true;
          this.game.programm.push(new ShowProgramm(this.game, PerksE.lochman));
        }
        if (perk.name === PerksE.rocket) {
          this.game.rocket = true;
          this.game.programm.push(new ShowProgramm(this.game, PerksE.rocket));
        }
        if (perk.name === PerksE.atlantis) {
          this.game.atlantis = true;
          this.game.programm.push(new ShowProgramm(this.game, PerksE.atlantis));
        }
        if (perk.name === PerksE.mac && this.game.piggy && !this.game.mac) {
          this.game.mac = true;
        }
        if (perk.name === PerksE.lives) {
          if (
            this.game.lives === this.game.livesMax &&
            this.game.livesMax < this.game.livesMaxStop
          )
            this.game.livesMax += 1;
          if (this.game.lives < this.game.livesMaxStop) this.game.lives += 1;
        }
        if (perk.name === PerksE.burger) {
          if (
            this.game.burger === this.game.burgerMax &&
            this.game.burgerMax < this.game.burgerMaxStop
          )
            this.game.burgerMax += 1;
          this.game.burger += 1;
        }
        if (perk.name === PerksE.shield) {
          if (
            this.game.shield === this.game.shieldMax &&
            this.game.shieldMax < this.game.shieldMaxStop
          )
            this.game.shieldMax += 1;
          this.game.shield += 1;
        }
        if (perk.name === PerksE.live && this.game.live < this.game.liveMax)
          this.game.live += 1;

        perk.markedForDeletion = true;
      }
    });
  }

  collisionWithSkills() {
    this.game.skills.forEach((skill) => {
      const [collision] = this.game.checkCollision(this, skill);
      const [collisionHead] = this.game.checkCollisionHead(this, skill);

      if ((collision || collisionHead) && skill.ready) {
        this.game.bellTransitionSound.play();

        skill.markedForDeletion = true;
        if (this.game.mySkill < this.game.skillsMax)
          this.game.doneSkills = this.game.addSkill();
      }
    });
  }

  collisionWithBarrels(deltaTime: number) {
    deltaTime;
    this.game.barrels.forEach((barrel) => {
      const [collisionAttack] = this.game.checkCollisionAttack(this, barrel);
      if (
        collisionAttack &&
        this.currentState === this.states[States.ATTACK2]
      ) {
        this.game.woodenHitSound.play();
        barrel.markedForDeletion = true;
        this.game.addPerk(barrel.x, barrel.y);
        deltaTime = 0;
      } else if (
        collisionAttack &&
        this.currentState === this.states[States.ATTACK1]
      ) {
        this.game.woodenHitSound.play();

        barrel.markedForDeletion = true;
        this.game.addPerk(barrel.x, barrel.y);
        deltaTime = 0;
      }
    });
  }

  collisionWithHomeRoof() {
    this.game.grounds.forEach((ground) => {
      const [collision, x, y] = this.game.checkCollisionHome(this, ground);
      if (
        collision &&
        (this.currentState === this.states[States.JUMPING] ||
          this.currentState === this.states[States.FALLING])
      ) {
        this.hug = [true, x, y];
      }
    });
  }

  onGround() {
    const growndY: boolean[] = [];
    const growndX: boolean[] = [];
    this.game.grounds.forEach((ground) => {
      if (this.y + this.collisionRadius >= ground.y && this.y <= ground.y)
        growndY.push(true);

      if (this.x < ground.x || this.x > ground.x2) {
        growndX.push(false);
      } else {
        growndX.push(true);
      }
    });
    this.groundX = growndX.some((el) => el);

    if (growndY.some((el) => el)) {
      return true;
    }
    return false;
  }

  ground() {
    return (
      this.y + this.collisionRadius >=
      this.game.height - this.game.groundMarginMain
    );
  }

  setState(state: number, speed: number) {
    this.currentState = this.states[state];
    if (!this.game.atlantis && this.game.grounds.length)
      this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }
}
