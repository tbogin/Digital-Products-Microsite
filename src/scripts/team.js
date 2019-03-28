import Chart from 'chart.js';
import counterUp from 'counterup2';

//Doughnut Chart
const ctx = $('#team-chart');

const type = 'doughnut';

const data = {
  datasets: [{
    data: [200, 75, 50, 25],
    backgroundColor: ["black", "blue", "cyan", "gray"]
  }]
};

const options = {
  cutoutPercentage: 85,
  animation: {
    animateRotate: true
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

$('.counter').addClass('animated fadeInDownBig');
$('.counter-text').addClass('animated fadeIn');