import ScrollMagic from 'scrollmagic';
import { mobileBreakpoint } from './constants';
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

$(document).ready(function() {

  const $capabilitiesPanel = $('#capabilities');
  const $designCardSubcontainer = $('.capabilities-design-card-container');

  function isNotMobile() {
    return $(window).outerWidth() > mobileBreakpoint;
  }

  function getDesignCardsScrollTop() {
    return $capabilitiesPanel.offset().top;
  }

  function getDevCardsScrollTop() {
    /* the calculation below aligns the top of the first left-hand dev card with the top of the "Development Capabilities" button
       (i.e., the same scroll position where the ScrollMagic scene activates the "Development Capabilities" button) */
    return $capabilitiesPanel.offset().top + $designCardSubcontainer.height() + 156 - getDevButtonOffset();
  }

  function getDevButtonOffset() {
    return $('.capabilities-main-text-col').outerHeight() - ($('#button-development-capabilities').outerHeight() + 60);
  }

  function getFirstDevCardIndex() {
    return 4; // should equal the 0-based index of the first dev card in the list. if the cards ever change, this number may need to be updated.
  }
  
  function selectCapabilityGroup(type) {
    if (type !== 'design' && type !== 'development') {
      return;
    }
    if (isNotMobile()) {
      let newScrollTop = (type === 'development') ? getDevCardsScrollTop() : getDesignCardsScrollTop();
      $(window)
        .scrollTop(newScrollTop)
        .promise()
        .then( highlightSelectedButton(type) );
    } else {
      let goToIndex = (type === 'development') ? getFirstDevCardIndex() : 0;
      $slickContainer
        .slick('slickGoTo', goToIndex)
        .promise()
        .then( highlightSelectedButton(type) );
    }
  }

  function highlightSelectedButton(type) {
    if (type !== 'design' && type !== 'development') {
      return;
    }
    $('#button-design-capabilities').removeClass('active');
    $('#button-development-capabilities').removeClass('active');
    $('#button-design-capabilities').blur();
    $('#button-development-capabilities').blur();
    $(`#button-${type}-capabilities`).addClass('active');
  }

  // click events on buttons
  $('#button-design-capabilities').on('click', function(event) {
    selectCapabilityGroup('design');
  });

  $('#button-development-capabilities').on('click', function() {
    selectCapabilityGroup('development');
  });

  // ScrollMagic init
  const capabilitiesController = new ScrollMagic.Controller();

  // ScrollMagic scene controlling initial animation of text, buttons, & cards
  const initialAnimationScene = new ScrollMagic.Scene({
    triggerElement: '.capabilities-card-container',
    duration: 0,
    triggerHook: 0.65
  }).addTo(capabilitiesController)
    .on('progress', event => {
      capabilitiesSection.animateSection();
    }
  );

  let capabilitiesSection = {
    animateMainText: function() {
      $('.capabilities-section .capabilities-main-text-col .main-text-item').addClass('fade-in-elem');
    },
    animateTiles: function() {
      $('.capabilities-card-container .dp-card').addClass('first-animation');
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

  // ScrollMagic scene to toggle button states (i.e., which button appears to be active) based on scroll position
  const designCardContainerHeight = $designCardSubcontainer.outerHeight();
  const buttonSelectionScene = new ScrollMagic.Scene({
    triggerElement: '.capabilities-design-card-container',
    offset: -40,    // this aligns the "start" of the scene with the top of the first right-hand card in the .capabilities-design-card-container
    duration: designCardContainerHeight + 100,    // this aligns the "end" of the scene with the top of the first left-hand card in the .capabilities-dev-card-container
    triggerHook: getTriggerHook()
  }).addTo(capabilitiesController)
    .on('enter', function() {
      if (isNotMobile()) {
        highlightSelectedButton('design');
      }
    }
  ).on('leave', function(event) {
      // highlight Dev button only if we've left the design cards subsection by scrolling down into the dev cards subsection
      if (isNotMobile() && event.state && event.state === 'AFTER') {
        highlightSelectedButton('development');
      }
      // if we've exited the design cards subsection by scrolling up (i.e., above the Capabilities panel itself), nothing changes
    }
  );

  // Reset triggerHook dynamically when the scene "shifts", for example, when the window is resized
  buttonSelectionScene.on('shift', function(event) {
    buttonSelectionScene.triggerHook(getTriggerHook());
  });

  // Slick Slider for mobile only
  const $slickContainer = $('.capabilities-card-container-mobile'); 
  $slickContainer.slick({
    arrows: false,            // no arrow buttons rendered, making swiping the only navigation option
    centerMode: true,         // ensures the slider always "lands" with {slidesToShow} slide(s) centered in the viewport
    infinite: false,
    slidesToShow: 1,          // other slides may be partially visible but only 1 is guaranteed to be in full view whenever the slider "lands"
    slidesToScroll: 1,        
    swipeToSlide: true,       // allows user the option to "scrub" through visible cards, regardless of the slidesToScroll setting 
    variableWidth: true,      // allows slides to maintain fixed width by preventing slick from setting slide width dynamically
  });
  
});