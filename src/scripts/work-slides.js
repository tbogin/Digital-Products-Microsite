import ScrollMagic from 'scrollmagic';
import { mobileBreakpoint } from './constants';
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

$(document).ready(function() {

  const $slides = $('.card-wrap .slick-slide');
  const $buttonContainer = $('#work-btn-container');
  const $slickContainer = $('.slide-wrap');

  //Dynamically populate a tab button for each slide
  $.each($slides, (i, el) => {
    if($slides.length > 1) {
      $($buttonContainer).append(
        `<button type='button' class='link button-inset button-tab-mobile main-text-item work-btn' id='button-work-${i + 1}'>
          Case ${i + 1}
        </button>`
      );
    }
  });
  $('.work-btn:first').addClass('active');

  // /* Desktop (not-mobile) constants and utility methods */
  const $workCardSubcontainer = $('.slide-wrap');

  function getDevButtonOffset() {
    return $('.work-main-text-col').outerHeight() - ($('#button-work-1').outerHeight() + 60);
  }
  /* End desktop (not-mobile) constants and utility methods */


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
    triggerElement: '.slide-wrap', //may need to be one element deeper
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

  /* 
     getTriggerHook function, to be used with ScrollMagic buttonSelectionScene (below).
     triggerHook must be a number between 0 and 1 representing a ratio of the vertical position of the trigger to the height of the viewport.
     the calculations below set the triggerHook to be level with the top of the "Development Capabilities" button 
  */
  function getTriggerHook() {
    return getDevButtonOffset() / $(window).outerHeight();
  }

  // ScrollMagic scene to toggle button states (i.e., which button appears to be active) based on scroll position  - Desktop (not-mobile) only
  const designCardContainerHeight = $workCardSubcontainer.outerHeight();
  const buttonSelectionScene = new ScrollMagic.Scene({
    triggerElement: '.slide-wrap',
    offset: -40,    // this aligns the "start" of the scene with the top of the first right-hand card in the .capabilities-design-card-container
    duration: designCardContainerHeight + 100,    // this aligns the "end" of the scene with the top of the first left-hand card in the .capabilities-dev-card-container
    triggerHook: getTriggerHook()
  }).addTo(capabilitiesController)
    .on('enter', function() {
      // if (isNotMobile()) {
      //   highlightSelectedButton('design');
      // }
    }
  ).on('leave', function(event) {}
  );

  // Reset triggerHook dynamically when the scene "shifts", for example, when the window is resized
  buttonSelectionScene.on('shift', function(event) {
    buttonSelectionScene.triggerHook(getTriggerHook());
  });
  /* End ScrollMagic */

});