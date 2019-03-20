import anime from 'animejs';
import ScrollMagic from 'scrollmagic';

$(document).ready(() => {
    const $slickContainer = $('.slide-wrap');
    const $buttonContainer = $('#work-btn-container');
    let slickEngaged = false;
    let $currSlide = null;
    let $nextSlide = null;
    let $nextBtn = $('.next:first');
    let $prevBtn = $('.prev:first');
    let $card = $('.card');
    let $slideWrap = $('.slide-wrap');
    let preserveHTML = $slideWrap.html();

    // $buttonContainer.slick({
    //   arrows: false,
    //   infinite: false,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   focusOnSelect: true,
    //   touchMove: true,
    //   asNavFor: $('.slide-wrap')
    // });


    function runInitialAnimation(){ 
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
            targets: '.card .buttons, .adv, .slide-progress',
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
        animationFirst.play();
        animationFirstDevice.play();
    }
    function runSecondaryAnimation() {
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
        });

        animationIn.play();
        animationInDevice.play();
    }
    function runAnimationOut() { 
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
                $('.hidden').removeClass('hidden');
                if ($nextSlide.next('.card').length == 0) {
                    $nextBtn.addClass('hidden');
                }
                if ($nextSlide.prev('.card').length == 0) {
                    $prevBtn.addClass('hidden');
                }
            },
            complete: () => {
                $currSlide.hide();
                runSecondaryAnimation(true);
                $nextSlide.show();        
            }
        }, '-=500');
        animationOut.play();
    }
    function triggerScollAnimation() {
        const controller = new ScrollMagic.Controller();

        // Triggers on 'top of div'
        const workScene1 = new ScrollMagic.Scene({
        triggerElement: '.work-section',
        duration: 0,
        triggerHook: 0.9
        })
        .addTo(controller)
        .on('progress', event => {
        runInitialAnimation();
        });
    }
        $nextBtn.on('click', (el)=> {
            if (!$(el.currentTarget).hasClass('hidden')) {
                $currSlide = $(el.currentTarget).parent().find('.activeCard');
                $nextSlide = $currSlide.next('.card');
                $currSlide.removeClass('activeCard');
                $nextSlide.addClass('activeCard');
                $('.pr-btn-active').removeClass('pr-btn-active');
                $('.pr-btn').eq($nextSlide.index()).addClass('pr-btn-active');
                runAnimationOut();
            }
        });
        $prevBtn.on('click', (el)=> {
            if (!$(el.currentTarget).hasClass('hidden')) {
                $currSlide = $(el.currentTarget).parent().find('.activeCard');
                $nextSlide = $currSlide.prev('.card');
                $currSlide.removeClass('activeCard');
                $nextSlide.addClass('activeCard');
                $('.pr-btn-active').removeClass('pr-btn-active');
                $('.pr-btn').eq($nextSlide.index()).addClass('pr-btn-active');
                runAnimationOut();
            }
        });
        
    function populateProgressIndicators() {
        $card.each((el, idx) => {
            $('.slide-progress').append('<div class="pr-btn"></div>');
        });
        $('.pr-btn:first').addClass('pr-btn-active');
        $prevBtn.addClass('hidden');
    }
    function notMobile() {
        return window.innerWidth > 768;
    }
    function engageMobileCarousel () {
        /* Slick Slider - Mobile only */
        $slickContainer.slick({
            arrows: false,            // no arrow buttons rendered, making swiping the only navigation option
            centerMode: false,         // ensures the slider always "lands" with {slidesToShow} slide(s) centered in the viewport
            infinite: false,
            slidesToShow: 1,          // other slides may be partially visible but only 1 is guaranteed to be in full view whenever the slider "lands"
            slidesToScroll: 1,        
            swipeToSlide: true,       // allows user the option to "scrub" through visible cards, regardless of the slidesToScroll setting 
            variableWidth: false      // allows slides to maintain fixed width by preventing slick from setting slide width dynamically
        });

        // $buttonContainer.slick({
        //   arrows: false,
        //   infinite: false,
        //   slidesToShow: 3,
        //   slidesToScroll: 1,
        //   focusOnSelect: true,
        //   touchMove: true,
        //   centerMode: true,
        //   asNavFor: $('.slide-wrap')
        // });

        slickEngaged = true;
    }

    function slickEngageCheck() {
      if(!slickEngaged) {
          engageMobileCarousel();
      }
    }

    function highlightSelectedButton(type) {
      const workButtons = $('.work-btn');
      let $selectedBtn = $(`#button-work-${type}`);

      if (!workButtons.length) {
        return;
      }
  
      $.each(workButtons, (idx, el) => {
        $(el).removeClass('active');
        $(el).blur();
      });
  
      $($selectedBtn).addClass('active');
    }

  //Transition mobile tabs into view when outside viewport
    function moveSelectedTabIntoViewport() {
      let $activeBtn = $($buttonContainer).find('.active')[0],
          bodyRect = document.body.getBoundingClientRect(),
          elemRect = $activeBtn.getBoundingClientRect(),
          offsetR  = elemRect.right - bodyRect.right,
          offsetL = elemRect.left - bodyRect.left;
  
      offsetR > 0 ? $($buttonContainer).removeClass('buttons-left-offset').addClass('buttons-right-offset') : null;
      offsetL < 0 ? $($buttonContainer).removeClass('buttons-right-offset').addClass('buttons-left-offset') : null;
    }
 
    function getFirstDevCardIndex() {
      return 0; // should equal the 0-based index of the first dev card in the list
    }

    $slickContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      const cardType = (nextSlide < getFirstDevCardIndex()) ? nextSlide : nextSlide + 1;
      highlightSelectedButton(cardType);
      moveSelectedTabIntoViewport();
    });


    if (notMobile()){
        populateProgressIndicators();
        triggerScollAnimation();
    } else {
        slickEngageCheck();
    }

    $(window).on('resize', () => {
        if(notMobile()) {
            if (slickEngaged) {
                $slickContainer.slick('unslick');
                $slideWrap.html(preserveHTML);
                slickEngaged = false;
            }
        } else {
            slickEngageCheck();

        }
    });
});