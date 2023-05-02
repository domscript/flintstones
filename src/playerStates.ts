import { Game } from "./game";
import { Dust } from "./particles";
import { Control } from "./input";
export const SPEED_UP = 9;

export enum States {
  STAYING,
  SITTING,
  WALKING,
  STOP1,
  STOP2,
  JUMPING,
  FALLING,
  HIT,
  ATTACK1,
  ATTACK2,
  ATTACK2STAYING,
  ATTACK2WALKING,
  ATTACK2JUMPING,
  ATTACK2FALLING,
  ATTACK3,
  HUGGING,
  CLIMBING,
}

export interface StateInt {
  game: Game;
  enter: () => void;
  handleInput: (input: string[]) => void;
}

abstract class State {
  constructor(
    public states:
      | States.STAYING
      | States.SITTING
      | States.WALKING
      | States.STOP1
      | States.STOP2
      | States.JUMPING
      | States.FALLING
      | States.HIT
      | States.ATTACK1
      | States.ATTACK2
      | States.ATTACK2STAYING
      | States.ATTACK2WALKING
      | States.ATTACK2JUMPING
      | States.ATTACK2FALLING
      | States.ATTACK3
      | States.HUGGING
      | States.CLIMBING,
    public game: Game
  ) {}

  enter() {
    this.game.player.width = this.game.player.images[this.states].sizeX;
    this.game.player.height = this.game.player.images[this.states].sizeY;
    this.game.player.frameX = this.game.player.images[this.states].img.map(
      (el) => el.coorX
    );
    this.game.player.frameY = this.game.player.images[this.states].img[0].coorY;
    this.game.player.maxFrame = this.game.player.images[this.states].img.length;
  }
}

export class Staying extends State implements StateInt {
  constructor(game: Game) {
    super(States.STAYING, game);
  }
  handleInput(input: string[]) {
    if (input.includes(Control.ArrowRight)) {
      this.game.player.setState(States.WALKING, 1);
    } else if (input.includes(Control.ArrowLeft)) {
      this.game.player.setState(States.WALKING, 0);
    } else if (input.includes(Control.Attack)) {
      this.game.player.collisionRadiusAttack =
        this.game.player.collisionRadius0;
      this.game.player.setState(States.ATTACK1, 0);
    } else if (input.includes(Control.ArrowDown)) {
      this.game.player.setState(States.SITTING, 0);
    } else if (input.includes(Control.Jump)) {
      this.game.player.setState(States.JUMPING, 0);
    } else if (this.game.super[0] > 0) {
      this.game.player.setState(States.ATTACK2STAYING, 0);
    }
  }
}

export class Sitting extends State implements StateInt {
  constructor(game: Game) {
    super(States.SITTING, game);
  }
  enter() {
    super.enter();
    this.game.player.head = 0;
  }
  handleInput(input: string[]) {
    if (input.includes(Control.ArrowRight)) {
      this.game.player.head = this.game.player.head0;
      this.game.player.setState(States.WALKING, 1);
    } else if (input.includes(Control.ArrowLeft)) {
      this.game.player.head = this.game.player.head0;
      this.game.player.setState(States.WALKING, 0);
    } else if (input.includes(Control.ArrowUp)) {
      this.game.player.head = this.game.player.head0;
      this.game.player.setState(States.STAYING, 0);
    } else if (input.includes(Control.Attack)) {
      this.game.player.collisionRadiusAttack =
        this.game.player.collisionRadius0;
      this.game.player.head = this.game.player.head0;
      this.game.player.setState(States.ATTACK1, 0);
    }
  }
}

export class Walking extends State implements StateInt {
  constructor(game: Game) {
    super(States.WALKING, game);
  }
  handleInput(input: string[]) {
    if (this.game.particles.length < this.game.particlesMax) {
      this.game.particles.push(
        new Dust(
          this.game.player.game,
          this.game.player.x + this.game.player.width * 0.5,
          this.game.player.y + this.game.player.collisionRadius,
          "rgba(185,180,28,0.2)"
        )
      );
    }

    if (input.includes(Control.ArrowRight) && input.includes(Control.Jump)) {
      this.game.player.setState(States.JUMPING, 1);
    } else if (
      input.includes(Control.ArrowLeft) &&
      input.includes(Control.Jump)
    ) {
      this.game.player.setState(States.JUMPING, 0);
    } else if (
      !input.includes(Control.ArrowRight) &&
      !input.includes(Control.ArrowLeft)
    ) {
      this.game.player.setState(States.STAYING, 0);
    } else if (
      input.includes(Control.ArrowDown) &&
      ((this.game.player.onGround() && this.game.player.groundX) ||
        this.game.player.ground())
    ) {
      this.game.player.setState(States.SITTING, 0);
    } else if (input.includes(Control.Jump)) {
      this.game.player.setState(States.JUMPING, 0);
    } else if (input.includes(Control.Attack)) {
      this.game.player.setState(States.ATTACK1, 1);
    } else if (this.game.super[0] > 0) {
      this.game.player.setState(States.ATTACK2WALKING, 0);
    }
  }
}

export class Jumping extends State implements StateInt {
  constructor(game: Game) {
    super(States.JUMPING, game);
  }
  enter() {
    super.enter();
    this.game.jumpSound.pause();
    this.game.jumpSound.currentTime = 0;
    this.game.jumpSound.play();
    if (
      (this.game.player.onGround() && this.game.player.groundX) ||
      this.game.player.ground()
    ) {
      this.game.player.vy = -SPEED_UP;
      this.game.player.y += this.game.player.vy;
    }
  }
  handleInput(input: string[]) {
    if (this.game.player.vy >= 0) {
      this.game.player.setState(States.FALLING, 0);
    } else if (input.includes(Control.Attack)) {
      this.game.player.setState(States.ATTACK1, 0);
    }
  }
}

export class Falling extends State implements StateInt {
  constructor(game: Game) {
    super(States.FALLING, game);
  }
  handleInput(input: string[]) {
    if (input.includes(Control.Attack)) {
      this.game.player.setState(States.ATTACK1, 0);
    } else if (
      (this.game.player.onGround() && this.game.player.groundX) ||
      this.game.player.ground()
    ) {
      this.game.player.setState(States.STAYING, 0);
    } else if (this.game.player.hug[0] && input.includes(Control.Jump)) {
      this.game.player.setState(States.HUGGING, 0);
    }
  }
}

export class Attack1 extends State implements StateInt {
  constructor(game: Game) {
    super(States.ATTACK1, game);
  }
  enter() {
    super.enter();
    this.game.whooshSound.play();
    this.game.player.collisionRadiusAttack = this.game.player.collisionRadius0;
  }
  handleInput(input: string[]) {
    if (
      !input.includes(Control.Attack) &&
      (!this.game.player.onGround() ||
        !this.game.player.groundX ||
        !this.game.player.ground())
    ) {
      this.game.player.width =
        this.game.player.images[`${States.FALLING}`].sizeX;
      this.game.player.height =
        this.game.player.images[`${States.FALLING}`].sizeY;
      this.game.player.setState(States.FALLING, 0);
      this.game.player.collisionRadiusAttack = 0;
      this.game.player.head = this.game.player.head0;
    } else if (
      !input.includes(Control.Attack) &&
      (!this.game.player.onGround() ||
        !this.game.player.groundX ||
        !this.game.player.ground()) &&
      this.game.player.vy > 0
    ) {
      this.game.player.width =
        this.game.player.images[`${States.JUMPING}`].sizeX;
      this.game.player.height =
        this.game.player.images[`${States.JUMPING}`].sizeY;
      this.game.player.setState(States.JUMPING, 0);
      this.game.player.collisionRadiusAttack = 0;
      this.game.player.head = this.game.player.head0;
    } else if (
      !input.includes(Control.Attack) &&
      ((this.game.player.onGround() && this.game.player.groundX) ||
        this.game.player.ground())
    ) {
      this.game.player.width =
        this.game.player.images[`${States.STAYING}`].sizeX;
      this.game.player.height =
        this.game.player.images[`${States.STAYING}`].sizeY;
      this.game.player.setState(States.STAYING, 0);
      this.game.player.collisionRadiusAttack = 0;
      this.game.player.head = this.game.player.head0;
    }
  }
}

export class Hit extends State implements StateInt {
  constructor(game: Game) {
    super(States.HIT, game);
  }
  handleInput(input: string[]) {
    input;
    if (
      this.game.player.frameX.length >= 10 &&
      ((this.game.player.onGround() && this.game.player.groundX) ||
        this.game.player.ground())
    ) {
      this.game.player.head = this.game.player.head0;
      this.game.player.setState(States.STAYING, 0);
    } else if (
      this.game.player.frameX.length >= 10 &&
      (!this.game.player.onGround() ||
        !this.game.player.groundX ||
        !this.game.player.ground())
    ) {
      this.game.player.head = this.game.player.head0;
      this.game.player.setState(States.FALLING, 0);
    }
  }
}

export class Hugging extends State implements StateInt {
  constructor(game: Game) {
    super(States.HUGGING, game);
  }
  handleInput(input: string[]) {
    if (input.includes(Control.ArrowUp)) {
      this.game.player.setState(States.CLIMBING, 0);
    }
    if (input.includes(Control.ArrowDown)) {
      this.game.player.setState(States.FALLING, 0);
    }
  }
}

export class Climbing extends State implements StateInt {
  constructor(game: Game) {
    super(States.CLIMBING, game);
  }
  handleInput(input: string[]) {
    input;
    setTimeout(() => {
      this.game.player.setState(States.STAYING, 0);
      this.game.player.y = this.game.grounds[0].y;
    }, 100);
  }
}

export class Attack2Staying extends State implements StateInt {
  constructor(game: Game) {
    super(States.ATTACK2STAYING, game);
  }
  enter() {
    super.enter();
    this.game.heartBeatSound.play();
  }
  handleInput(input: string[]) {
    if (this.game.super[0] < 0) {
      this.game.player.setState(States.ATTACK2, 0);
    } else if (
      this.game.super[0] > 0 &&
      ((this.game.player.onGround() && this.game.player.groundX) ||
        this.game.player.ground())
    ) {
      if (input.includes(Control.ArrowRight)) {
        this.game.player.setState(States.ATTACK2WALKING, 1);
      } else if (input.includes(Control.ArrowLeft)) {
        this.game.player.setState(States.ATTACK2WALKING, 0);
      }
      if (input.includes(Control.Jump)) {
        this.game.player.setState(States.ATTACK2JUMPING, 0);
      }
    }
  }
}

export class Attack2Walking extends State implements StateInt {
  constructor(game: Game) {
    super(States.ATTACK2WALKING, game);
  }
  enter() {
    super.enter();
    this.game.heartBeatSound.play();
  }
  handleInput(input: string[]) {
    if (this.game.super[0] < 0) {
      this.game.player.setState(States.ATTACK2, 0);
    } else if (
      this.game.super[0] > 0 &&
      ((this.game.player.onGround() && this.game.player.groundX) ||
        this.game.player.ground())
    ) {
      if (input.includes(Control.ArrowRight)) {
        this.game.player.setState(States.ATTACK2WALKING, 1);
      } else if (input.includes(Control.ArrowLeft)) {
        this.game.player.setState(States.ATTACK2WALKING, 0);
      } else if (this.game.super[0] < 0) {
        this.game.player.setState(States.ATTACK2, 0);
      } else {
        this.game.player.setState(States.ATTACK2STAYING, 0);
      }
      if (input.includes(Control.Jump)) {
        this.game.player.setState(States.ATTACK2JUMPING, 1);
      }
    }
  }
}
export class Attack2Jumping extends State implements StateInt {
  constructor(game: Game) {
    super(States.ATTACK2JUMPING, game);
  }
  enter() {
    super.enter();
    this.game.jumpSound.pause();
    this.game.jumpSound.currentTime = 0;
    this.game.jumpSound.play();
    if (
      (this.game.player.onGround() && this.game.player.groundX) ||
      this.game.player.ground()
    ) {
      this.game.player.vy = -SPEED_UP;
      this.game.player.y += this.game.player.vy;
    }
  }
  handleInput(input: string[]) {
    input;
    if (this.game.super[0] > 0 && this.game.player.vy >= 0) {
      this.game.player.setState(States.ATTACK2FALLING, 0);
    } else if (this.game.super[0] < 0) {
      this.game.player.setState(States.ATTACK2, 0);
    }
  }
}

export class Attack2Falling extends State implements StateInt {
  constructor(game: Game) {
    super(States.ATTACK2FALLING, game);
  }
  enter() {
    super.enter();
    this.game.heartBeatSound.play();
  }
  handleInput(input: string[]) {
    input;
    if (this.game.super[0] < 0) {
      this.game.player.setState(States.ATTACK2, 0);
    } else if (
      this.game.super[0] > 0 &&
      ((this.game.player.onGround() && this.game.player.groundX) ||
        this.game.player.ground())
    ) {
      this.game.player.setState(States.ATTACK2STAYING, 0);
    }
  }
}

export class Attack2 extends State implements StateInt {
  constructor(game: Game) {
    super(States.ATTACK2, game);
  }
  enter() {
    super.enter();
    this.game.heartBeatSound.pause();
    this.game.heartBeatSound.currentTime = 0;
    this.game.whooshSound.play();
    this.game.player.collisionRadiusAttack = this.game.player.collisionRadius0;
  }
  handleInput(input: string[]) {
    setTimeout(() => {
      if (
        !input.includes(Control.Attack) &&
        (!this.game.player.onGround() ||
          !this.game.player.groundX ||
          !this.game.player.ground())
      ) {
        this.game.player.width =
          this.game.player.images[`${States.FALLING}`].sizeX;
        this.game.player.height =
          this.game.player.images[`${States.FALLING}`].sizeY;
        this.game.player.setState(States.FALLING, 0);
        this.game.player.collisionRadiusAttack = 0;
        this.game.player.head = this.game.player.head0;
      } else if (
        !input.includes(Control.Attack) &&
        (!this.game.player.onGround() ||
          !this.game.player.groundX ||
          !this.game.player.ground()) &&
        this.game.player.vy > 0
      ) {
        this.game.player.width =
          this.game.player.images[`${States.JUMPING}`].sizeX;
        this.game.player.height =
          this.game.player.images[`${States.JUMPING}`].sizeY;
        this.game.player.setState(States.JUMPING, 0);
        this.game.player.collisionRadiusAttack = 0;
        this.game.player.head = this.game.player.head0;
      } else if (
        !input.includes(Control.Attack) &&
        ((this.game.player.onGround() && this.game.player.groundX) ||
          this.game.player.ground())
      ) {
        this.game.player.width =
          this.game.player.images[`${States.STAYING}`].sizeX;
        this.game.player.height =
          this.game.player.images[`${States.STAYING}`].sizeY;
        this.game.player.setState(States.STAYING, 0);
        this.game.player.collisionRadiusAttack = 0;
        this.game.player.head = this.game.player.head0;
      }
    }, 300);
  }
}
