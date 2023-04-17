import { Game } from "./game";

export enum PerksE {
  barrel = "barrel",
  burger = "burger",
  lives = "lives",
  live = "live",
  newLive = "new_live",
  shield = "shield",
  piggy = "piggy",
  star = "star",
  mac = "mac",
  programm = "programm",
  graduate = "graduate",
  perfolenta = "perfolenta",
  radiolamp = "radiolamp",
  teamwin = "teamwin",
  lochman = "lochman",
  rocket = "rocket",
  atlantis = "atlantis",
}

abstract class Exp {
  abstract name: string;
  abstract image: HTMLImageElement;
  sizeX = 40;
  sizeY = 40;

  x = 700;
  y: number;
  startY = 0;

  collisionRadius = 20;
  markedForDeletion = false;

  ready = false;
  time = 1000;

  coef = 26;
  va = 5;
  angle = 0;

  constructor(public game: Game) {
    this.y =
      this.game.height - this.game.groundMarginMain - this.sizeY + this.coef;
    this.startY = this.y;

    setTimeout(() => {
      this.ready = true;
    }, this.time);
  }
  draw(context: CanvasRenderingContext2D) {
    this.x -= this.game.speed;
    this.angle += 5;

    if (this.y <= this.startY && !this.ready) {
      this.y -= Math.sin((this.angle / 180) * Math.PI) * this.va;
    } else this.y = this.startY;
    context.drawImage(
      this.image,
      this.x - this.sizeX / 2,
      this.y - this.sizeY / 2,
      this.sizeX,
      this.sizeY
    );
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

  update(): string {
    // check if off screen
    if (this.x + this.sizeX < 0) {
      this.markedForDeletion = true;
    }
    return this.name;
  }
}

export class Barrel extends Exp {
  image = document.getElementById(PerksE.barrel) as unknown as HTMLImageElement;
  x = Math.random() * 200 + 1400;
  y = 425;
  name = PerksE.barrel;
}

export class Live extends Exp {
  image = document.getElementById("live_new") as unknown as HTMLImageElement;
  name = PerksE.live;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}

export class Burger extends Exp {
  image = document.getElementById(PerksE.burger) as unknown as HTMLImageElement;
  name = PerksE.burger;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}
export class Shield extends Exp {
  image = document.getElementById(PerksE.shield) as unknown as HTMLImageElement;
  name = PerksE.shield;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}
export class Lives extends Exp {
  image = document.getElementById(
    PerksE.newLive
  ) as unknown as HTMLImageElement;
  name = PerksE.lives;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}

export class Mac extends Exp {
  image = document.getElementById(PerksE.mac) as unknown as HTMLImageElement;
  name = PerksE.mac;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}

export class Piggy extends Exp {
  image = document.getElementById(PerksE.piggy) as unknown as HTMLImageElement;
  name = PerksE.piggy;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}

export class Programm extends Exp {
  image = document.getElementById(
    PerksE.programm
  ) as unknown as HTMLImageElement;
  name = PerksE.programm;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}

export class Graduate extends Exp {
  image = document.getElementById(
    PerksE.graduate
  ) as unknown as HTMLImageElement;
  name = PerksE.graduate;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}

export class Perfolenta extends Exp {
  image = document.getElementById(
    PerksE.perfolenta
  ) as unknown as HTMLImageElement;
  name = PerksE.perfolenta;
  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}

export class Lamp extends Exp {
  image = document.getElementById(
    PerksE.radiolamp
  ) as unknown as HTMLImageElement;
  name = PerksE.radiolamp;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}

export class Team extends Exp {
  image = document.getElementById(
    PerksE.teamwin
  ) as unknown as HTMLImageElement;
  name = PerksE.teamwin;
  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}
export class Lochman extends Exp {
  image = document.getElementById(
    PerksE.lochman
  ) as unknown as HTMLImageElement;
  name = PerksE.lochman;
  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}
export class Rocket extends Exp {
  image = document.getElementById(PerksE.rocket) as unknown as HTMLImageElement;
  name = PerksE.rocket;
  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}
export class Atlantis extends Exp {
  image = document.getElementById(
    PerksE.atlantis
  ) as unknown as HTMLImageElement;
  name = PerksE.atlantis;
  constructor(game: Game, public x: number, public y: number) {
    super(game);
  }
}
