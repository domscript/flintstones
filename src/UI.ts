import { Game } from "./game";

const IMAGE_LIVES = "lives";
const IMAGE_LIVES_EMPTY = "lives_empty";
const IMAGE_POW = "pow";
const IMAGE_POW_EMPTY = "pow_empty";
const IMAGE_POWER = "power";
const IMAGE_NUMBERS = "numbers";
const IMAGE_SKILLS = "skills";
const IMAGE_PIGGY = "piggy";
const IMAGE_MAC = "mac";
const IMAGE_TABLO = "overlay";

const SIZE_X = 40;
const SIZE_Y = 40;
const FONT_SIZE = 40;
const FONT_FAMILY = "Bangers";

export class UI {
  private imageLives = document.getElementById(IMAGE_LIVES) as HTMLImageElement;
  private imageLivesEmpty = document.getElementById(
    IMAGE_LIVES_EMPTY
  ) as HTMLImageElement;
  private imageShild = document.getElementById(IMAGE_POW) as HTMLImageElement;
  private imageShildEmpty = document.getElementById(
    IMAGE_POW_EMPTY
  ) as HTMLImageElement;
  private imagePower = document.getElementById(IMAGE_POWER) as HTMLImageElement;
  private imageNumbers = document.getElementById(
    IMAGE_NUMBERS
  ) as HTMLImageElement;
  private imageSkills = document.getElementById(
    IMAGE_SKILLS
  ) as HTMLImageElement;
  private imagePiggy = document.getElementById(IMAGE_PIGGY) as HTMLImageElement;
  private imageMac = document.getElementById(IMAGE_MAC) as HTMLImageElement;
  private tablo = document.getElementById(IMAGE_TABLO) as HTMLImageElement;

  i = 0;
  j = 0;
  text1 = "";
  text2 = "";
  ip = 0;
  jp = 0;
  text1p = "";
  text2p = "";
  ij = 0;
  jj = 0;
  text1j = "";
  text2j = "";
  it = 0;
  jt = 0;
  text1t = "";
  text2t = "";
  il = 0;
  jl = 0;
  text1l = "";
  text2l = "";
  timeL = 0;
  ir = 0;
  jr = 0;
  text1r = "";
  text2r = "";
  timeR = 0;

  constructor(public game: Game) {}

  draw(context: CanvasRenderingContext2D) {
    this.drawTablo(context);
    this.drawLivesIcons(context);
    this.drawHeartIcons(context);
    this.drawShieldIcons(context);
    this.drawPowerIcons(context);
    this.drawSkillsIcons(context);
    this.drawPiggyIcon(context);
    this.drawMacIcon(context);

    // draw status text
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "#fff";
    context.shadowBlur = 0;
    context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    context.fillText(`Time: ${(this.game.time * 0.001).toFixed(1)}`, 25, 50);
    this.messageGameOver(context);
    this.messageFirstProgramm(context);
    this.messageFirstJobInfo(context);
    this.messageTeamWinner(context);
    this.messageLochmanImrovement(context);
    this.messageBriteFuture(context);
    this.messageGameWon(context);
    this.debugInfo(context);
    context.restore();
  }

  drawTablo(context: CanvasRenderingContext2D): void {
    context.drawImage(this.tablo, 0, 0, this.game.width, this.game.height);
  }

  drawHeartIcons(context: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.game.livesMax; i++) {
      if (i < this.game.lives) {
        context.drawImage(
          this.imageLives,
          350 + i * SIZE_X,
          602 - SIZE_Y,
          SIZE_X,
          SIZE_Y
        );
      } else {
        context.drawImage(
          this.imageLivesEmpty,
          350 + i * SIZE_X,
          602 - SIZE_Y,
          SIZE_X,
          SIZE_Y
        );
      }
    }
  }

  drawShieldIcons(context: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.game.shieldMax; i++) {
      if (i < this.game.shield) {
        context.drawImage(
          this.imageShild,
          884 + i * SIZE_X,
          685 - SIZE_Y,
          SIZE_X,
          SIZE_Y
        );
      } else {
        context.drawImage(
          this.imageShildEmpty,
          884 + i * SIZE_X,
          685 - SIZE_Y,
          SIZE_X,
          SIZE_Y
        );
      }
    }
  }

  drawPowerIcons(context: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.game.burgerMax; i++) {
      if (i < this.game.burger) {
        context.drawImage(
          this.imagePower,
          884 + i * SIZE_X,
          639 - SIZE_Y,
          SIZE_X,
          SIZE_Y
        );
      }
    }
    context.save();
    context.fillStyle = "white";
    context.globalAlpha = 0.6;
    context.fillRect(884, 639 - SIZE_X, this.game.strength * SIZE_X, SIZE_Y);
    context.restore();
  }

  drawPiggyIcon(context: CanvasRenderingContext2D): void {
    if (this.game.piggy && !this.game.mac) {
      context.drawImage(
        this.imagePiggy,
        690 + SIZE_X,
        615 - SIZE_Y,
        SIZE_X * 2.5,
        SIZE_Y * 2.5
      );
    }
  }

  drawMacIcon(context: CanvasRenderingContext2D): void {
    if (this.game.mac) {
      context.drawImage(this.imageMac, 682 + SIZE_X, 600 - SIZE_Y, 120, 120);
    }
  }

  drawSkillsIcons(context: CanvasRenderingContext2D): void {
    const skillName = this.game.doneSkills;
    if (skillName.length) {
      skillName.forEach((name) => {
        const { x, y } = this.game.ganeSkills[name];
        const scale = 0.91;
        context.drawImage(
          this.imageSkills,
          x,
          y,
          45,
          45,
          33 + x * scale,
          604 + y * scale,
          45 * scale,
          45 * scale
        );
      });
    }
  }

  debugInfo(context: CanvasRenderingContext2D): void {
    if (this.game.debug) {
      context.textAlign = "left";

      context.fillText(`skills: ${this.game.skills.length}`, 25, 150);
      context.fillText(`Particles: ${this.game.particles.length}`, 25, 200);
      context.fillText(`Perks: ${this.game.perks.length}`, 25, 250);
      context.fillText(`Barrels: ${this.game.barrels.length}`, 25, 300);
      context.fillText(`Burger: ${this.game.burger}`, 25, 350);
      context.textAlign = "right";
      context.fillText(
        `Enemy lives: ${this.game.enemies[0]?.lives}`,
        this.game.width - 25,
        50
      );
      context.fillText(
        `kill time: ${(this.game.player.killTime * 0.001).toFixed(1)}`,
        this.game.width - 25,
        100
      );
      context.fillText(
        `strength: ${(this.game.burger + this.game.strength).toFixed(1)}`,
        this.game.width - 25,
        150
      );
    }
  }

  drawLivesIcons(context: CanvasRenderingContext2D): void {
    let first, second;
    const r = 32;
    if (this.game.live < 10) {
      [first, second] = "0" + this.game.live.toString();
    } else {
      [first, second] = this.game.live.toString().split("");
    }
    context.drawImage(
      this.imageNumbers,
      +first * r,
      0,
      r,
      r,
      75 + 1 * SIZE_X,
      599 - SIZE_Y,
      SIZE_X,
      SIZE_Y
    );
    context.drawImage(
      this.imageNumbers,
      +second * r,
      0,
      r,
      r,
      79 + 2 * SIZE_X,
      599 - SIZE_Y,
      SIZE_X,
      SIZE_Y
    );
  }

  messageFirstProgramm(context: CanvasRenderingContext2D): void {
    if (this.game.programm1 && !this.game.graduate) {
      context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
      this.game.letterTime += this.game.deltaTime * 4;
      const message1 = "For my first program at university!".split("");
      const message2 = "I could buy couple new computers!".split("");
      if (this.game.letterTime > this.game.letterTimer) {
        this.game.letterTime = 0;

        if (this.ip < message1.length) {
          this.text1p += message1[this.ip];
          this.ip += 1;
        } else if (this.jp < message2.length) {
          this.text2p += message2[this.jp];
          this.jp += 1;
        } else {
          this.ip = 0;
          this.text1p = "";
          this.jp = 0;
          this.text2p = "";
        }
      }
      context.textAlign = "left";

      context.fillText(
        this.text1p,
        this.game.width * 0.4,
        this.game.height / 9
      );
      context.fillText(
        this.text2p,
        this.game.width * 0.4,
        this.game.height / 9 + FONT_SIZE * 1.5
      );
      context.textAlign = "center";
    }
  }

  messageFirstJobInfo(context: CanvasRenderingContext2D): void {
    if (this.game.perfolenta && !this.game.teamwin) {
      context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
      this.game.letterTime += this.game.deltaTime * 4;
      const message1 = "First job! They still use it:".split("");
      const message2 = `even in ${new Date().getFullYear()}!`.split("");
      if (this.game.letterTime > this.game.letterTimer) {
        this.game.letterTime = 0;

        if (this.ij < message1.length) {
          this.text1j += message1[this.ij];
          this.ij += 1;
        } else if (this.jj < message2.length) {
          this.text2j += message2[this.jj];
          this.jj += 1;
        } else {
          this.ij = 0;
          this.text1j = "";
          this.jj = 0;
          this.text2j = "";
        }
      }
      context.textAlign = "left";

      context.fillText(
        this.text1j,
        this.game.width * 0.4,
        this.game.height / 9
      );
      context.fillText(
        this.text2j,
        this.game.width * 0.4,
        this.game.height / 9 + FONT_SIZE * 1.5
      );
      context.textAlign = "center";
    }
  }

  messageTeamWinner(context: CanvasRenderingContext2D): void {
    if (this.game.teamwin && !this.game.lochman) {
      context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
      this.game.letterTime += this.game.deltaTime * 4;
      const message1 = "Our team! Won competition".split("");
      const message2 = `in regions with a population of 10M people  `.split("");
      if (this.game.letterTime > this.game.letterTimer) {
        this.game.letterTime = 0;

        if (this.it < message1.length) {
          this.text1t += message1[this.it];
          this.it += 1;
        } else if (this.jt < message2.length) {
          this.text2t += message2[this.jt];
          this.jt += 1;
        } else {
          this.it = 0;
          this.text1t = "";
          this.jt = 0;
          this.text2t = "";
        }
      }
      context.textAlign = "left";

      context.fillText(
        this.text1t,
        this.game.width * 0.4,
        this.game.height / 9
      );
      context.fillText(
        this.text2t,
        this.game.width * 0.4,
        this.game.height / 9 + FONT_SIZE * 1.5
      );
      context.textAlign = "center";
    }
  }

  messageLochmanImrovement(context: CanvasRenderingContext2D): void {
    if (this.game.lochman && this.timeL < 3000) {
      context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
      this.game.letterTime += this.game.deltaTime * 4;
      this.timeL += this.game.deltaTime;
      const message1 = "I took part in improvement of".split("");
      const message2 = `the first nationwide CRM for machine factories`.split(
        ""
      );
      if (this.game.letterTime > this.game.letterTimer) {
        this.game.letterTime = 0;

        if (this.il < message1.length) {
          this.text1l += message1[this.il];
          this.il += 1;
        } else if (this.jl < message2.length) {
          this.text2l += message2[this.jl];
          this.jl += 1;
        } else {
          this.il = 0;
          this.text1l = "";
          this.jl = 0;
          this.text2l = "";
        }
      }
      context.textAlign = "left";

      context.fillText(
        this.text1l,
        this.game.width * 0.4,
        this.game.height / 9
      );
      context.fillText(
        this.text2l,
        this.game.width * 0.4,
        this.game.height / 9 + FONT_SIZE * 1.5
      );
      context.textAlign = "center";
    }
  }

  messageBriteFuture(context: CanvasRenderingContext2D): void {
    if (this.game.rocket && this.timeR < 3000) {
      context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
      this.game.letterTime += this.game.deltaTime * 4;
      this.timeR += this.game.deltaTime;
      const message1 = "I belive in".split("");
      const message2 = `Brite future of humankind!      `.split("");
      if (this.game.letterTime > this.game.letterTimer) {
        this.game.letterTime = 0;

        if (this.ir < message1.length) {
          this.text1r += message1[this.ir];
          this.ir += 1;
        } else if (this.jr < message2.length) {
          this.text2r += message2[this.jr];
          this.jr += 1;
        } else {
          this.ir = 0;
          this.text1r = "";
          this.jr = 0;
          this.text2r = "";
        }
      }
      context.textAlign = "left";

      context.fillText(
        this.text1r,
        this.game.width * 0.4,
        this.game.height / 9
      );
      context.fillText(
        this.text2r,
        this.game.width * 0.4,
        this.game.height / 9 + FONT_SIZE * 1.5
      );
      context.textAlign = "center";
    }
  }

  messageGameWon(context: CanvasRenderingContext2D): void {
    if (this.game.gameWon) {
      context.textAlign = "center";
      context.font = `${FONT_SIZE * 2}px ${FONT_FAMILY}`;
      context.fillText(
        `Boo-Yaah ... You won!!!`,
        this.game.width / 2,
        this.game.height / 3
      );
      context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;

      this.game.letterTime += this.game.deltaTime;
      const message1 = "Thank you for your time!".split("");
      const message2 = "Programmer: Dominic Nosikov".split("");
      if (this.game.letterTime > this.game.letterTimer) {
        this.game.letterTime = 0;

        if (this.i < message1.length) {
          this.text1 += message1[this.i];
          this.i += 1;
        } else if (this.j < message2.length) {
          this.text2 += message2[this.j];
          this.j += 1;
        } else {
          this.i = 0;
          this.text1 = "";
          this.j = 0;
          this.text2 = "";
        }
      }
      context.textAlign = "left";

      context.fillText(this.text1, this.game.width * 0.3, this.game.height / 9);
      context.fillText(
        this.text2,
        this.game.width * 0.3,
        this.game.height / 9 + FONT_SIZE * 1.5
      );
      context.textAlign = "center";
    }
  }

  messageGameOver(context: CanvasRenderingContext2D): void {
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = `${FONT_SIZE * 2}px ${FONT_FAMILY}`;

      context.fillText(`Ooops`, this.game.width / 2, this.game.height / 2);
      context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
      context.fillText(
        `You lost`,
        this.game.width / 2,
        this.game.height / 2 + FONT_SIZE * 2
      );
      context.fillText(
        `⬅︎ ➡︎ ⇧ ⇩, 1, 2, Shift, Enter`,
        this.game.width / 2,
        100
      );
    }
  }
}
