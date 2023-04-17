import { Game } from "./game";

abstract class Ground {
  image: HTMLImageElement;
  constructor(
    public game: Game,
    public y: number,
    public x: number,
    public x2: number,
    public idImg: string
  ) {
    this.image = document.getElementById(
      this.idImg
    ) as unknown as HTMLImageElement;
  }
  draw(context: CanvasRenderingContext2D) {
    this.drawPlate(context);
    this.x -= this.game.speed;
    this.x2 -= this.game.speed;
  }
  drawPlate(context: CanvasRenderingContext2D) {
    if (this.game.debug) {
      context.beginPath();
      context.strokeRect(this.x, this.y, this.x2 - this.x, 5);
      context.stroke();
    }
  }
}

export class Home extends Ground {
  sizeX = 334;
  sizeY = 167;
  markedForDeletion = false;

  coef = 3;
  collisionRadius = 2;

  constructor(game: Game, y: number, x: number, x2: number, idImg: string) {
    super(game, y, x, x2, idImg);
  }

  draw(context: CanvasRenderingContext2D) {
    super.draw(context);
    context.drawImage(
      this.image,
      this.x,
      this.y + this.coef,
      this.sizeX,
      this.sizeY
    );

    this.drawPlate(context);

    if (this.game.debug) {
      context.beginPath();
      context.arc(this.x, this.y, this.collisionRadius, 0, Math.PI * 2);
      context.arc(
        this.x + this.sizeX,
        this.y,
        this.collisionRadius,
        0,
        Math.PI * 2
      );
      context.save();
      context.globalAlpha = 0.3;
      context.fill();
      context.restore();
      context.stroke();
    }
  }

  update() {
    // check if off screen
    if (this.x + this.sizeX < 0) {
      this.markedForDeletion = true;
    }
  }
}
