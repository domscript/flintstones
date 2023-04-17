import { Game } from "./game";

export class Layer {
  x = 0;
  y = 0;
  image: HTMLImageElement;

  speed: number;

  constructor(
    public game: Game,
    public imageUrl: string,
    public width: number,
    public height: number,
    public speedModifier: number
  ) {
    this.speed = this.game.speed * this.speedModifier;
    this.image = document.getElementById(
      this.imageUrl
    ) as unknown as HTMLImageElement;
  }

  update() {
    if (this.x <= -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(context: CanvasRenderingContext2D) {
    context?.drawImage(this.image, this.x, this.y, this.width, this.height);
    context?.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  readonly width = 2400;
  readonly height = 720;

  readonly backgroundLayers: Layer[];

  constructor(
    readonly game: Game,
    backgroundImages: { imgUrl: string; speedModifier: number }[]
  ) {
    this.backgroundLayers = backgroundImages.map(
      ({
        imgUrl,
        speedModifier,
      }: {
        imgUrl: string;
        speedModifier: number;
      }) => {
        return new Layer(
          this.game,
          imgUrl,
          this.width,
          this.height,
          speedModifier
        );
      }
    );
  }

  update() {
    for (const layer of this.backgroundLayers) {
      layer.update();
    }
  }

  draw(context: CanvasRenderingContext2D) {
    for (const layer of this.backgroundLayers) {
      layer.draw(context);
    }
  }
}

const layer0 = [
  {
    imgUrl: "layer_1",
    speedModifier: 0.2,
  },
  {
    imgUrl: "layer_2",
    speedModifier: 0.4,
  },
  {
    imgUrl: "layer_3",
    speedModifier: 0.6,
  },
  {
    imgUrl: "layer_4",
    speedModifier: 0.8,
  },
  {
    imgUrl: "layer_5",
    speedModifier: 1,
  },
];
const layer1 = [
  {
    imgUrl: "layer_1",
    speedModifier: 0.2,
  },
  {
    imgUrl: "layer_2",
    speedModifier: 0.4,
  },
  {
    imgUrl: "layer_3",
    speedModifier: 0.6,
  },
  {
    imgUrl: "layer_4-1",
    speedModifier: 0.8,
  },
  {
    imgUrl: "layer_5-1",
    speedModifier: 1,
  },
];
const layer2 = [
  {
    imgUrl: "layer_1-1",
    speedModifier: 0.2,
  },
  {
    imgUrl: "layer_2",
    speedModifier: 0.4,
  },
  {
    imgUrl: "layer_3",
    speedModifier: 0.6,
  },
  {
    imgUrl: "layer_3",
    speedModifier: 0.8,
  },
  {
    imgUrl: "layer_5-2",
    speedModifier: 1,
  },
];
export const layers = [layer0, layer1, layer2];
