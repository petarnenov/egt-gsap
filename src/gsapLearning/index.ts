import {
  TweenLite,
  Back,
  Bounce,
  Elastic,
  Expo,
  TweenMax,
  Tween,
  TimelineLite,
  SlowMo,
  Power1,
  TimelineMax,
  Linear,

} from "gsap";
import DivGsap from "./DivGsap";

const logoFirst = TweenLite.to(".first", 4, {
  x: window.innerWidth - 300,
  backgroundColor: "#777",
  border: "1px solid white",
  borderRadius: "20%",
  ease: Back.easeOut,
});
const logoSecond = TweenLite.to(".second", 4, {
  x: window.innerWidth - 300,
  backgroundColor: "#777",
  border: "1px solid white",
  borderRadius: "20%",
  ease: Bounce.easeOut,
});
const logoThird = TweenLite.to(".third", 4, {
  x: window.innerWidth - 300,
  backgroundColor: "#777",
  border: "1px solid white",
  borderRadius: "20%",
  ease: Elastic.easeOut,
});
const logoForth = TweenLite.to(".forth", 6, {
  x: window.innerWidth - 300,
  backgroundColor: "#777",
  border: "1px solid white",
  borderRadius: "20%",
  ease: Expo.easeOut,
  onComplete: logoForthComplete,
  onCompleteParams: ["forth done!!!", Date.now()],
});

//callbacks with parameters
function logoForthComplete(message: string, endTime: number) {
  console.log(endTime);
  //const date = (new Date(0)).setUTCMilliseconds(+endTime)
  const date = new Date(0);
  date.setUTCMilliseconds(endTime);
  console.log(
    `Status: ${message}, startAt: ${date.toLocaleString()}, finishedAt: ${new Date().toLocaleString()}`
  );
}

const myObject = { rotation: 0 };
//const fifth = document.querySelector(".fifth") as DivGsap;
//fifth.rotation=0;
// console.log(fifth);
const logoFifth = TweenLite.to([".fifth", myObject], 2, {
  x: 200,
  rotation: 720,
  transformOrigin: "10% 10%",
  onUpdate: function () {
    console.log(myObject.rotation);
  },
});
const logoSixth = TweenLite.from(".sixth", 3, {
  opacity: 0,
  scale: 0.3,
  ease: Back.easeOut,
});

// const logoStagger = TweenMax.staggerTo(".stagger", 2, { x: 300 }, 2);
//using function to generate random values
const logoStagger = TweenMax.staggerFrom(
  ".stagger",
  2,
  {
    yoyo: true,
    repeat: -1,
    opacity: 0,
    x: function () {
      return Math.random() * 500 - 250;
    },
  },
  2
);

//controlling animation methods
//tween methods name, button should to be in format <button id="btn-<tween method name>" type="button">Name</button>
type nameAlias =
  | "play"
  | "pause"
  | "resume"
  | "reverse"
  | "seek"
  | "timeScale"
  | "kill";
const names: nameAlias[] = [
  "play",
  "pause",
  "resume",
  "reverse",
  "seek",
  "timeScale",
  "kill",
];

names.forEach((name) => {
  const button = document.querySelector(`#btn-${name}`) as HTMLButtonElement;
  button!.addEventListener("click", (e: MouseEvent) => {
    (logoStagger as Tween[]).forEach((tween) => {
      if (name !== "kill") {
        tween[name](0.5);
      } else {
        //tween[name].call(tween);
        //TweenMax.killTweensOf(tween);
        //TweenMax.killAll();
        tween.kill();
        document.querySelectorAll(".stagger").forEach((e) => {
          e.remove();
        });
        console.log("press kill");
      }
    });
  });
});

// function start(this: Tween) {
//   this.play();
// }
// function stop(this: Tween) {
//   this.pause();
// }
// function reverse(this: Tween) {
//   this.reverse();
// }

// const btnStart = document.querySelector("#btn-start") as HTMLButtonElement;
// const btnStop = document.querySelector("#btn-stop") as HTMLButtonElement;
// const btnReverse = document.querySelector("#btn-reverse") as HTMLButtonElement;

// btnStart.addEventListener("click", () => {
//   (logoStagger as Tween[]).forEach((t) => {
//     start.call(t);
//   });
// });
// btnStop.addEventListener("click", () => {
//   (logoStagger as Tween[]).forEach((t) => {
//     stop.call(t);
//   });
// });
// btnReverse.addEventListener("click", () => {
//   (logoStagger as Tween[]).forEach((t) => {
//     reverse.call(t);
//   });
// });

//TimelineLite has no follow properties: repeat, yoyo, ...
const timeLine = new TimelineLite({
  onComplete: () => {
    //fake repeating
    //if label missing , return -1 as position
    // console.log(timeLine.getLabelTime("undefined1"));
    // console.log(timeLine.getLabelTime("undefined2"));
    console.log(timeLine.getLabelTime("begin"));
    console.log(timeLine.getLabelTime("one"));
    console.log(timeLine.getLabelTime("two"));
    console.log(timeLine.getLabelTime("end"));
    //console.log(timeLine.recent());

    //remove label "begin" and tween associate to it from TimelineLite
    const children = timeLine.getChildren(false, true, false);
    const labelTime = timeLine.getLabelTime("begin");
    children.forEach((c) => {
      if (c.startTime() === labelTime) {
        timeLine.remove(c);
      }
    });
    console.log(children);
    timeLine.remove("begin");
    timeLine.play("begin");
  },
});
//timeLine.addLabel("begin", 0);
timeLine
  .to("#tl1", 1, { x: 300, backgroundColor: "0x00ff00" }, "begin")
  //.addLabel("one", 1)
  .to("#tl2", 1, { x: 300 }, "one")
  //.addLabel("two", 2)
  .to("#tl1", 0.25, { rotation: 1080, scale: "+=0.3" }, "two")
  .to("#tl1", 1, { x: 600, ease: Back.easeOut })
  .addLabel("end", "+=0");

// setTimeout(() => {
//   timeLine.play("one");
// }, 5000);

setTimeout(() => {
  timeLine.pause();
}, 10000);

const logoGrey = TweenLite.to(".gray", 4, {
  x: 600,
  y: -200,
  scale: 2,
  skewX: 30,
  rotation: 360,
  skewY: 30,
  opacity: 0.3,
});

const title = TweenLite.from("#title", 2, {
  x: -window.innerWidth / 2,
  scale: 0.5,
  opacity: 0.3,
  ease: Bounce.easeOut,
  color: "0x555555",
});

//##############################################################################
//create boxes
const table = document.createElement("table") as HTMLTableElement;
const tbody = document.createElement("tbody");
for (let i = 0; i < 5; i++) {
  const row = document.createElement("tr");
  for (let j = 0; j < 13; j++) {
    const data = document.createElement("td");
    data.innerHTML = "<div class='box'></div>";
    row.appendChild(data);
  }
  tbody.appendChild(row);
}
table.appendChild(tbody);
document.querySelector("#main")?.appendChild(table);
//##############################################################################

//v2.x.x has no stagger object like in example https://greensock.com/get-started/
//insert custom data into tweens, use latter tween.vars.data...
const myData = {
  createdAt: Date.now(),
};
const boxes = TweenMax.staggerTo(
  ".box",
  1,
  {
    data: myData,
    scale: 0.1,
    yoyo: true,
    repeat: -1,
    y: 10,
    ease: Power1.easeInOut,
    delay: 1,
  },
  0.01
);

//alert(JSON.stringify(boxes[0].vars.data));

//TODO: Getter/Setter methods

const getter = new TimelineMax({
  repeat: -1,
  yoyo: true,
  onUpdate: function (this: TimelineMax) {
    //console.log(getter.progress());
    //console.log(getter.timeScale());
    //console.log(this.getChildren());
    const children = this.getChildren();
    //console.log(children);
    children.forEach((c) => {
      console.log((c as Tween).target[0].style["opacity"]);
      (c as Tween).target[0].style["backgroundColor"];
      //gsap.getProperty((c as Tween).target[0],"x")
    });
  },
});
getter
  .to(".getter", 3, {
    x: 100,
    onUpdate: function (this: TweenLite) {
      console.log("hi");
    },
  })
  .to(".getter", 4, { x: 300, opacity: 0.2 });

console.log(`Time duration: ${getter.duration()}s.`);
//getter.duration(2);

setInterval(() => {
  getter.timeScale(Math.random() * 10);
}, 1000);

//TODO: Getting current values of element's property
//get target[0].style[<property>]

//TODO: Plugins
//Morph commercial
// const slider = document.querySelector("#slider");
// const sliderTL = new TimelineMax({ onUpdate: updateSlider });
// sliderTL.to("#circle", 5, { morphSVG: "#hippo" }, "+=1");

function updateSlider() {}
//Text
TweenMax.to("#myText",2,{text:{value:"new text",newClass:"newText",oldClass:"oldText",padSpace:false},ease:Linear.easeNone,delay:2});
