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
    targets: '.card.active .caption, .card.active .dp-card-title, .card.active .body-text-2',
    translateX: [-60, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 1000,
    delay: 400
})
.add(
{
    targets: '.card.active .buttons',
    translateX: [-80, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 1000,
}, '-=500')
.add(
{
    targets: '.card.active .feat-img',
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 1000,
}, '-=500');
    
const animationNext = anime
.timeline({ 
    loop: false,
    autoplay: false
})
.add(
{
    targets: '.card.active .caption, .card.active .dp-card-title, .card.active .body-text-2',
    translateX: [-60, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 1000,
    delay: 400,
})
.add(
{
    targets: '.card.active .buttons',
    translateX: [-80, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 1000,
}, '-=500')
.add(
{
targets: '.card.active .feat-img',
translateY: [100, 0],
opacity: [0, 1],
easing: 'easeInOutSine',
duration: 1000,
begin: () => {
    $nextSlide.addClass('active');
}
}, '-=500');
    
const animationOut = anime
.timeline({ 
    loop: false,
    autoplay: false
})
.add(
    {
        targets: '.card.active .feat-img',
        translateY: [0, 200],
        opacity: [1, 0],
        easing: 'easeInOutSine',
        duration: 1000,
        delay: 100
    })
.add(
    {
        targets: '.card.active .caption, .card.active  .dp-card-title, .card.active  .body-text-2',
        opacity: [1, 0],
        easing: 'easeInOutSine',
        duration: 1000
    }, '-=800')
.add(
{
    targets: '.card.active .buttons',
    opacity: [1, 0],
    easing: 'easeInOutSine',
    duration: 1000,
    complete: () => {
        $currSlide.removeClass('active');        
    }
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
  
$('.next').on('click', (el)=> {
    $currSlide = $(el.currentTarget).parent().find('.active')
    $nextSlide = $currSlide.next('.card');
    animationOut.play();
    animationNext.play();
});
$('.prev').on('click', ()=> {
    //animationIn.play();
});