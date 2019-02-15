import anime from 'animejs';

anime
  .timeline({ loop: false })
  .add({
    targets: '.banner-section .dp-headline .first-line',
    translateX: [-100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuart',
    duration: 2800
  })
  .add(
    {
      targets: '.banner-section .dp-headline .second-line',
      translateX: [-100, 0],
      opacity: [0, 1],
      easing: 'easeOutQuart',
      duration: 2800,
    },
    '-=2800'
  )
  .add(
    {
      targets: '.banner-section .dp-intro .phase',
      translateX: [-50, 0],
      opacity: [0, 1],
      easing: 'easeOutQuart',
      duration: 2000,
      delay: (el, i) => 150 * i
    },
    '-=2500'
  )
  .add(
    {
      targets: '.banner-section .link-section',
      opacity: [0, 1],
      easing: 'linear',
      duration: 750,
    },
    '-=1500'
  );