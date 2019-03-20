
$(document).ready(function(){
    const $slickContainer = $('.contact-card-container');
    const $slides = $('.contact-slide').length;
    const $currSlide = $('.slick-current');
    const $scrollbar = $('.scroll-bar-mobile');

    //grab index of current slide to determine % position of scrollbar


    $slickContainer.slick({
      prevArrow: $('.prev-arrow-custom'), 
      nextArrow: $('.next-arrow-custom'),           
      centerMode: false,    
      infinite: false,
      slidesToShow: 3,         
      slidesToScroll: 1,              
      variableWidth: true,
      draggable: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
            draggable: true
          }
        }
      ]
    });

    $slickContainer.on('afterChange', function(event, slick, currentSlide, nextSlide){
      let scrollbarMargin = ( currentSlide / $slides ) * 100 + '%';
      $scrollbar.css('margin-left', scrollbarMargin);
    });

  });