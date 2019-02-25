$(document).ready(function() {

  const $circles = $('.timeline .circle');
  const $lineSegments = $('.timeline .line-segment');
  const $labels = $('.timeline-labels .timeline-label');

  function selectTimelineStop(stopNumber) {
    $lineSegments.map(function(index, segment) {
      if (index <= stopNumber) {
        $(segment).removeClass('future').addClass('past');
      } else {
        $(segment).removeClass('past').addClass('future');
      }
    });
    $circles.map(function(index, circle) {
      if (index < stopNumber) {
        $(circle).removeClass('future').removeClass('current').addClass('past');
      } else if (index === stopNumber) {
        $(circle).removeClass('future').removeClass('past').addClass('current');
      } else {
        $(circle).removeClass('current').removeClass('past').addClass('future');
      }
    });
    const $selectedLabel = $labels.eq(stopNumber);
    $labels.removeClass('current');
    $selectedLabel.addClass('current');
  }

  $('.timeline .circle').on('click', function(event) {
    const stopNumber = $circles.index($(event.target));
    if (stopNumber > -1) {      
      selectTimelineStop(stopNumber);
    }
  });

  $('.timeline-labels .timeline-label').on('click', function() {
    const stopNumber = $labels.index($(event.target));
    if (stopNumber > -1) {
      selectTimelineStop(stopNumber);
    }
  });

});