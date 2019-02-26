import anime from 'animejs';

$(document).ready(function() {

  const $circles = $('.timeline .circle');
  const $lineSegmentHighlights = $('.timeline .line-segment .line-segment-highlight');
  const $labels = $('.timeline-labels .timeline-label');

  function TimelineState() {
    let previousIndex = 0;
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
  const timelineState = new TimelineState();

  function selectTimelineStop(newIndex) {

    if (timelineState.animationIsInProgress()) {
      console.log('sorry, animation is in progress. please wait a hot second and try again.');
      return;   // prevent new animation while a previous animation is still in progress
    }

    timelineState.setAnimationState(true);

    const previousIndex = timelineState.getPreviousIndex();
    const diff = newIndex - previousIndex;

    const timelineAnimation = anime.timeline({});

    // Animation of line segments 
    const width = (diff >= 0) ? '100%' : 0;
    const duration = 600;
    $lineSegmentHighlights
      .filter(function(index, segment) {
        // filter collection to include only line segments between previous & new indices
        if (diff >= 0) {
          return (index >= previousIndex && index <= newIndex);
        } else {
          return (index <= previousIndex && index > newIndex);
        }
      })
      .map(function(index, segment) {
        // add animation for each segment
        let offset = '+=0';                             // default offset
        if (diff < 0) {
          offset = duration * (-1 * diff - index - 1);  // positive absolute offset for moving "backwards" down the line
        } else if (diff > 0 && index === 0) {
          offset = -1 * duration;                       // negative absolute offset for the first line segment when moving "forwards" (since it should already be filled in)
        }
        timelineAnimation.add({
          targets: segment,
          width: width,
          duration: duration,
          easing: 'linear',
        }, offset);
      }
    );

    // State change on circles - @TODO: animation
    $circles.map(function(index, circle) {
      if (index < newIndex) {
        $(circle).removeClass('future').removeClass('current').addClass('past');
      } else if (index === newIndex) {
        $(circle).removeClass('future').removeClass('past').addClass('current');
      } else {
        $(circle).removeClass('current').removeClass('past').addClass('future');
      }
    });

    // State change on selected label - @TODO: animation
    const $selectedLabel = $labels.eq(newIndex);
    $labels.removeClass('current');
    $selectedLabel.addClass('current');

    timelineAnimation.finished.then(function() {
      console.log('animation done');
      timelineState.setAnimationState(false);
      timelineState.setPreviousIndex(newIndex);
    });
  }

  selectTimelineStop(timelineState.getPreviousIndex());

  $('.timeline .circle').on('click', function(event) {
    const newIndex = $circles.index($(event.target));
    if (newIndex > -1) {      
      selectTimelineStop(newIndex);
    }
  });

  $('.timeline-labels .timeline-label').on('click', function() {
    const newIndex = $labels.index($(event.target));
    if (newIndex > -1) {
      selectTimelineStop(newIndex);
    }
  });

});