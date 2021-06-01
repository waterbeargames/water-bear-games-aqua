/* =========================================================================
   Home
   ========================================================================= */

const body = document.querySelector('body');
const header = document.querySelector('.header');
const nav = document.querySelector('.js-nav');

let navHasLogo = false;
let navHasShadow = false;

const toggleNav = () => {
  let threshold = header.clientHeight / 3;
  let scrollTop = window.pageYOffset;

  // Adds shadow at 10px from the top
  if (scrollTop > 10 && !navHasShadow) {
    nav.classList.add('no-transition');
    nav.classList.remove('nav--no-shadow');
    navHasShadow = true;
  } else if (scrollTop <= 10 && navHasShadow) {
    nav.classList.add('nav--no-shadow');
    navHasShadow = false;
  }

  // Adds logo halfway down the header
  if (scrollTop > threshold && !navHasLogo) {
    nav.classList.remove('no-transition')
    nav.classList.remove('nav--no-logo');
    navHasLogo = true;
  } else if (scrollTop <= threshold && navHasLogo) {
    nav.classList.add('nav--no-logo');
    navHasLogo = false;
  }
}

if (body.classList.contains('page-index')) {
  toggleNav();
  window.addEventListener('scroll', toggleNav);
}
