$(document).ready(function() {

  function selectTimelineStop(stopNumber) {
    console.log('thank you for calling moviefone. you have selected ', stopNumber);
  }

  $('.timeline .circle').on('click', function(event) {
    const stopNumber = $('.timeline .circle').index($(event.target));
    if (stopNumber > -1) {      
      selectTimelineStop(stopNumber);
    }
  });

  $('.timeline-labels .timeline-label').on('click', function() {
    const stopNumber = $('.timeline-labels .timeline-label').index($(event.target));
    if (stopNumber > -1) {
      selectTimelineStop(stopNumber);
    }
  });

});