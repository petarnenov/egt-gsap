import {
  TweenMax,
  TweenLite,
  TimelineLite,
  TimelineMax,
  Linear,
  Power1,
  Power0,
} from "gsap";
import { Circle } from "pixi.js";

//SVG and GreenSock for Complex Animation - Forward 4 Web Summit
//https://www.youtube.com/watch?v=ZNukcHhpSXg
const boxes = document.querySelectorAll(".tween");

function revolve() {
  const tl = new TimelineMax();
  tl.add("begin");
  tl.to(
    boxes,
    4,
    {
      transformOrigin: "50% 50%",
      rotation: 720,
      left: "100%",
      xPercent: -100,
      ease: Linear.easeNone,
    },
    "begin"
  );
  return tl;
}

//set repeats and yoyo effect
const repeat = new TimelineMax({ repeat: -1, yoyo: true });
repeat.add(revolve());

//https://greensock.com/position-parameter
const c1 = document.querySelector(".position1");
const c2 = document.querySelector(".position2");
const c3 = document.querySelector(".position3");

const resumeBtn = document.querySelector("#btn-resume");
const stopBtn = document.querySelector("#btn-stop");

const line = document.querySelector("#line");
const pathMaster = document.querySelector("#pathMaster");
const pathModify = document.querySelector("#pathModify");

const tlPosition = new TimelineMax({ repeat: -1, yoyo: true });
tlPosition
  //second start at 0.7 second after beginning
  .add("second", 0.7)
  .to(c1!, 1, { x: 200, ease: Power0.easeNone }, "first")
  .to(c2!, 1, { x: 200, ease: Power0.easeNone }, "second")
  //relative to previous with "<" didn't work in v2
  .to(c3!, 1, { x: 200, ease: Power0.easeNone, opacity: 0.3 }, "second+=0.3");

stopBtn?.addEventListener("click", (e: Event) => {
  e.preventDefault();
  tlPosition.pause();
});

resumeBtn?.addEventListener("click", (e: Event) => {
  e.preventDefault();
  tlPosition.play();
});

const points = [
  100,
  350,
  200,
  100,
  300,
  350,
  400,
  150,
  500,
  350,
  600,
  200,
  700,
  350,
];

//line?.setAttribute("points", points.join());
pathMaster?.setAttribute("d", "M " + points.join(" "));
pathModify?.setAttribute("d", solve(points, 3));

//https://www.youtube.com/watch?v=ZNukcHhpSXg 34:21
function solve(data: number[], curveDisplacement = 6) {
  curveDisplacement = curveDisplacement ^ 0;
  if (!curveDisplacement) curveDisplacement = 1;
  const size = data.length;
  const last = size - 4;
  let path = "M" + [data[0], data[1]];
  for (let i = 0; i < size - 2; i += 2) {
    const x0 = i ? data[i - 2] : data[0];
    const y0 = i ? data[i - 1] : data[1];

    const x1 = data[i + 0];
    const y1 = data[i + 1];

    const x2 = data[i + 2];
    const y2 = data[i + 3];

    const x3 = i !== last ? data[i + 4] : x2;
    const y3 = i !== last ? data[i + 5] : y2;

    const ep1x = (-x0 + curveDisplacement * x1 + x2) / curveDisplacement;
    const ep1y = (-y0 + curveDisplacement * y1 + y2) / curveDisplacement;

    const ep2x = (x1 + curveDisplacement * x2 - x3) / curveDisplacement;
    const ep2y = (y1 + curveDisplacement * y2 - y3) / curveDisplacement;

    path += "C" + [ep1x, ep1y, ep2x, ep2y, x2, y2];
  }
  return path;
}

//https://greensock.com/docs/v2/Plugins/BezierPlugin
const ball = document.querySelector(".ball");

const bezierPoints = createBezierPoint(points);
//console.log(bezierPoints);
const tl = new TimelineMax({ repeat: -1, yoyo: true });
tl.set(ball!, { x: 70, y: 390, opacity: 0.5 }).to(ball!, 10, {
  bezier: { type: "thru", curviness: 1.9, values: bezierPoints },
  ease: Linear.easeNone,
});

type bPoint = { x: number; y: number };
function createBezierPoint(data: number[]) {
  let bezierPoints: bPoint[] = [];
  const size = data.length;
  for (let i = 0; i < size; i += 2) {
    const point: bPoint = {
      x: data[i],
      y: data[i + 1],
    };
    bezierPoints.push(point);
  }
  return bezierPoints;
}
