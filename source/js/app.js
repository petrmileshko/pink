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
      return element;
    }
    return null;
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

const initMobileMenu = menuMobile({
  element: '.page-header',
  activation: 'page-header--opened'
}, {
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
  const sliderIndicators = container.querySelector('.slider__indicators');
  const slides = container.querySelectorAll('.slider__item');
  let totalSlides;

  if (moveBack !== null && moveForward !== null && slides.length && sliderIndicators !== null) {
    totalSlides = slides.length;

    moveBack.addEventListener('click', e => {
      e.preventDefault();
      showPrevious();
    });

    moveBack.addEventListener('keyDown', e => {
      e.preventDefault();
      if (e.keyDown === 'Enter') {
        showNext();
      }
    });

    moveForward.addEventListener('click', e => {
      e.preventDefault();
      showNext();
    });

    moveForward.addEventListener('keyDown', e => {
      e.preventDefault();
      if (e.keyDown === 'Enter') {
        showNext();
      }
    });

    sliderIndicators.addEventListener('click', e => {
      e.preventDefault();
      toggleSlide(e.target, sliderIndicators);
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

  function toggleSlide(item, container) {
    let newIndex;
    let toggler = container.querySelector('[data-toggler="active"]');

    if (item.dataset.toggler !== 'active' && toggler !== null) {

      newIndex = parseInt(item.dataset.toggle) - 1;
      slides[slideIndex].dataset.slider = '';
      slides[newIndex].dataset.slider = 'active';
      slideIndex = newIndex;
      if (toggler !== null) {
        toggler.dataset.toggler = ''
      }
      item.dataset.toggler = 'active';
    }
  }
}

const initTestimonialsSlider = parentContainer('.slider', '--nojs'); // первый параметр класс родительского контейнера, второй модификатор который надо удалить у дочерних
let slideIndex = 0;
const sliderTestimonials = initTestimonialsSlider();
if (sliderTestimonials !== null) {
  runSlides(sliderTestimonials);
}



const initTariffsSlider = parentContainer('.tariffs', '--nojs');
initTariffsSlider();


const headerMobile = parentContainer('.page__header', '--nojs');
headerMobile();

const mapIframe = parentContainer('.map', '--nojs');
mapIframe();


// Маска для телефона
function initPhoneMasks(selector, options) {
  let phoneInputs = document.querySelectorAll(selector);

  if (phoneInputs.length) {
    return function () {
      phoneInputs.forEach((item) => {
        IMask(item, options);
      });
    }
  } else {
    return false;
  }
}

const phoneFiledsInit = initPhoneMasks('[name="your-phone"]', {
  mask: '+{7}(000) 000-00-00',
  lazy: true
});

if (phoneFiledsInit !== false) {
  phoneFiledsInit();
}
