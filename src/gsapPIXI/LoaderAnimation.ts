import { TimelineMax, Back, Power0, TimelineLite } from "gsap";

export default class LoaderAnimation {
  private loader = document.createElement("div");
  private circles: HTMLDivElement[] = [];
  private animationLoading: TimelineMax = new TimelineMax({
    paused: true,
    repeat: 2,
    onComplete: this.completeLoading.bind(this), //context binding to instance of LoaderAnimation class
  });
  private animationDone: TimelineLite = new TimelineLite({ paused: true });
  constructor(private circleNumbers: number) {
    this.loader.id = "loader";
    this.loader.style.visibility = "hidden";
    for (let i = 0; i < circleNumbers; i++) {
      const div = document.createElement("div");
      div.classList.add("dot");
      this.circles.push(div);
      this.loader.appendChild(div);
    }
    document.body.appendChild(this.loader);
    this.createAnimation();
  }
  private createAnimation() {
    this.animationLoading
      .staggerFromTo(
        this.circles,
        0.3,
        { y: 0, autoAlpha: 0 },
        { y: 20, autoAlpha: 1, ease: Back.easeOut },
        0.05
      )
      .fromTo(
        this.loader,
        0.3,
        { autoAlpha: 1, scale: 1.3 },
        { autoAlpha: 0, scale: 1, ease: Power0.easeNone },
        0.9
      );

    this.animationDone
      .set(this.circles, { autoAlpha: 1, backgroundColor: "0x993300" })
      .to(this.loader, 0.3, { autoAlpha: 1, scale: 1.3 })
      .to(
        this.loader,
        0.3,
        { y: -150, autoAlpha: 0, ease: Back.easeOut },
        "+=0.3"
      )
      .set(this.circles,{backgroundColor: 0xffffff})
      .set(this.loader,  { y: 0});
  }
  private completeLoading() {
    //console.log(this);
    this.animationDone.restart();
  }
  play() {
    this.animationLoading.pause();
    // this.loader.style.position = "absolute";
    // this.loader.style.transform = "translate(-50%,50%)";
    // this.loader.style.top = "90%";
    // this.loader.style.left = "50%";
    this.animationLoading.restart();
  }
  getTimeLines(){
      return {
          loading:this.animationLoading,
          done:this.animationDone
      }
  }
}
