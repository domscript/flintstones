import { Game } from "./game";

export class Star {
  image = document.getElementById("star") as unknown as HTMLImageElement;
  sizeX = 40;
  sizeY = 40;
  x = 0;
  y = -20;
  collisionRadius = 50;
  markedForDeletion = false;

  constructor(
    public game: Game,
    public targetX: number,
    public targetY: number
  ) {
    this.x = Math.random() * this.game.width;
  }

  update() {
    this.x += (this.targetX - this.x) * 0.05;
    this.y += (this.targetY - this.y) * 0.05;
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.x - this.sizeX * 0.5,
      this.y - this.sizeY * 0.5,
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
}
