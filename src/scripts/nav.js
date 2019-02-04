// Desktop NavBar
let mainLink = document.querySelectorAll('div ul li a');

window.addEventListener('scroll', event => {
  let fromTop = window.scrollY;

  mainLink.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight >= fromTop
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Mobile NavBar
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
});
