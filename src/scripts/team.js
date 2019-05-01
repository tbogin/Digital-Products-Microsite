import Chart from 'chart.js';
import ScrollMagic from 'scrollmagic';
import anime from 'animejs';
import counterUp from 'counterup2';
import { mobileBreakpoint } from './constants';

function isNotMobile() {
  return $(window).outerWidth() > mobileBreakpoint;
};

//Doughnut Chart setup
const ctx = $('#team-chart');

const type = 'doughnut';

const data = {
  datasets: [{
    data: [200, 75, 50, 25],
    backgroundColor: ["#001532", "#0146f5", "#bbcdf8", "#8b96a4"]
  }]
};

const options = {
  animation: {
    animateRotate: true,
    render: false,
    duration: 2000
  },
  cutoutPercentage: 85,
  responsive: true,
  tooltips: {
    enabled: false
  }
};
//End chart setup

//Counter setup
const counter = document.querySelector('.counter'); //counterup package implementation demands plain JS here
//End counter setup

//Animations
function animateChartAndText() {
  const collaboratorAnimation = anime
  .timeline({loop: false, autoplay: false})
  .add({
    targets: '.team-section .collaborators-section',
    translateX: [-100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuart',
    duration: 2000
  })
  .add(
    {
      targets: '.team-section .team-info-card',
      translateX: [-50, 0],
      opacity: [0, 1],
      easing: 'easeOutQuart',
      duration: 2000,
      delay: (el, i) => 250 * i
    },
    '-=2500'
  );
  const teamChart = new Chart(ctx, { //Initialize doughnut chart
    type,
    data,
    options
  });
  const startCounter = counterUp( counter, { //Initialize counter
    duration: 1500
  });
  setTimeout(function(){ collaboratorAnimation.play(); }, 2000); //Wait for chart to load/counter to finish before animating right side UI
};

//Animate map and text when scrolling into lower half of Team section
function animateGeoText() {
  const geoBlurbAnimation = anime
  .timeline({loop: false, autoplay: false})
  .add({
    targets: '.map-container',
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuart',
    duration: 1500
  })
  .add({
    targets: '.geo-coverage-panel',
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuart',
    duration: 1500
  });
  geoBlurbAnimation.play();
};

//Fade to grey when scrolling into bottom half of Team section
function colorFadeInAnimation() {
  const colorFade = anime({
    targets: '.team-section',
    opacity: [0.8, 1],
    backgroundColor: 'gray',
    easing: 'easeInOutQuad'
  });
  colorFade.play();
}

//Fade back to white when scrolling out of bottom half of Team section
function colorFadeOutAnimation() {
  const colorFadeOut = anime({
    targets: '.team-section',
    opacity: [1, 0.8],
    easing: 'easeInOutQuad',
    duration: 300 
  });
  colorFadeOut.play();
}
//End animations

//Scrollmagic
const teamsController = new ScrollMagic.Controller();

//Run animation for text in top half of Team Section
const initialAnimationScene = new ScrollMagic.Scene({
  triggerElement: '.team-section',
  duration: 0,
  triggerHook: 0.35
})
  .addTo(teamsController)
  .on('progress', event => {
    animateChartAndText();
    initialAnimationScene.remove();
  });

//Run animation for text in bottom half of Team Section
const geoTextAnimationScene = new ScrollMagic.Scene({ 
  triggerElement: '.team-section .lower-portion-background',
  duration: 0,
  triggerHook: 0.65
})
  .addTo(teamsController)
  .on('progress', event => {
    animateGeoText();
  });

//Parallax scrolling

const teamColorFade = new ScrollMagic.Scene({
  triggerElement: '.team-section',
  offset: -300,
  duration: 500,
  triggerHook: 0
})
.addTo(teamsController)
.on('progress', event => {
  if (isNotMobile()) {
    $(window).on('scroll', () => {
      if($(window).scrollTop() >= 4168) {
        $('.team-section').addClass('color-transition');
      }
    });
  }
})
.on('leave', event => {
  if (isNotMobile()) {
    $('.team-section').hasClass('color-transition') ? $('.team-section').removeClass('color-transition') : null;
  }
});

const teamOpacityChange = new ScrollMagic.Scene({
  triggerElement: '.team-section .lower-portion-background',
  duration: "100%",
  triggerHook: 0.5
})
.addTo(teamsController)
.on('progress', event => {
  if(isNotMobile()) {
    colorFadeInAnimation();
  }
})
.on('leave', event => {
  if(isNotMobile()) {
    colorFadeOutAnimation();
  }
});


//Chart and cards outro and intro - move with user scrolling
let xAxisChart = 0;
let yAxisChart = 0;
let xAxisCards = 0;
let yAxisCards = 0;
let originalScrollPosition = $(window).scrollTop();

function scrollingDownCoordinates() {
  return xAxisChart <= 0 && yAxisChart <= 0 && xAxisCards >= 0 && yAxisCards <= 0;
}

const scrollToMap = new ScrollMagic.Scene({
  triggerElement: 'main',
  duration: 0,
  triggerHook: 0.65
})
.addTo(teamsController)
.on('progress', event => {
  if (isNotMobile()) {
    $(window).on('scroll', () => {
      let currentScrollPosition = $(window).scrollTop();
      if(currentScrollPosition > originalScrollPosition && currentScrollPosition > 4000) { //scroll down
        $('.doughnut-chart').removeClass('transform-reset');
        $('.team-panel-collab').removeClass('transform-reset');
        xAxisChart -= 5;
        yAxisChart -= 5;
        xAxisCards += 5;
        yAxisCards -= 5;
      } 
      else { //scroll up
        if(scrollingDownCoordinates()) {
          xAxisChart += 10;
          yAxisChart += 10;
          xAxisCards -= 10;
          yAxisCards += 10;
        }
      }
      originalScrollPosition = currentScrollPosition;
      $('.doughnut-chart').css({"-webkit-transform":"translate(" + xAxisChart + "px," + yAxisChart + "px)"});
      $('.team-panel-collab').css({"-webkit-transform":"translate(" + xAxisCards + "px," + yAxisCards + "px)"});
    });
  }
})
.on('leave', event => {
  if (isNotMobile()) {
    $('.doughnut-chart').addClass('transform-reset');
    $('.team-panel-collab').addClass('transform-reset');
  }
});
//End parallax
//End scrollmagic