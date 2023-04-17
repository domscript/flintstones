import "./style.css";
import { Game } from "./game";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  if (ctx) {
    const CANVAS_WIDTH = (canvas.width = 1200);
    const CANVAS_HEIGHT = (canvas.height = 720);

    ctx.fillStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.font = "40px Bangers";
    ctx.textAlign = "center";

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);

    let lastTime = 0;

    function animate(timeStamp: number) {
      const deltaTimeInMilliseconds = timeStamp - lastTime;
      lastTime = timeStamp;
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      game.update(deltaTimeInMilliseconds);
      game.draw(ctx as CanvasRenderingContext2D);

      // if (!game.gamePause) requestAnimationFrame(animate);
      if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
  }
});

// components needs to strong refactor
// ui, playerStates, player, game
