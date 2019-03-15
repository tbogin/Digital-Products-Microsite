$(document).ready(function(){

  const $servicesPager = $('.services-pager');

  $servicesPager.slick({
    prevArrow: $('.services-pager-prev'),
    nextArrow: $('.services-pager-next'),       
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,  
    infinite: false,
    slidesToShow: 1,         
    slidesToScroll: 1,              
    variableWidth: false,
    draggable: false
  });
  
});