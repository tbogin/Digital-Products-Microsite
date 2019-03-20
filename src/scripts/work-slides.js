import ScrollMagic from 'scrollmagic';
import { mobileBreakpoint } from './constants';
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

$(document).ready(function() {

  const $slides = $('.card-wrap .slick-slide');
  const $buttonContainer = $('#work-btn-container');
  const $slickContainer = $('.slide-wrap');

  $('.work-btn:first').addClass('active');

  //Transition mobile tabs into view when outside viewport
  $('.work-btn').on('click', (e) => {
    let $target = $(e.target)[0],
        $btnContainer = $('#work-btn-container'),
        bodyRect = document.body.getBoundingClientRect(),
        elemRect = $target.getBoundingClientRect(),
        offsetR  = elemRect.right - bodyRect.right,
        offsetL = elemRect.left - bodyRect.left;
    
    offsetR > 0 ? $($btnContainer).removeClass('buttons-left-offset').addClass('buttons-right-offset') : null;
    offsetL < 0 ? $($btnContainer).removeClass('buttons-right-offset').addClass('buttons-left-offset') : null;
  });

  /* Mobile utility methods */
  function getFirstDevCardIndex() {
    return 0; // should equal the 0-based index of the first dev card in the list. if the cards ever change, this number may need to be updated.
  }
  /* End mobile utility methods */
  
  /* Core DOM manipulation methods - all screen sizes */
  function selectWorkGroup(type) {
    let goToIndex = (type === 1) ? getFirstDevCardIndex() : type -1;
    $slickContainer
      .slick('slickGoTo', goToIndex);
  }
  /* End core DOM manipulation methods */

  /* Click event handlers on buttons - all screen sizes */
  $(document).on('click', '.work-btn', function(event) {
    //Should we refactor? Maybe with a more descriptive data property on each slide?
    let findID = $(this).attr('id').split('');
    let num = findID.slice(-1)[0];
    let integer = parseInt(num);
    selectWorkGroup(integer);
  });
  /* End click event handlers */

  /* ScrollMagic */
  const capabilitiesController = new ScrollMagic.Controller();

  // ScrollMagic scene controlling initial animation of text, buttons, & cards
  const initialAnimationScene = new ScrollMagic.Scene({
    triggerElement: '.slide-wrap',
    duration: 0,
    triggerHook: 0.65
  }).addTo(capabilitiesController)
    .on('progress', event => {
      workSection.animateSection();
    }
  );

  let workSection = {
    animateMainText: function() {
      $('.work-section .work-main-text-col .main-text-item').addClass('fade-in-elem');
    },
    animateTiles: function() {
      $('.slide-wrap .card').addClass('first-animation');
    },
    animateSection: function() {
      this.animateMainText();
      this.animateTiles();
    }
  };
  /* End ScrollMagic */
});