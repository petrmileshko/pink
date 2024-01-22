//Вспомогательные функции
// Удаление в контейнере классов по маске
function removeClass(element, selector) {
  if (element.classList.contains(selector)) {
    element.classList.remove(selector);
  }
}

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
function menuMobile(container, menu, control) {
  const containerElement = document.querySelector(container.element);
  const menuElement = document.querySelector(menu.element);
  const controlElement = document.querySelector(control.element);

  return function () {
    if (containerElement !== null && menuElement !== null && controlElement !== null) {

      controlElement.addEventListener('click', (e) => {
        e.preventDefault();
        containerElement.classList.toggle(container.activation);
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

const initMobileMenu = menuMobile(
  {
    element: '.page-header',
    activation: 'page-header--opened'
  },
  {
  element: '.site-menu',
  activation: 'site-menu--opened'
}, {
  element: '.burger',
  activation: 'burger--opened'
});

initMobileMenu();
//Бургер окончание

// Слайдер
function runSlides(container) {

  const moveBack = container.querySelector('.slider__button--prev');
  const moveForward = container.querySelector('.slider__button--next');
  const slides = container.querySelectorAll('.slider__item');
  let totalSlides;
  if (moveBack !== null && moveForward !== null && slides.length) {
    totalSlides = slides.length;
    moveBack.addEventListener('click', e => {
      e.preventDefault();
      showPrevious();
    });

    moveForward.addEventListener('click', e => {
      e.preventDefault();
      showNext();
    });
  }

  function showNext() {
    let newIndex;
    slides[slideIndex].dataset.slider = '';
    newIndex = (slideIndex < (totalSlides - 1)) ? slideIndex + 1 : 0;
    slides[newIndex].dataset.slider = 'active';
    slideIndex = newIndex;
  }

  function showPrevious() {
    let newIndex;
    slides[slideIndex].dataset.slider = '';
    newIndex = (slideIndex > 0) ? slideIndex - 1 : (totalSlides - 1);
    slides[newIndex].dataset.slider = 'active';
    slideIndex = newIndex;
  }
}

const initTestimonialsSlider = parentContainer('.slider', '--nojs'); // первый параметр класс родительского контейнера, второй модификатор который надо удалить у дочерних

const sliderTestimonials = initTestimonialsSlider();
let slideIndex = 0;

runSlides(sliderTestimonials);


const initTariffsSlider = parentContainer('.tariffs', '--nojs');
const sliderTariffs = initTariffsSlider();
