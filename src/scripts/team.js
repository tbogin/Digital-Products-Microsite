import Chart from 'chart.js';
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
    duration: 1000
  }
};

const teamChart = new Chart(ctx, {
  type,
  data,
  options
});

//Counter
const counter = document.querySelector('.counter'); //counterup package implementation demands plain JS here
counterUp( counter, {
  duration: 2000,
  delay: 10,
});

// $('.counter').addClass('animated fadeInDownBig');
// $('.counter-text').addClass('animated fadeIn');