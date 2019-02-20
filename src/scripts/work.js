import anime from 'animejs';
import ScrollMagic from 'scrollmagic';

$(document).ready(() => {
    let $currSlide = null;
    let $nextSlide = null;
    let $nextBtn = $('.next:first');
    let $prevBtn = $('.prev:first');
    let $card = $('.card');



    const animationFirst = anime
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

    const animationFirstDevice = anime
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
        //delay: 800
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
        //delay: 800
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
        begin: () => {
            $('.disabled').removeClass('disabled');
            if ($nextSlide.next('.card').length == 0) {
                $nextBtn.addClass('disabled');
            }
            if ($nextSlide.prev('.card').length == 0) {
                $prevBtn.addClass('disabled');
            }
        },
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
        animationFirst.play();
        animationFirstDevice.play();
    });

    $nextBtn.on('click', (el)=> {
        if (!$(el.currentTarget).hasClass('disabled')) {
            $currSlide = $(el.currentTarget).parent().find('.activeCard');
            $nextSlide = $currSlide.next('.card');
            $currSlide.removeClass('activeCard');
            $nextSlide.addClass('activeCard');
            $('.pr-btn-active').removeClass('pr-btn-active');
            $('.pr-btn').eq($nextSlide.index()).addClass('pr-btn-active');
            animationOut.play();
        }
    });
    $prevBtn.on('click', (el)=> {
        if (!$(el.currentTarget).hasClass('disabled')) {
            $currSlide = $(el.currentTarget).parent().find('.activeCard');
            $nextSlide = $currSlide.prev('.card');
            $currSlide.removeClass('activeCard');
            $nextSlide.addClass('activeCard');
            $('.pr-btn-active').removeClass('pr-btn-active');
            $('.pr-btn').eq($nextSlide.index()).addClass('pr-btn-active');
            animationOut.play();
        }
    });
    
    function populateProgressIndicators() {
        $card.each((el, idx) => {
            $('.slide-progress').append('<div class="pr-btn"></div>');
        });
        $('.pr-btn:first').addClass('pr-btn-active');
        $prevBtn.addClass('disabled');
    }
    populateProgressIndicators();
});