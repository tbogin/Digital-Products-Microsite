import ScrollMagic from 'scrollmagic';

$(document).ready(function() {

  const $capabilitiesPanel = $('#capabilities');
  const $designCardSubcontainer = $('.capabilities-design-card-container');

  function getDesignCardsScrollTop() {
    return $capabilitiesPanel.offset().top;
  }

  function getDevCardsScrollTop() {
    /* the calculation below aligns the top of the first left-hand dev card with the top of the "Development Capabilities" button */
    return $capabilitiesPanel.offset().top + ($designCardSubcontainer.height() / 2) + 58; 
  }
  
  function selectCapabilityGroup(type) {
    if (type !== 'design' && type !== 'development') {
      return;
    }
    let newScrollTop = (type === 'development') ? getDevCardsScrollTop() : getDesignCardsScrollTop();
    $(window)
      .scrollTop(newScrollTop)
      .promise()
      .then( highlightSelectedButton(type) );
  }

  function highlightSelectedButton(type) {
    if (type !== 'design' && type !== 'development') {
      return;
    }
    $('#button-design-capabilities').removeClass('active');
    $('#button-development-capabilities').removeClass('active');
    $(`#button-${type}-capabilities`).addClass('active');
    $(`#button-${type}-capabilities`).focus();
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
    triggerHook: 0.8
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
    const devButtonOffset = $('.capabilities-main-text-col').outerHeight() - ($('#button-development-capabilities').outerHeight() + 60);
    const windowHeight = $(window).outerHeight();
    return devButtonOffset / windowHeight;
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
      highlightSelectedButton('design');
    }
  ).on('leave', function() {
      highlightSelectedButton('development');
    }
  );

  // Reset triggerHook dynamically when the scene "shifts", for example, when the window is resized
  buttonSelectionScene.on('shift', function(event) {
    buttonSelectionScene.triggerHook(getTriggerHook());
  });

});