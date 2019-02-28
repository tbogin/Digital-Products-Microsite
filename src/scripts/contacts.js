
$(document).ready(function(){
    const $slickContainer = $('.contact-card-container');
    $slickContainer.slick({
      arrows: false,
      centerMode: false,
      infinite: false,
      slidesToShow: 4,
      variableWidth: true,
      slidesToScroll: 1
      // need to verify if the items are swipable on desktop mode or only movable by arrows
    });
  });