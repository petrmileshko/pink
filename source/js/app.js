// Бургер
function menuMobile(menu, control) {
  const menuElement = document.querySelector(menu.element);
  const controlElement = document.querySelector(control.element);

  return function () {
    if (menuElement !== null && controlElement !== null) {

      controlElement.addEventListener('click', (e) => {
        e.preventDefault();
        menuElement.classList.toggle(menu.activation);
        controlElement.classList.toggle(control.activation);
      });

      if (/apple/i.test(navigator.vendor)) {
        controlElement.addEventListener('focus', (e) => {
          e.preventDefault();
        });
      }
    }
  }
}

const initMobileMenu = menuMobile({
  element: '.site-menu',
  activation: 'site-menu--opened'
}, {
  element: '.burger',
  activation: 'burger--opened'
});

initMobileMenu();
//Бургер окончание
