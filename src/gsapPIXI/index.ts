import { Application, Sprite, Graphics, Texture } from "pixi.js";
import {
  TweenLite,
  Linear,
  Back,
  TweenMax,
  TimelineMax,
  Power0,
  TimelineLite,
  Power2,
  Bounce,
} from "gsap";
import LoaderAnimation from "./LoaderAnimation";

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
// const dot = document.querySelectorAll(".dot");
// const loader = document.querySelector("#loader");

// const tlLoader = new TimelineMax({ paused: true, repeat: 2,onComplete: onComplete });

// tlLoader
//   .staggerFromTo(
//     dot,
//     0.3,
//     { y: 0, autoAlpha: 0 },
//     { y: 20, autoAlpha: 1, ease: Back.easeOut },
//     0.05
//   )
//   .fromTo(
//     loader!,
//     0.3,
//     { autoAlpha: 1, scale: 1.3 },
//     { autoAlpha: 0, scale: 1, ease: Power0.easeNone },
//     0.9
//   );

// tlLoader.restart();

// function onComplete(){
//   const tl = new TimelineLite();
//   tl.set(dot,{autoAlpha:1,backgroundColor:"0x993300"})
//   .to(loader!,0.3,{autoAlpha:1,scale:1.3})
//   .to(loader!,0.3,{y:-150,autoAlpha:0,ease:Back.easeIn},"+=0.3")
// }

const loaderAnimation = new LoaderAnimation(7);
loaderAnimation.play();
setTimeout(() => {
  loaderAnimation.play();
}, 5000);

const tls = loaderAnimation.getTimeLines();
console.log(tls.loading.duration());
console.log(tls.done.duration());

const boxCSS = document.querySelector("#css-box");
//const tweenBoxCSS = TweenMax.to(boxCSS!,3,{x:"200%",y:"200%",ease:Power2.easeInOut})

const boxSVG = document.querySelector("#svg-box");
//const tweenBocSVG = TweenMax.to(boxSVG!,1,{x:"100%",y:"100%",ease:Power2.easeInOut})

const circleSVG = document.querySelector("#svg-circle");
//const tweenCircleSVG = TweenMax.to(circleSVG!,1,{attr:{cx:0,cy:0}})

const tl = new TimelineMax();

tl.to(boxCSS!, 2, { left: "50%", top: "50%", ease: Power2.easeInOut })
  .to(boxSVG!, 2, { left: "30%", top: "50%", ease: Power2.easeInOut })
  .to(boxCSS!, 2, { x: "100%", ease: Power2.easeInOut })
  .to(boxSVG!, 2, { xPercent: -100, ease: Power2.easeInOut })
  .to(circleSVG!, 2, { attr: { cx: 10, cy: 10 }, ease: Power2.easeInOut })
  .to(boxSVG!, 2, {
    rotation: 90,
    transformOrigin: "100% 100%",
    ease: Bounce.easeOut,
  })
  .to([boxCSS, boxSVG], 2, {
    rotation: 720,
    transformOrigin: "50% 50%",
    ease: Power2.easeInOut,
  })
  .to(boxCSS!, 0.7, {
    rotationX: -180,
    transformOrigin: "0% 50%",
    ease: Power2.easeInOut,
  });

//https://www.youtube.com/watch?v=J5twQLXJ-vQ
//x vs xPercent
//left ,top, bottom ,right => container dimensions
//xPercent, yPercent => element dimensions
const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");

TweenMax.to(box1!, 2, { x: 100, ease: Power2.easeOut });
TweenMax.to(box2!, 2, { x: "100%",ease: Power2.easeOut });
TweenMax.to(box3!, 2, { xPercent: "50%",ease: Power2.easeOut, force3D:true});
