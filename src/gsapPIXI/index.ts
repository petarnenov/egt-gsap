import { Application, Sprite, Graphics, Texture } from "pixi.js";
import { TweenLite, Linear, Back, TweenMax, TimelineMax, Power0 } from "gsap";

const app = new Application({
  antialias: true,
  resolution: 1,
  autoStart: false,
  backgroundColor: 0x0275d8,
});

document.body.append(app.view);

const logoTexture = Texture.fromImage("assets/logo3.png");
const sprite = new Sprite(logoTexture);
sprite.anchor.set(0.5);
sprite.position.set(0, 300);

const g = new Graphics();
g.beginFill(0x5bc0de, 1);
g.drawRect(0, 0, 200, 100);
g.endFill();

app.stage.addChild(g);

app.stage.addChild(sprite);

app.start();

const logo = TweenMax.to(sprite, 3, {
  pixi: { x: 300, rotation: 360, scaleX: 2, scaleY: 2, blurX: 10, blurY: 10 },
  ease: Linear.easeOut,
  repeat: -1,
  yoyo: true,
});
const rectangle = TweenMax.to(g, 5, {
  pixi: { x: 500, alpha: 0.4, fillColor: "#5bc0de" },
  ease: Back.easeOut,
  repeat: -1,
  yoyo: true,
});

//https://ihatetomatoes.net/module-1/g101-timelinemax-vs-timelinelite-p2-0716/
const dot = document.querySelectorAll(".dot");
const loader = document.querySelector("#loader");

const tlLoader = new TimelineMax({ paused: true, repeat: -1 });

tlLoader
  .staggerFromTo(
    dot,
    0.3,
    { y: 0, autoAlpha: 0 },
    { y: 20, autoAlpha: 1, ease: Back.easeOut },
    0.05
  )
  .fromTo(
    loader!,
    0.3,
    { autoAlpha: 1, scale: 1.3 },
    { autoAlpha: 0, scale: 1, ease: Power0.easeNone },
    0.9
  );

tlLoader.restart();
