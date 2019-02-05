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