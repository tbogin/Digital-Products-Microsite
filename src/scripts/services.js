import { colors } from './constants';
import TimelineState from './timelineState';

import anime from 'animejs';

$(document).ready(function() {

  // get refs to useful collections
  const $circles = $('.timeline .circle');
  const $lineSegmentHighlights = $('.timeline .line-segment .line-segment-highlight');
  const $labels = $('.timeline-labels .timeline-label');

  // set default duration & easing
  const duration = 300;
  const easing = 'linear';
  
  // initialize timeline state
  const timelineState = new TimelineState();

  /* Partial animation functions */
  function animateStartingLabel(animeTimeline) {
    const startingLabel = [...$labels][timelineState.getPreviousIndex()];
    animeTimeline.add({
      targets: startingLabel,
      fontSize: '1rem',
      duration,
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
    const newWidth = (diff > 0) ? '100%' : 0;
    const newBorderColor = (diff < 0) ? colors.grayDark : colors.brandPrimary;
  
    const circlesToModify = getElemsToModify($circles, previousIndex, newIndex, diff);
    const lineSegmentsToModify = getElemsToModify($lineSegmentHighlights, previousIndex, newIndex, diff);

    // loop through circles & line segments, adding an appropriate animation for each to the timeline
    for (let i = 0; i < circlesToModify.length; i++) {
      const segment = lineSegmentsToModify[i];
      const circle = circlesToModify[i];
      if (diff > 0) {
        animeTimeline.add({
          targets: segment,
          width: newWidth,
          duration,
          easing
        });
        animeTimeline.add({
          targets: circle,
          borderColor: newBorderColor,
          duration,
          easing
        });
      } else {
        animeTimeline.add({
          targets: circle,
          borderColor: newBorderColor,
          duration,
          easing
        });
        animeTimeline.add({
          targets: segment,
          width: newWidth,
          duration,
          easing
        });
      }
    }
  }

  function animateEndingCircle(animeTimeline, newIndex) {
    const endingCircle = [...$circles][newIndex];
    animeTimeline.add({
      targets: endingCircle,
      background: colors.brandPrimary,
      duration,
      easing
    });
  }

  function animateEndingLabel(animeTimeline, newIndex) {
    const endingLabel = [...$labels][newIndex];
    animeTimeline.add({
      targets: endingLabel,
      fontSize: '1.25rem',
      duration,
      easing,
      complete: () => {
        $(endingLabel).addClass('current');
      }
    });
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
  $labels.on('click', function() {
    const newIndex = $labels.index($(event.target));
    if (newIndex > -1) {
      selectTimelineStop(newIndex);
    }
  });

});