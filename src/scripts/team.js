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
    duration: 2000
  });
  setTimeout(function(){ collaboratorAnimation.play(); }, 2500); //Wait for chart to load/counter to finish before animating right side UI
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
  })
  .on('leave', event => {
    initialAnimationScene.refresh();
  });

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

  // function topHalfColorFadeInAnimation() {
  //   const topHalfColorFadeIn = anime({
  //     targets: '.team-section',
  //     opacity: [1, 0],
  //     duration: 2000,
  //     backgroundColor: '#fcfcfc',
  //     easing: 'easeInOutQuad' 
  //   });
  //   topHalfColorFadeIn.play();
  // }

  // function topHalfColorFadeOutAnimation() {
  //   const topHalfColorFadeOut = anime({
  //     targets: '.team-section',
  //     opacity: [1, 0],
  //     duration: 2000,
  //     backgroundColor: '#ffffff',
  //     easing: 'easeInOutQuad' 
  //   });
  //   topHalfColorFadeOut.play();
  // }

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

if (isNotMobile()) {

  // const topHalfColorFade = new ScrollMagic.Scene({
  //   triggerElement: '.team-section',
  //   duration: 500,
  //   triggerHook: 0.2
  // })
  // .addTo(teamsController)
  // .on('enter', event => {
  //   topHalfColorFadeInAnimation();
  // })
  // .on('leave', event => {
  //   topHalfColorFadeOutAnimation();
  // });

  const teamColorFade = new ScrollMagic.Scene({
    triggerElement: '.team-section .lower-portion-background',
    offset: -300,
    duration: 500,
    triggerHook: 0
  })
  .addTo(teamsController)
  .on('enter', event => {
    colorFadeAnimation();
  })
  .on('leave', event => {
    colorFadeOutAnimation();
  });

  const scrollToMap = new ScrollMagic.Scene({
    triggerElement: '.team-section .lower-portion-background',
    duration: 0,
    triggerHook: 0.75,
    reverse: true
  })
  .addTo(teamsController)
  .on('enter', event => {
    collaboratorsOutro();
    cardsOutroAnimation();
  })
  .on('leave', event => {
    collaboratorsIntro();
    cardsIntroAnimation();
  });

};
//End parallax
//End scrollmagic