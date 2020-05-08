//following this tutorial
//https://www.youtube.com/watch?v=tMP1PCErrmE
import { TweenMax, Back, Elastic, Bounce, TimelineMax } from "gsap";

//animate h1
const tweenHeader1 = TweenMax.from("h1", 2, {
  opacity: 0,
  color: "gray",
});

//units in "40%"
const tweenFirst = TweenMax.to(".first", 5, {
  left: 0,
  backgroundColor: "#aaa",
  padding: 20,
  border: "2px solid 'black'",
  borderRadius: 30,
  rotation: 360,
  scale: 0.7,
});
const tweenSecond = TweenMax.to(".second", 3, {
  left: 0,
  ease: Back.easeInOut,
});
const tweenThird = TweenMax.to(".third", 3, {
  left: 0,
  ease: Elastic.easeInOut,
});
const tweenForth = TweenMax.from(".forth", 3, {
  left: 0,
  ease: Bounce.easeInOut,
});
const tweenFifth = TweenMax.from(".fifth", 0.5, {
  scale: 0,
  opacity: 0,
  ease: Bounce.easeOut,
});

const tweenBox = TweenMax.from(".box", 0.5, { opacity: 0, y: 200, delay: 1 });
const tweenBoxSecond = TweenMax.staggerFrom(
  ".boxSecond",
  0.5,
  { opacity: 0, y: function(){return Math.random()*300}, rotation: 1080 },
  0.25
);
const tweenFadeout = TweenMax.to(".box,.boxSecond", 1, {
  opacity: 0,
  delay: 2,
  onComplete: showAlert,
});

const t1 = new TimelineMax({ onUpdate: updateSlider });
t1
.to("h1", 2, { opacity: 0, ease: Back.easeOut, delay: 1,repeat:3 })
.to(".box", 2, {
  scale: 0.5,
  opacity: 1,
});

function updateSlider() {
  console.log(t1.progress());
  //t1.pause(0.99);
}

function showAlert() {
  //alert("All done!")
  console.log("all complete...");
}
