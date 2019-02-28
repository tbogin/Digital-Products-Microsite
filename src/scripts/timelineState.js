export default class TimelineState {
  constructor() {
    let previousIndex = -1;
    this.getPreviousIndex = function() {
      return previousIndex;
    };
    this.setPreviousIndex = function(newIndex) {
      previousIndex = newIndex;
    };
    let newIndex = 0;
    this.getNewIndex = function() {
      return newIndex;
    };
    this.setNewIndex = function(index) {
      newIndex = index;
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