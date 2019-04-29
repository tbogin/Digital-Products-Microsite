//Disables body scrolling on iOS mobile devices when menu is open; uses body-scroll-lock package
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import M from 'materialize-css';

$(document).ready(function(){
  const nav = $('#mobile-nav');
  const sidenav = $('.sidenav');
  const instance = M.Sidenav.getInstance(sidenav);

  //Scroll to top of page on refresh
  $("html,body").animate({scrollTop: 0}, 100);

  //Reset coordinates for Team Section chart and cards when scrolled to top
  $('.doughnut-chart').css({"-webkit-transform":"translate(0px, 0px)"});
  $('.team-panel-collab').css({"-webkit-transform":"translate(0px, 0px)"});

  $('.dp-nav a').on('click', (e) => {
    // let $navBtn = $(e.target);
    $('.doughnut-chart').css({"-webkit-transform":"translate(0px, 0px)"});
    $('.team-panel-collab').css({"-webkit-transform":"translate(0px, 0px)"});
  });

  instance.options.draggable = false;  //Disable left-swiping as option to close nav

  document.addEventListener("touchmove", function(){}); //for iOS devices

  $('.sidenav-trigger').on('click', () => {
    $('#mobile-nav').on('touchmove', () => {
      disableBodyScroll(nav);
    });
    $('#mobile-nav').on('click touchend', () => {
      enableBodyScroll(nav);
    });
  });

  $('.sidenav-close').on('click touch', () => {
    enableBodyScroll(nav);
  });
  
});