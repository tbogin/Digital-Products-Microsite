import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

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
  })
    .addTo(controller)
    .on('progress', event => {
      capabilitiesSection.animateMainText();
    });

  const sectionScene = new ScrollMagic.Scene({
    triggerElement: '#capabilities',
    duration: 0,
    triggerHook: 0
  })
    .addTo(controller)
    .on('progress', event => {
      capabilitiesSection.changeCardScrollable();
    });
});

let capabilitiesSection = {
  // mainTextAnimatedAlready: false,
  // initialTilesAnimationDone: false,
  animateMainText: function() {
    $('.capabilities-section .capabilities-main-text-col .caption').addClass('fade-in-elem');
    $('.capabilities-section .capabilities-main-text-col .heading-2').addClass('fade-in-elem');
    $('.capabilities-section .capabilities-main-text-col .body-text-2').addClass('fade-in-elem');
    $('.capabilities-section .capabilities-main-text-col .button-inset').addClass('fade-in-elem');
    $('.capabilities-card-container .card').addClass('first-animation');
    // this.mainTextAnimatedAlready = true;
  },

  changeCardScrollable: function() {
    $('.capabilities-card-container').addClass('scrollable');
  }
  /*  ScrollMagic take care of animation on first scroll
      Below two function can be removed if no longer needed elsewhere 
  */

  // animateTilesOnFirstScroll: function() {
  //   console.log('animateTilesOnFirstScroll is called');
  //   $('.capabilities-card-container .card').addClass('first-animation');
  //   this.initialTilesAnimationDone = true;
  // },
  // animateSection: function() {
  //   // console.log('animateSection is called');
  //   if (!this.mainTextAnimatedAlready) {
  //     this.animateMainText();
  //   }
  //   if (!this.initialTilesAnimationDone) {
  //     this.animateTilesOnFirstScroll();
  //   }
  // }
};

export default capabilitiesSection;
