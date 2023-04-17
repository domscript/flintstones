export class FloatingMessage {
  markedForDeletion = false;
  timer = 0;

  fontSize = 20;
  fontFamily = "Bangers";

  constructor(
    public value: string,
    public x: number,
    public y: number,
    public targetX: number,
    public targetY: number
  ) {}

  update() {
    this.x += (this.targetX - this.x) * 0.03;
    this.y += (this.targetY - this.y) * 0.03;
    this.timer++;
    if (this.timer > 100) this.markedForDeletion = true;
  }
  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.fillStyle = "#fff";
    context.fillText(this.value, this.x, this.y);
    context.fillStyle = "#000";
    context.fillText(this.value, this.x + 2, this.y + 2);
    context.restore();
  }
}
