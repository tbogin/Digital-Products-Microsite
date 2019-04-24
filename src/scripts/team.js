import Chart from 'chart.js';
import ScrollMagic from 'scrollmagic';
import anime from 'animejs';
import counterUp from 'counterup2';
import { mobileBreakpoint } from './constants';

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

// Chart.defaults.global.animation.duration = 2000;
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
  // collaboratorAnimation.play();
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

//Outro animations for top half UI of Team section when scrolling down
function collaboratorsOutro() {
  const collabOutro = anime
  .timeline({loop: false, autoplay: false})
  .add({
    targets: '.doughnut-chart',
    offset: -100,
    translateX: -800,
    translateY: -800,
    opacity: [1, 0.8],
    duration: 3500,
    easing: 'easeOutQuart' 
  });
  collabOutro.play();
};

function cardsOutroAnimation() {
  const cardsOutro = anime({
    targets: '.team-panel-collab',
    translateX: 800,
    translateY: -800,
    opacity: [1, 0.8],
    duration: 3500,
    easing: 'easeOutQuart'
  });
  cardsOutro.play();
};

//Intro animations for top half UI of Team section when scrolling up
function collaboratorsIntro() {
  const collabIntro = anime
  .timeline({loop: false, autoplay: false})
  .add({
    targets: '.doughnut-chart',
    offset: -100,
    translateX: 0,
    translateY: 0,
    opacity: [0.8, 1],
    duration: 3500,
    easing: 'easeOutQuart' 
  });
  collabIntro.play();
};

function cardsIntroAnimation() {
  const cardsIntro = anime({
    targets: '.team-panel-collab',
    translateX: 0,
    translateY: 0,
    opacity: [0.8, 1],
    duration: 3500,
    easing: 'easeOutQuart'
  });
  cardsIntro.play();
};

//Fade to grey when scrolling into bottom half of Team section
function colorFadeAnimation() {
  const colorFade = anime({
    targets: '.team-section .lower-portion-background',
    opacity: [0.8, 1],
    duration: 2000,
    backgroundColor: '#fcfcfc',
    easing: 'easeInOutQuad'
  });
  colorFade.play();
}

//Fade back to white when scrolling out of bottom half of Team section
function colorFadeOutAnimation() {
  const colorFadeOut = anime({
    targets: '.team-section .lower-portion-background',
    opacity: [1, 0.8],
    duration: 2000,
    backgroundColor: '#ffffff',
    easing: 'easeInOutQuad' 
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
function isNotMobile() {
  return $(window).outerWidth() > mobileBreakpoint;
};

//TODO
//Tweak: Lower chart/card opacity on outro, reverse opacity fade for intro
//Change bg color to grey upon scrolling into map section
//Tweak map and text fade ins
//Scrolling bugs
  //staggering: TweenMax.staggerFromTo()

const teamColorFade = new ScrollMagic.Scene({
  triggerElement: '.team-section .lower-portion-background',
  offset: -300,
  duration: 500,
  triggerHook: 0
})
.addTo(teamsController)
.on('enter', event => {
  if (isNotMobile()) {
    colorFadeAnimation();
  }
})
.on('leave', event => {
  if (isNotMobile()) {
    colorFadeOutAnimation();
  }
});

let xAxisChart = 0;
let yAxisChart = 0;
let xAxisCards = 0;
let yAxisCards = 0;
let originalScrollPosition = $(window).scrollTop();
function startingCoordinates() {
  return xAxisChart != 0 && yAxisChart != 0 && xAxisCards != 0 && yAxisCards != 0;
}

const scrollToMap = new ScrollMagic.Scene({
  triggerElement: '.team-section .lower-portion-background',
  duration: 0,
  triggerHook: 0.75
})
.addTo(teamsController)
.on('progress', event => {
  if (isNotMobile()) {
    $(window).on('scroll', () => {
      let currentScrollPosition = $(window).scrollTop();
      if(currentScrollPosition > originalScrollPosition) { //scroll down
        xAxisChart -= 5;
        yAxisChart -= 5;
        xAxisCards += 5;
        yAxisCards -= 5;
      } 
      else { //scroll up
        if(xAxisChart < 0 && yAxisChart < 0 && xAxisCards > 0 && yAxisCards < 0) {
          xAxisChart += 5;
          yAxisChart += 5;
          xAxisCards -= 5;
          yAxisCards += 5;
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
    $('.doughnut-chart').css({"-webkit-transform":"translate(0px, 0px)"});
    $('.team-panel-collab').css({"-webkit-transform":"translate((0px, 0px)"});
    // collaboratorsIntro();
    // cardsIntroAnimation();
  }
});
//End parallax
//End scrollmagic