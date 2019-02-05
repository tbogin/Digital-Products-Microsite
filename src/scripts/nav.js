var _contentScript = {
  init: function() {
    "use strict";

    // Desktop Scroll State Navigation
    window.addEventListener("scroll", event => {
      let mainLink = document.querySelectorAll(".dp-nav ul li a");
      let fromTop = window.scrollY;

      mainLink.forEach(link => {
        
        let section = document.querySelector(link.hash);

        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight >= fromTop 
        ) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }

        // Section-specific animations
        if (section.id === 'capabilities') {
          capabilitiesSection.animateSection();
        }

      });
    });

    // Mobile NavBar
    document.addEventListener('DOMContentLoaded', function() {
      M.AutoInit();
    });


  }
};

_contentScript.init();

// Mobile Sidebar active link
$(document).ready(function(){
  $('.sidenav li a').click(function(){
    $('li a').removeClass("active");
    $(this).addClass("active");
  });
});


// Capabilities Section animations that should run when the section scrolls into view
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
