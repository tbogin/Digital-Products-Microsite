console.log('inside nav');
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