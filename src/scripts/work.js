import anime from 'animejs';
import ScrollMagic from 'scrollmagic';

let $currSlide = null;
let $nextSlide = null;


const animationIn = anime
.timeline({ 
    loop: false,
    autoplay: false
})
.add(
{
    targets: '.card .caption, .card .dp-card-title, .card .body-text-2',
    translateX: [-35, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 500,
    delay: 800
})
.add(
{
    targets: '.card .buttons',
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 400,
}, '-=100');

const animationInDevice = anime
.timeline({ 
    loop: false,
    autoplay: false
})
.add(
{
    targets: '.card .feat-img',
    translateY: [50, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 800,
    delay: 800
});

function runAnimationIn() {
    animationIn.play();
    animationInDevice.play();
}

    
const animationOut = anime
.timeline({ 
    loop: false,
    autoplay: false
})
.add(
    {
        targets: '.card .feat-img',
        opacity: [1, 0],
        easing: 'easeInOutSine',
        duration: 500,
    })
.add(
    {
        targets: '.card .caption, .card  .dp-card-title, .card  .body-text-2',
        opacity: [1, 0],
        easing: 'easeInOutSine',
        duration: 500
    }, '-=500')
.add(
{
    targets: '.card .buttons',
    opacity: [1, 0],
    easing: 'easeInOutSine',
    duration: 500,
    complete: () => {
        $currSlide.hide();
        runAnimationIn(true);
        $nextSlide.show();
        
     }
}, '-=500');
            
const controller = new ScrollMagic.Controller();

// Triggers on 'top of div'
const workScene1 = new ScrollMagic.Scene({
  triggerElement: '.work-section',
  duration: 0,
  triggerHook: 0.9
})
.addTo(controller)
.on('progress', event => {
    runAnimationIn();
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
  
$('.next').on('click', (el)=> {
    $currSlide = $(el.currentTarget).parent().find('.activeCard');
    $nextSlide = $currSlide.next();
    $currSlide.removeClass('activeCard');
    $nextSlide.addClass('activeCard');
    animationOut.play();

});
$('.prev').on('click', (el)=> {
    $currSlide = $(el.currentTarget).prev('.card');
    $nextSlide = $currSlide.prev();
    animationOut.play();
});