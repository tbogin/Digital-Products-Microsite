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

});

let capabilitiesSection = {
  mainTextAnimatedAlready: false,
  animateMainText: function() {
    $('.capabilities-section .capabilities-main-text-col .caption').addClass('fade-in-elem');
    $('.capabilities-section .capabilities-main-text-col .heading-2').addClass('fade-in-elem');
    $('.capabilities-section .capabilities-main-text-col .body-text-2').addClass('fade-in-elem');
    $('.capabilities-section .capabilities-main-text-col .button-inset').addClass('fade-in-elem');
    $('.capabilities-section .capabilities-main-text-col .button-inset').addClass('fade-in-elem');
    this.mainTextAnimatedAlready = true;
  },
  animateSection: function() {
    if (!this.mainTextAnimatedAlready) {
      this.animateMainText();
    }
  }
};
export default capabilitiesSection;