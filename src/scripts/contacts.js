
$(document).ready(function(){
    const $slickContainer = $('.contact-card-container');

    $slickContainer.slick({
      prevArrow: $('.prev-arrow-custom'), 
      nextArrow: $('.next-arrow-custom'),           
      centerMode: false,    
      infinite: false,
      slidesToShow: 1,         
      slidesToScroll: 1,              
      variableWidth: true,
    });
  });