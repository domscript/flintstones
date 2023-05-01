import { Player } from "./player";
import { InputHandler } from "./input";
import { Background, layers } from "./layer";
import { FlyingEnemy, GroundEnemy, JumpingEnemy } from "./enemies";
// import { SkillsE } from "./Skills";
import { Fireball } from "./fire";
import { UI } from "./UI";
import {
  Barrel,
  Live,
  Shield,
  Burger,
  Lives,
  Mac,
  Piggy,
  Programm,
  Graduate,
  Perfolenta,
  Lamp,
  Team,
  Lochman,
  Rocket,
  Atlantis,
} from "./Exp";
import { Skill, SPRITE_SHEET, SpSheet } from "./Skills";
import { Firefly, Spark } from "./effects";
import { Dust, Splash } from "./particles";
import { CollisionAnimation } from "./collisionAnimation";
import { FloatingMessage } from "./floatingMessage";
import { Home } from "./ground";
import { States } from "./playerStates";
import { Star } from "./star";
import { ShowProgramm } from "./showProgramm";
import { ShowGraduate } from "./showGraduate";

export class Game {
  super: number[] = [-0.1];

  strength: number = 0;
  superTime = 500; // ms

  fireballs: Fireball[] = [];

  enemies: (FlyingEnemy | GroundEnemy)[] = [];
  enemyMax = 10;
  enemyTimer = 0;
  enemyInterval = 1000;
  score = 0;

  groundMarginMain = 280;

  public grounds: Home[] = [];

  speed = 0;
  maxSpeed = 5;

  time = 0;
  maxTime = 5 * 60 * 1000;
  gameOver = false;
  gameWon = false;

  public background: Background;
  public player: Player;
  public input: InputHandler;
  lives = 3;
  livesMax = 3;
  livesMaxStop = 8;
  burger = 2;
  burgerMax = 2;
  burgerMaxStop = 7;
  shield = 2;
  shieldMax = 2;
  shieldMaxStop = 7;
  live = 98;
  liveMax = 99;
  stars: Star[] = [];
  starsMax = 25;
  starsNeed = 24;
  starsTook = 0;
  programm: ShowProgramm[] = [];
  programm1 = false;
  graduate = false;
  showGraduate = false;
  graduateIcon: ShowGraduate[] = [];
  perfolenta = false;
  radiolamp = false;
  teamwin = false;
  lochman = false;
  rocket = false;
  atlantis = false;

  punchSound = new Audio("./sounds/punch.mp3");
  woodenHitSound = new Audio("./sounds/wooden_crash.mp3");
  whooshSound = new Audio("./sounds/whoosh_1.mp3");
  heartBeatSound = new Audio("./sounds/heart_beat.mp3");
  starHitSound = new Audio("./sounds/ckeck_1.mp3");
  bellTransitionSound = new Audio("./sounds/bell_transition.mp3");
  hitSound = new Audio("./sounds/hit.mp3");
  jumpSound = new Audio("./sounds/launch.mp3");

  // pte

  deltaTime: number = 0;
  letterTime = 0;
  letterTimer = 100;

  winningScore = 10;

  debug = false;
  ui: UI;

  perksTimer = 0;
  perksInterval = 100;
  perksMax = 2;
  perks: Lives[] = [];
  barrelsMax = 1;
  barrels: Barrel[] = [];
  mySkill = 0;
  skills: Skill[] = [];
  skillsMax = Object.keys(SPRITE_SHEET).length;
  fontColor = "black";
  ganeSkills = SPRITE_SHEET;
  doneSkills: Array<keyof SpSheet> = [];
  programmName = "";
  homeW = 334;
  homeH = 275;
  homeStart = 1500;
  onHomeBool = true;

  piggy = false;
  mac = false;

  particles: (Firefly | Spark | Dust | Splash)[] = [];
  particlesMax = 40;
  collisions: CollisionAnimation[] = [];
  floatingMessages: FloatingMessage[] = [];

  constructor(public width: number, public height: number) {
    this.strength = this.super[0] / 300;

    this.background = new Background(this, layers[0]);
    this.grounds = [
      new Home(
        this,
        this.homeH,
        this.homeStart,
        this.homeStart + this.homeW,
        "home"
      ),
    ];
    this.player = new Player(this, 0);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
    this.player.currentState = this.player.states[States.STAYING];
    this.player.currentState.enter();
    this.showGraduate = this.graduate;
    this.graduateIcon = [new Graduate(this, this.player.x, this.player.y)];
  }
  draw(context: CanvasRenderingContext2D) {
    this.background.draw(context);
    if (this.grounds.length) {
      this.grounds.forEach((home) => home.draw(context));
    }
    this.stars.forEach((star) => {
      star.draw(context);
    });
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.particles.forEach((particle) => particle.draw(context));
    this.collisions.forEach((collision) => collision.draw(context));
    this.floatingMessages.forEach((message) => {
      message.draw(context);
    });
    this.ui.draw(context);
    this.perks.forEach((perk) => perk.draw(context));
    this.barrels.forEach((barrel) => barrel.draw(context));
    this.programm.at(-1)?.draw(context);
    if (this.programm.length) {
      setTimeout(() => {
        this.programm = [];
      }, 2000);
    }
    this.skills.forEach((skill) => skill.draw(context));
    this.fireballs.forEach((ball) => ball.draw(context));
    this.player.draw(context);
    this.graduateIcon[0]?.draw(context);
    if (this.graduateIcon.length)
      setTimeout(() => {
        this.graduateIcon = [];
      }, 2000);
  }
  update(deltaTime: number) {
    this.deltaTime = deltaTime;
    if (this.gameWon) {
      this.background = new Background(this, layers[2]);
      this.grounds.forEach((ground) => {
        ground.idImg = "home";
        ground.x = this.width + 5;
      });

      if (Math.random() < 0.03)
        this.stars.push(new Star(this, this.player.x, this.player.y));
    }

    if (!this.atlantis && !this.grounds.length) {
      if (Math.random() > 0.7) {
        this.grounds = [
          new Home(
            this,
            this.homeH,
            this.homeStart,
            this.homeStart + this.homeW,
            "home"
          ),
        ];
      } else {
        const x = this.homeStart;
        this.grounds = [
          new Home(this, this.homeH, x, x + this.homeW, "home"),
          new Home(
            this,
            this.homeH,
            x + this.homeW * 1.2,
            x + this.homeW * 1.2 + this.homeW,
            "home"
          ),
        ];
      }
    } else if (!this.grounds.length) {
      this.grounds = [
        new Home(
          this,
          this.homeH,
          this.homeStart,
          this.homeStart + this.homeW,
          "home1"
        ),
      ];
    } else if (this.grounds.length) {
      this.grounds.forEach((ground) => {
        ground.idImg = "home1";
      });
    }

    if (this.atlantis && !this.gameWon) {
      this.background = new Background(this, layers[1]);
      setTimeout(() => {
        this.speed = 0;
      }, 2000);
    }

    this.fireballs = this.fireballs.filter((ball) => {
      ball.sound.volume = 0.1;
      ball.sound.play();
      ball.update();
      return !ball.markedForDeletion;
    });

    this.strength =
      this.super[0] / 300 > this.burger ? this.burger : this.super[0] / 300;
    if (this.showGraduate) {
      this.graduateIcon.push(new ShowGraduate(this, "graduate"));
      this.graduateIcon[0].x = this.player.x;
      this.graduateIcon[0].y = this.player.y;
      setTimeout(() => {
        this.graduateIcon = this.graduateIcon.filter(() => false);
        this.showGraduate = false;
      }, 2000);
    }

    if (this.piggy && !this.mac && Math.random() < 0.1 && this.starsMax > 0) {
      --this.starsMax;
      this.stars.push(new Star(this, this.player.x, this.player.y));
    }

    if (this.programm.length) {
      setTimeout(() => {
        this.programm = [];
      }, 2000);
    }

    this.time += deltaTime;
    if (this.time > this.maxTime && !this.gameWon) {
      this.gameOver = true;
    }
    this.background.update();
    this.player.update(this.input.keys, deltaTime);

    // handle Homes
    this.grounds = this.grounds.filter((ground) => {
      ground.update();
      return !ground.markedForDeletion;
    });

    // handle Perks
    if (
      this.perksTimer > this.perksInterval &&
      this.perks.length < this.perksMax
    ) {
      this.perksTimer = 0;
    } else {
      this.perksTimer += deltaTime;
    }
    this.perks = this.perks.filter((perk) => {
      this.programmName = perk.update();
      return !perk.markedForDeletion;
    });
    this.skills = this.skills.filter((skill) => {
      skill.update();
      return !skill.markedForDeletion;
    });

    // handle Barrels
    if (
      this.perksTimer > this.perksInterval &&
      this.perks.length < this.perksMax
    ) {
      this.addBarrel();
      this.perksTimer = 0;
    } else {
      this.perksTimer += deltaTime;
    }
    this.barrels = this.barrels.filter((barrel) => {
      barrel.update();
      return !barrel.markedForDeletion;
    });

    // handleEnemies
    if (
      this.enemyTimer > this.enemyInterval &&
      this.enemies.length < this.enemyMax
    ) {
      // TODO .
      if (!this.gameWon) {
        this.addEnemy();
        this.enemyTimer = 0;
      }
    } else {
      this.enemyTimer += deltaTime;
    }

    this.enemies = this.enemies.filter((enemy) => {
      enemy.sound.play();
      enemy.update(deltaTime);
      return !enemy.markedForDeletion;
    });

    this.floatingMessages = this.floatingMessages.filter((message) => {
      message.update();
      return !message.markedForDeletion;
    });
    this.particles = this.particles.filter((particle) => {
      particle.update();
      return !particle.markedForDeletion;
    });
    this.collisions = this.collisions.filter((collision) => {
      collision.update(deltaTime);
      return !collision.markedForDeletion;
    });
  }
  addEnemy() {
    if (
      !this.atlantis &&
      this.speed > 0 &&
      Math.random() < 0.9 &&
      this.enemies.length < 1
    ) {
      this.enemies.push(new GroundEnemy(this));
    }
    if (!this.atlantis && Math.random() < 0.5 && this.enemies.length < 1) {
      this.enemies.push(new FlyingEnemy(this));
    }
    if (this.atlantis && this.enemies.length < 1)
      // if (this.enemies.length < 1)
      this.enemies.push(new JumpingEnemy(this));
  }
  addPerk(x: number, y: number) {
    if (this.gameWon) {
    } else if (!this.piggy) this.perks.push(new Piggy(this, x, y));
    else if (!this.mac && this.starsTook > this.starsNeed)
      this.perks.push(new Mac(this, x, y));
    else if (this.mac && !this.programm1) {
      this.perks.push(new Programm(this, x, y));
    } else if (this.programm1 && !this.graduate) {
      this.perks.push(new Graduate(this, x, y));
    } else if (!this.perfolenta && this.graduate) {
      this.perks.push(new Perfolenta(this, x, y));
    } else if (!this.radiolamp && this.graduate) {
      this.perks.push(new Lamp(this, x, y));
    } else if (!this.teamwin && this.radiolamp) {
      this.perks.push(new Team(this, x, y));
    } else if (!this.lochman && this.teamwin) {
      this.perks.push(new Lochman(this, x, y));
      this.barrelsMax = 10;
    } else if (this.burger < this.burgerMaxStop)
      this.perks.push(new Burger(this, x, y));
    else if (this.mySkill < this.skillsMax && this.mac) {
      this.skills.push(new Skill(this, x, y));
    } else if (Math.random() < 0.5 && this.shield < this.shieldMaxStop)
      this.perks.push(new Shield(this, x, y));
    else if (this.lives < this.livesMaxStop) {
      this.perks.push(new Lives(this, x, y));
    } else if (Math.random() < 0.9 && this.live < this.liveMax) {
      this.perks.push(new Live(this, x, y));
    } else if (!this.rocket) {
      this.perks.push(new Rocket(this, x, y));
    } else if (!this.atlantis) {
      this.perks.push(new Atlantis(this, x, y));
    }
  }
  addBarrel() {
    if (
      Math.random() < 1 &&
      (this.lives < this.livesMaxStop ||
        this.burger < this.burgerMaxStop ||
        this.shield < this.shieldMaxStop ||
        this.live < this.liveMax ||
        this.doneSkills.length < this.skillsMax) &&
      this.barrels.length < this.barrelsMax
    )
      this.barrels.push(new Barrel(this));
  }

  addSkill(): Array<keyof SpSheet> {
    return Object.keys(this.ganeSkills).slice(0, ++this.mySkill) as Array<
      keyof SpSheet
    >;
  }

  checkCollision(
    a: Player,
    b:
      | FlyingEnemy
      | GroundEnemy
      | Live
      | Shield
      | Burger
      | Lives
      | Barrel
      | Star
      | Skill
      | Fireball
  ): [boolean, number, number, number, number] {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.hypot(dx, dy);
    const sumOfRadiuses = a.collisionRadius + b.collisionRadius;
    return [distance < sumOfRadiuses, distance, sumOfRadiuses, dx, dy];
  }
  checkCollisionHead(
    a: Player,
    b:
      | FlyingEnemy
      | GroundEnemy
      | Live
      | Shield
      | Burger
      | Lives
      | Barrel
      | Skill
      | Fireball
  ): [boolean, number, number, number, number] {
    const dx = a.x - b.x;
    const dy = a.y0 - b.y;
    const distance = Math.hypot(dx, dy);
    const sumOfRadiuses = a.collisionRadiusHead + b.collisionRadius;
    return [distance < sumOfRadiuses, distance, sumOfRadiuses, dx, dy];
  }
  checkCollisionAttack(
    a: Player,
    b: FlyingEnemy | GroundEnemy | Barrel
  ): [boolean, number, number, number, number] {
    const dx = a.x - b.x;
    const dy = a.y0 - b.y;
    const distance = Math.hypot(dx, dy);
    const sumOfRadiuses = a.collisionRadiusAttack + b.collisionRadius;
    return [distance < sumOfRadiuses, distance, sumOfRadiuses, dx, dy];
  }

  checkCollisionHome(a: Player, b: Home): [boolean, number, number] {
    const dxl = a.x - b.x;
    const dyl = a.y0 - b.y;
    const dxr = a.x - b.x - b.sizeX;
    const dyr = a.y0 - b.y;
    const distancel = Math.hypot(dxl, dyl);
    const distancer = Math.hypot(dxr, dyr);
    const sumOfRadiuses = a.collisionRadiusHead + b.collisionRadius * 10;
    if (distancel < sumOfRadiuses) return [distancel < sumOfRadiuses, b.x, b.y];
    if (distancer < sumOfRadiuses)
      return [distancer < sumOfRadiuses, b.x + b.sizeX - 10, b.y];
    return [false, b.x, b.y];
  }
}
