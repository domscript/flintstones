import { Game } from "./game";

export enum Control {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Control = "1",
  SuperAttack = "Digit2",
  Shift = "Shift",
  Enter = "Enter",
}

export class InputHandler {
  keys: string[] = [];
  superKeys: { code: string; timeStamp: number; type: string }[] = [];
  constructor(public game: Game) {
    window.addEventListener("keydown", (e) => {
      if (this.keys.includes(e.key)) return;

      switch (e.key) {
        case Control.ArrowDown:
        case Control.ArrowUp:
        case Control.ArrowLeft:
        case Control.ArrowRight:
        case Control.Shift:
        case Control.Enter:
        case Control.Control:
          this.keys.push(e.key);
          break;
        case "d":
          this.game.debug = !this.game.debug;
          break;
        default:
          break;
      }

      if (e.code === Control.SuperAttack) {
        if (!this.keys.includes(e.code)) {
          this.superKeys.push({
            code: e.code,
            timeStamp: e.timeStamp,
            type: e.type,
          });
        }
        if (
          this.superKeys.length > 2 &&
          this.superKeys.every((key) => key.code === e.code) &&
          this.superKeys[this.superKeys.length - 1].timeStamp -
            this.superKeys[0].timeStamp >
            this.game.superTime
        ) {
          this.game.super = [
            this.superKeys[this.superKeys.length - 1].timeStamp -
              this.superKeys[0].timeStamp -
              this.game.superTime,
          ];
        }
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case Control.ArrowDown:
        case Control.ArrowUp:
        case Control.ArrowLeft:
        case Control.ArrowRight:
        case Control.Shift:
        case Control.Enter:
        case Control.Control:
          this.keys = this.keys.filter((el) => !(el === e.key));
          break;
        default:
          break;
      }

      if (e.code === Control.SuperAttack) {
        if (e.timeStamp - this.superKeys[0].timeStamp > 1000)
          this.superKeys = this.superKeys.filter((el) => !(el.code === e.code));
        this.game.super = [-0.1];
      }
    });
  }
}
