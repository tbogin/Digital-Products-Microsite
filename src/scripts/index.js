import '../styles/index.scss';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';

console.log('webpack starterkit');

let mainLink = document.querySelectorAll("div ul li a");

window.addEventListener("scroll", event => {
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
