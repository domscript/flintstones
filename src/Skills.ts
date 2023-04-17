import { Game } from "./game";

export enum SkillsE {
  vscode = "vscode",
  google = "google",
  html = "html",
  css = "css",
  c = "c",
  js = "js",
  ts = "ts",
  eng = "eng",
  github = "github",
  git = "git",
  nodejs = "nodejs",
  postman = "postman",
  figma = "figma",
  nestjs = "nestjs",
  sass = "sass",
  bootstrap = "bootstrap",
  postcss = "postcss",
  tailwindcss = "tailwindcss",
  webpack = "webpack",
  vite = "vite",
  kotlin = "kotlin",
  reactNative = "React Native",
  react = "react",
  python = "python",
  nextjs = "nextjs",
  astro = "astro",
  heroku = "heroku",
  netlify = "netlify",
  versel = "versel",
  graphql = "graphql",
  firebase = "firebase",
  mongoDB = "mongoDB",
}

export type SpSheet = Record<SkillsE, { x: number; y: number }>;

export const SPRITE_SHEET: SpSheet = {
  [SkillsE.vscode]: { x: 0, y: 0 },
  [SkillsE.google]: { x: 0, y: 45 },
  [SkillsE.html]: { x: 45, y: 0 },
  [SkillsE.css]: { x: 45, y: 45 },
  [SkillsE.c]: { x: 90, y: 0 },
  [SkillsE.js]: { x: 90, y: 45 },
  [SkillsE.ts]: { x: 135, y: 0 },
  [SkillsE.eng]: { x: 135, y: 45 },
  [SkillsE.github]: { x: 180, y: 0 },
  [SkillsE.git]: { x: 180, y: 45 },
  [SkillsE.nodejs]: { x: 225, y: 0 },
  [SkillsE.postman]: { x: 225, y: 45 },
  [SkillsE.figma]: { x: 270, y: 0 },
  [SkillsE.nestjs]: { x: 270, y: 45 },
  [SkillsE.sass]: { x: 315, y: 0 },
  [SkillsE.bootstrap]: { x: 315, y: 45 },
  [SkillsE.postcss]: { x: 360, y: 0 },
  [SkillsE.tailwindcss]: { x: 360, y: 45 },
  [SkillsE.webpack]: { x: 405, y: 0 },
  [SkillsE.vite]: { x: 405, y: 45 },
  [SkillsE.kotlin]: { x: 450, y: 0 },
  [SkillsE.reactNative]: { x: 450, y: 45 },
  [SkillsE.react]: { x: 495, y: 0 },
  [SkillsE.python]: { x: 495, y: 45 },
  [SkillsE.nextjs]: { x: 540, y: 0 },
  [SkillsE.astro]: { x: 540, y: 45 },
  [SkillsE.heroku]: { x: 585, y: 0 },
  [SkillsE.netlify]: { x: 585, y: 45 },
  [SkillsE.versel]: { x: 630, y: 0 },
  [SkillsE.graphql]: { x: 630, y: 45 },
  [SkillsE.firebase]: { x: 675, y: 0 },
  [SkillsE.mongoDB]: { x: 675, y: 45 },
};

const names = Object.keys(SPRITE_SHEET) as Array<keyof SpSheet>;

abstract class Exp {
  abstract image: HTMLImageElement;
  sizeX = 40;
  sizeY = 40;
  x = 700;
  y: number;
  coef = 26;
  startY = 0;

  collisionRadius = 20;
  markedForDeletion = false;

  ready = false;
  time = 1000;

  va = 5;
  angle = 0;
  name: string;

  constructor(public game: Game) {
    this.y = this.game.height - this.game.grounds[0].y - this.sizeY + this.coef;
    this.startY = this.y;
    const element = names.shift();
    this.name = element ? element : "vscode";

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

    const { x, y } = SPRITE_SHEET[this.name as keyof SpSheet];
    if (this.y && this.x) {
      context.drawImage(
        this.image,
        x,
        y,
        45,
        45,
        this.x - 45 / 2,
        this.y - 45 / 2,
        45,
        45
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
  }

  update() {
    // check if off screen
    if (this.x + this.sizeX < 0) {
      this.markedForDeletion = true;
    }
  }
}

export class Skill extends Exp {
  image = document.getElementById("skills") as unknown as HTMLImageElement;

  constructor(game: Game, public x: number, public y: number) {
    super(game);
    this.x = x;
    this.y = y;
  }
}
