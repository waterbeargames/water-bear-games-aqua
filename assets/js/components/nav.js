/* =========================================================================
   Navigation
   ========================================================================= */

// Open/close menu for small screens

const openTrigger = document.querySelector('.js-open-menu');
const closeTrigger = document.querySelector('.js-close-menu');
const menu = document.querySelector('.js-menu');

openTrigger.addEventListener('click', e => {
  menu.classList.remove('no-transition');

  setTimeout(() => {
    document.body.classList.add('no-scroll');
    openTrigger.classList.remove('nav__open-menu--show');
    closeTrigger.classList.add('nav__close-menu--show');
    menu.classList.add('nav__menus--show');
  }, 10);
});

closeTrigger.addEventListener('click', e => {
  document.body.classList.remove('no-scroll');
  openTrigger.classList.add('nav__open-menu--show');
  closeTrigger.classList.remove('nav__close-menu--show');
  menu.classList.remove('nav__menus--show');

  setTimeout(() => { menu.classList.add('no-transition'); }, 400);
});
