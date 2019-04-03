import Chart from 'chart.js';
import ScrollMagic from 'scrollmagic';
import anime from 'animejs';
import counterUp from 'counterup2';

Chart.defaults.global.animation.duration = 2000;

//Doughnut Chart
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

// const teamChart = new Chart(ctx, {
//   type,
//   data,
//   options
// });
//End chart

//Counter
const counter = document.querySelector('.counter'); //counterup package implementation demands plain JS here
const startCounter = counterUp( counter, {
  duration: 2000,
  delay: 10,
});

// $('.counter').addClass('animated fadeInDownBig');
// $('.counter-text').addClass('animated fadeIn');
//End counter

//Animations
function animateCollaboratorText() {
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
  setTimeout(function(){ collaboratorAnimation.play(); }, 2500);
}

function animateGeoText() {
  const geoBlurbAnimation = anime
  .timeline({loop: false, autoplay: false})
  .add({
    targets: '.geo-coverage-panel',
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuart',
    duration: 1500 
  });
  geoBlurbAnimation.play();
}
//End animations

//Scrollmagic
const teamsController = new ScrollMagic.Controller();

  //Run animation for text in top half of Team Section
const initialAnimationScene = new ScrollMagic.Scene({
  triggerElement: '.team-section',
  duration: 0,
  triggerHook: 0.65
})
  .addTo(teamsController)
  .on('progress', event => {
    animateCollaboratorText();
  });

  //Run animation for text in bottom half of Team Section
const geoSectionAnimationScene = new ScrollMagic.Scene({ 
  triggerElement: '.team-section .lower-portion-background',
  duration: 0,
  triggerHook: 0.9
})
  .addTo(teamsController)
  .on('progress', event => {
    animateGeoText();
  });

function getTeamSectionOffset() {
  return $('.team-section').outerHeight() - ($('#button-development-capabilities').outerHeight() + 60); 
} 

function getTriggerHook() {
  return getTeamSectionOffset() / $(window).outerHeight();
}
//End scrollmagic

//scrollmagic scene for animating active buttons on upper half of Team Section