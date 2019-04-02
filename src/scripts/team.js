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
  cutoutPercentage: 85,
  responsive: true,
  animation: {
    animateRotate: true,
    render: false,
    duration: 2000
  }
};

const teamChart = new Chart(ctx, {
  type,
  data,
  options
});

//Counter
const counter = document.querySelector('.counter'); //counterup package implementation demands plain JS here
const startCounter = counterUp( counter, {
  duration: 2000,
  delay: 10,
});

// $('.counter').addClass('animated fadeInDownBig');
// $('.counter-text').addClass('animated fadeIn');

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
  collaboratorAnimation.play();
}

function animateGeoText() {
  const geoBlurbAnimation = anime
  .timeline({loop: false, autoplay: false})
  .add({
    targets: '.geo-coverage-panel',
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuart',
    duration: 2000 
  });
  geoBlurbAnimation.play();
}


//Scrollmagic
const teamsController = new ScrollMagic.Controller();

const initialAnimationScene = new ScrollMagic.Scene({
  triggerElement: '.team-section',
  duration: 0,
  triggerHook: 0.35
})
  .addTo(teamsController)
  .on('progress', event => {
    animateCollaboratorText();
  });

const geoSectionAnimationScene = new ScrollMagic.Scene({
  triggerElement: '.team-section .lower-portion-background',
  duration: 0,
  triggerHook: 0.9
})
  .addTo(teamsController)
  .on('progress', event => {
    animateGeoText();
  });

// const teamSection = {
//   animateMainText: function() {
//     $('.team-section .capabilities-main-text-col .main-text-item').addClass('fade-in-elem');
//   },
//   animateTiles: function() {
//     $('.team-section .dp-card').addClass('first-animation');
//   },
//   animateSection: function() {
//     this.animateMainText();
//     this.animateTiles();
//   }
// };

function getTeamSectionOffset() {
  return $('.team-section').outerHeight() - ($('#button-development-capabilities').outerHeight() + 60); 
} 

function getTriggerHook() {
  return getTeamSectionOffset() / $(window).outerHeight();
}

//scrollmagic scene for animating active buttons on upper half of Team Section