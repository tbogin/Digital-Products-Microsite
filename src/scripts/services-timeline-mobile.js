import { colors } from './constants';
import TimelineState from './timelineState';
import anime from 'animejs';

// get refs to useful collections RENAME
const $circles = $('.timeline-mobile .circle');
const $lineSegmentHighlights = $('.timeline-mobile .line-segment .line-segment-highlight');
const $labels = $('.timeline-labels-mobile .timeline-label');

// set default duration & easing
const duration = 100;
const labelAnimationDuration = 50;
const easing = 'linear';

// initialize timeline state
const timelineState = new TimelineState();

$(document).ready(function() {
  /* Partial animation functions */
  function animateStartingLabel(animeTimeline) {
    const startingLabel = [...$labels][timelineState.getPreviousIndex()];
    animeTimeline.add({
      targets: startingLabel,
      duration: labelAnimationDuration,
      easing,
      complete: () => {
        $(startingLabel).removeClass('current');
      }
    });
  }

  function animateStartingCircle(animeTimeline, diff) {
    const startingCircle = [...$circles][timelineState.getPreviousIndex()];
    animeTimeline.add({
      targets: startingCircle,
      background: colors.brandPrimaryDark,
      duration,
      easing
    });
    if (diff < 0) {
      animeTimeline.add({
        targets: startingCircle,
        borderColor: colors.brandGrayDark,
        duration, 
        easing
      });
    }    
  }

  function getElemsToModify(jQueryCollection, previousIndex, newIndex, diff) {
    let elemsToModify = [...jQueryCollection];
    elemsToModify = elemsToModify.filter((elem, index) => {
      if (diff >= 0) {
        return (index > previousIndex && index <= newIndex);
      } else {
        return (index <= previousIndex && index > newIndex);
      }
    });
    if (diff < 0) {
      elemsToModify.reverse();
    }
    return elemsToModify;
  }

  function animateLineSegmentsAndCircles(animeTimeline, previousIndex, newIndex, diff) {
    const newHeight = (diff > 0) ? '100%' : 0;
    const oldBorderColor = (diff < 0) ? colors.brandPrimary : colors.grayDark;
    const newBorderColor = (diff < 0) ? colors.grayDark : colors.brandPrimary;
  
    const circlesToModify = getElemsToModify($circles, previousIndex, newIndex, diff);
    const lineSegmentsToModify = getElemsToModify($lineSegmentHighlights, previousIndex, newIndex, diff);

    console.log('diff', diff);
    console.log('prev index', previousIndex);

    // loop through circles & line segments, adding an appropriate animation for each to the timeline
    for (let i = 0; i < circlesToModify.length; i++) {
      const segment = lineSegmentsToModify[i];
      const circle = circlesToModify[i];
      if (diff > 0) {
        animeTimeline.add({
          targets: segment,
          height: newHeight,
          duration,
          easing
        });
        animeTimeline.add({
          targets: circle,
          borderColor: [oldBorderColor, newBorderColor],
          duration,
          easing
        });
      } else {
        animeTimeline.add({
          targets: circle,
          borderColor: [oldBorderColor, newBorderColor],
          duration,
          easing
        });
        animeTimeline.add({
          targets: segment,
          height: newHeight,
          duration,
          easing
        });
      }
    }
  }

  function animateEndingCircle(animeTimeline, newIndex) {
    const endingCircle = [...$circles][newIndex];
    const oldBackgroundColor = $(endingCircle).hasClass('hover-state') ? colors.white : colors.brandPrimaryDark;
    animeTimeline.add({
      targets: endingCircle,
      background: [oldBackgroundColor, colors.brandPrimary],
      duration,
      easing
    });
  }

  function animateEndingLabel(animeTimeline, newIndex) {

    const offset = 0;   // absolute offset in ms w/ ref to beginning of timeline
    const endingLabel = [...$labels][newIndex];
    animeTimeline.add({
      targets: endingLabel,
      fontSize: '1.25rem',
      duration: labelAnimationDuration,
      easing,
      complete: () => {
        $(endingLabel).addClass('current');
      }
    }, offset);
  }
  /* End partial animation functions */

  /* Main timeline control function, called on click events */
  function selectTimelineStop(newIndex) {
    // prevent new animation while a previous animation is still in progress
    if (timelineState.animationIsInProgress()) { return; }

    const previousIndex = timelineState.getPreviousIndex();
    const diff = newIndex - previousIndex;

    // don't animate anything if we haven't moved to a new stop on the timeline
    if (diff === 0) { return; }

    // set newIndex so that toggleHoverState can reference it
    timelineState.setNewIndex(newIndex);

    timelineState.setAnimationState(true);

    // initialize animejs timeline
    const timelineAnimation = anime.timeline({});

    // populate animejs timeline with animations
    animateStartingLabel(timelineAnimation);
    animateStartingCircle(timelineAnimation, diff);
    animateLineSegmentsAndCircles(timelineAnimation, previousIndex, newIndex, diff);
    animateEndingCircle(timelineAnimation, newIndex);
    animateEndingLabel(timelineAnimation, newIndex);

    // update timelineState once the entire timeline has finished
    timelineAnimation.finished.then(function() {
      timelineState.setAnimationState(false);
      timelineState.setPreviousIndex(newIndex);
    });
  }
  /* End main timeline control function */

  // initial animation & state updates on page load
  selectTimelineStop(0);

  // Click event handler on circles
  $circles.on('click', function(event) {
    const newIndex = $circles.index($(event.target));
    if (newIndex > -1) {      
      selectTimelineStop(newIndex);
    }
  });

  // Click event handler on labels
  $labels.on('click', function(event) {
    const newIndex = $labels.index($(event.target));
    if (newIndex > -1) {
      selectTimelineStop(newIndex);
    }
  });

  // Hover state
  function toggleHoverState(index, startHover) {
    const hoverStateDuration = 25;
    const offset = `-=${hoverStateDuration}`;
    const circle = [...$circles][index];
    const label = [...$labels][index];
    let oldBackgroundColor, newBackgroundColor, newFontSize;
    (startHover === true) ? $(circle).addClass('hover-state'): $(circle).removeClass('hover-state');
    if (startHover === true) {
      newFontSize = '1.25rem';
      oldBackgroundColor = colors.brandPrimaryDark;
      newBackgroundColor = colors.white;
    } else {
      oldBackgroundColor = colors.white;
      newBackgroundColor = colors.brandPrimaryDark;
    }
    const hoverAnimation = anime.timeline({});
    hoverAnimation.add({
      targets: circle,
      background: [oldBackgroundColor, newBackgroundColor],
      duration: hoverStateDuration, 
      easing
    });
    hoverAnimation.add({
      targets: label,
      fontSize: newFontSize,
      duration: hoverStateDuration,
      easing,
      complete: () => {
        (startHover === true) ? $(label).addClass('current') : $(label).removeClass('current');
      }
    }, offset);
  }

  function onHover(event) {
    if (event.type !== 'mouseenter' && event.type !== 'mouseleave') { return; }
    const startHover = event.type === 'mouseenter' ? true : false;
    let index = $circles.index($(event.target)); // check circles collection
    if (index === -1) {
      index = $labels.index($(event.target)); // if not in circles, check labels
    }
    // do not animate if the event target is already selected (previousIndex) or has just been clicked (newIndex)
    if (index === timelineState.getNewIndex() || index === timelineState.getPreviousIndex()) {
      return;
    }
    if (index > -1) {
      toggleHoverState(index, startHover);
    }
  }

  $circles.on('mouseenter mouseleave', onHover);

  $labels.on('mouseenter mouseleave', onHover);
});