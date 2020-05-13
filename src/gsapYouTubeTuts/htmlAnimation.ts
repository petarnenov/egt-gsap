//https://www.youtube.com/watch?v=v9GK4Rf6w3A
import { TweenLite, Back, TweenMax, TimelineMax, Linear } from "gsap";

const title = document.querySelector("#title");
const logo = document.querySelector(".logo");
const message = document.querySelector("#message");

//TweenMax.to(title!,2,{opacity:0})
// TweenMax.from(title!,5,{opacity:0})
// TweenMax.from(logo!,2,{opacity:0,scale:0})

const tl = new TimelineMax();
tl.timeScale(0.5)
tl.add("begin");
tl.from(logo!, 3, { scale: 0, opacity: 0, ease: Back.easeOut }, "begin +=0.05")
  .from(title!, 2, { opacity: 0, ease: Linear.easeNone }, "begin")
  .from(message!, 2, { opacity: 0, scale: 2 });

const text = document.querySelectorAll("p");

TweenMax.staggerFrom(text,0.4,{ease:Back.easeOut,opacity:0,scale:0,y:80},0.1)