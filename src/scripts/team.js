import Chart from 'chart.js';
import ScrollMagic from 'scrollmagic';
import anime from 'animejs';
import counterUp from 'counterup2';

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
    animateChartAndText();
  });

//Run animation for text in bottom half of Team Section
const geoTextAnimationScene = new ScrollMagic.Scene({ 
  triggerElement: '.team-section .lower-portion-background',
  duration: 0,
  triggerHook: 0.9
})
  .addTo(teamsController)
  .on('progress', event => {
    animateGeoText();
  });
//End scrollmagic