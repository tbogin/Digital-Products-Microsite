import anime from 'animejs';
import ScrollMagic from 'scrollmagic';

const animationIn = anime
.timeline({ loop: false })
.add(
    {
      targets: '.inner-card .caption, .inner-card .dp-card-title, .inner-card .body-text-2',
      translateX: [-60, 0],
      opacity: [0, 1],
      easing: 'easeInOutSine',
      duration: 1000,
      delay: 600
    })
    .add(
    {
        targets: '.inner-card .buttons',
        translateY: [60, 0],
        opacity: [0, 1],
        easing: 'easeInOutSine',
        duration: 1000,
    }, '-=800')
    .add(
    {
        targets: '.feat-img',
        translateY: [200, 0],
        opacity: [0, 1],
        easing: 'easeInOutSine',
        duration: 1000,
    }, '-=800');
    
const animationOut = anime
.timeline({ loop: false })
.add(
    {
        targets: '.feat-img',
        translateY: [0, 200],
        opacity: [1, 0],
        easing: 'easeInOutSine',
        duration: 1000,
        delay: 100
    })
.add(
    {
        targets: '.inner-card .caption, .inner-card .dp-card-title, .inner-card .body-text-2',
        opacity: [1, 0],
        easing: 'easeInOutSine',
        duration: 1000
    }, '-=800')
.add(
{
    targets: '.inner-card .buttons',
    opacity: [1, 0],
    easing: 'easeInOutSine',
    duration: 1000,
}, '-=800');
            

const controller = new ScrollMagic.Controller();

// Triggers on 'top of div'
const workScene1 = new ScrollMagic.Scene({
  triggerElement: '.work-section',
  duration: 0,
  triggerHook: 0.9
})
.addTo(controller)
.on('progress', event => {
    animationIn.play();
});

const workScene2 = new ScrollMagic.Scene({
    triggerElement: '.upward-work-trigger-element',
    duration: 0,
    triggerHook: 0
  })
.addTo(controller)
.on('progress', event => {
    //animationOut.play();
});
  
$('.next').on('click', ()=> {
    animationOut.play();
})