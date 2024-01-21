//Вспомогательные функции
// Удаление в контейнере классов по маске
function parentContainer(container, modifier) {
  const element = document.querySelector(container);

  return function () {
    if (element !== null) {
      element.classList.forEach(item => {
        if (item.includes(modifier)) {
          removeClass(element, item);
        }
      });

      const childs = element.querySelectorAll(`*[class*="${modifier}"]`);

      childs.forEach(child => {
        child.classList.forEach(item => {
          if (item.includes(modifier)) {
            removeClass(child, item);
          }
        });
      });
    }
    return element;
  }

} // Вспомогательные функции

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

parentContainer('.page__body', '--nojs'); // Удалить модификаторы, для отключенного JS в браузере, во всем документе
