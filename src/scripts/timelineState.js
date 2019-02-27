export default class TimelineState {
  constructor() {
    let previousIndex = -1;
    this.getPreviousIndex = function() {
      return previousIndex;
    };
    this.setPreviousIndex = function(newIndex) {
      previousIndex = newIndex;
    };
    let animationInProgress = false;
    this.animationIsInProgress = function() {
      return animationInProgress;
    };
    this.setAnimationState = function(newState) {
      animationInProgress = newState;
    };
  }
}