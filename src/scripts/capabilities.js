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

  const capabilitiesController = new ScrollMagic.Controller();
  const initialAnimationScene = new ScrollMagic.Scene({
    triggerElement: '.capabilities-card-container',
    duration: 0,
    triggerHook: 0.8
  }).addTo(capabilitiesController)
    .on('progress', event => {
      capabilitiesSection.animateSection();
    }
  );
  // @TODO: scrollmagic scene to toggle selected button states based on scroll position

});

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