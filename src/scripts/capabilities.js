import ScrollMagic from 'scrollmagic';

$(document).ready(function() {
  function selectCapabilityGroup(type) {
    if (type !== 'design' && type !== 'development') {
      return;
    }
    $('#button-design-capabilities').removeClass('active');
    $('#button-development-capabilities').removeClass('active');
    $(`#button-${type}-capabilities`).addClass('active');

    // Logic for displaying relevant cards will go here
  }

  $('#button-design-capabilities').on('click', function(event) {
    selectCapabilityGroup('design');
  });

  $('#button-development-capabilities').on('click', function() {
    selectCapabilityGroup('development');
  });

  // Init ScrollMagic
  const controller = new ScrollMagic.Controller();
  const cardScene = new ScrollMagic.Scene({
    triggerElement: '.capabilities-card-container',
    duration: 0,
    triggerHook: 0.8
  }).addTo(controller)
    .on('progress', event => {
      capabilitiesSection.animateSection();
    }
  );
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

export default capabilitiesSection;
