import React from "react";
import "./App.css";
import {StyleService} from "./services/StyleService";
import {Optional, pauseForMilliseconds} from "./services/Globals";

interface Vector {
  x: number;
  y: number;
}

interface Star {
  position: Vector;
  velocity: Vector;
}

class Animation {
  static framesPerSecond = 30;
  static gravityPerSecond = 550;
}

export interface FallingStarsViewProps {
  numStars: Optional<number>;
  didFinishAnimation: () => void;
}

export class FallingStarsView extends React.Component<FallingStarsViewProps, {}> {

  runningAnimation: boolean = false;

  onScreenStars: Array<Star> = [];
  outerDiv: Optional<HTMLElement>;

  componentDidUpdate(prevProps: Readonly<FallingStarsViewProps>, prevState: Readonly<{}>, snapshot?: any) {
    if (prevProps.numStars != 0 || this.props.numStars == 0 || !this.props.numStars || this.runningAnimation) {
      return;
    }

    this.addStars(this.props.numStars);
  }

  render() {
    return (
      <div className={stylesheet.outerDiv}
           ref={(div) => {this.outerDiv = div;}}>
        {this.onScreenStars.map((star: Star) => {
          return (
            <img className={stylesheet.dot}
                 style={{
                   top: star.position.y,
                   left: star.position.x
                 }}
                 src={'https://upload.wikimedia.org/wikipedia/commons/5/57/FA_star.svg'}/>
          )
        })}
      </div>
    );
  }

  addStar() {
    if (!this.outerDiv) {
      return;
    }

    let clientWidth = this.outerDiv.clientWidth;
    this.onScreenStars.push({
      position: {
        x: Math.random() * clientWidth,
        y: (Math.random() * -500) - 10,
      },
      velocity: {
        x: (Math.random() - 0.5) * 450,
        y: (Math.random() - 0.25) * 150
      }
    });
  }

  async addStars(numStars: number) {
    this.forceUpdate();
    setTimeout(() => {
      this.runStarFallAnimation();
    }, 1000 / Animation.framesPerSecond);

    this.onScreenStars = [];
    for (let i = 1; i < numStars; i++) {
      this.addStar();
      let pauseTime = numStars < 50 ? 25 : numStars < 150 ? 15 : numStars < 300 ? 5 : 2;
      await pauseForMilliseconds(10);
    }
    this.runningAnimation = true;

    this.forceUpdate();
    setTimeout(() => {
      this.runStarFallAnimation();
    }, 1000 / Animation.framesPerSecond);
  }

  async runStarFallAnimation() {
    if (!this.outerDiv) {
      return;
    }

    let clientHeight = this.outerDiv.clientHeight;

    let newStarsArray: Array<Star> = [];
    for (let star of this.onScreenStars) {
      let newStar = {
        position: {
          x: star.position.x + (star.velocity.x / Animation.framesPerSecond),
          y: star.position.y + (star.velocity.y / Animation.framesPerSecond)
        },
        velocity: {
          x: star.velocity.x,
          y: star.velocity.y + (Animation.gravityPerSecond / Animation.framesPerSecond)
        }
      };
      if (newStar.position.y > clientHeight + 50) {
        continue;
      }
      newStarsArray.push(newStar);
    }
    this.onScreenStars = newStarsArray;

    this.forceUpdate();

    if (this.onScreenStars.length == 0) {
      this.runningAnimation = false;
      this.props.didFinishAnimation();
      return;
    }

    setTimeout(() => {
      this.runStarFallAnimation();
    }, 1000 / Animation.framesPerSecond);
  }
}

class Stylesheet {
  outerDiv = {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  };

  dot = {
    position: 'absolute',
    height: 20,
    width: 20,
    transform: 'translate(-50%, -50%)'
  };
}

let stylesheet = StyleService.instance.createStyleSheet(new Stylesheet());
