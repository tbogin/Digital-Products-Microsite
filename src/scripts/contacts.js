
$(document).ready(function(){
    const $slickContainer = $('.contact-card-container');
    $slickContainer.slick({
      // arrows: true,
      // centerMode: false,
      // infinite: false,
      // slidesToShow: 4,
      // slidesToScroll: 1,
      // variableWidth: true,
      prevArrow: $('.prev-arrow-custom'), 
      nextArrow: $('.next-arrow-custom'),           
      centerMode: false,    
      infinite: false,
      slidesToShow: 1,         
      slidesToScroll: 1,              
      variableWidth: true,
    });

    // arrows: false,            
    // centerMode: true,    
    // infinite: false,
    // slidesToShow: 1,         
    // slidesToScroll: 1,              
    // variableWidth: true, 

    // $slickContainer.slick();

  });