import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions} from './modules/accordion/init-accordion';
import {ScrollLock} from './utils/scroll-lock';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  window.scrollLock = new ScrollLock();
  initAccordions();

  const headerMenuButton = document.querySelector('.header__menu-button');
  const headerMenuWrapper = document.querySelector('.header__menu-wrapper');
  const header = document.querySelector('.header');
  const dropdown = document.querySelectorAll('.dropdown');
  const heroPagination = document.querySelector('.hero__pagination-wrapper');

  if (headerMenuWrapper && headerMenuButton && header && heroPagination) {
    const onClickOverlayCloseMenu = (evt) => {
      if (!evt.target.closest('.header__menu-button') && !evt.target.closest('.header__menu')) {
        headerMenuWrapper.classList.toggle('opened');

        if (headerMenuWrapper.classList.contains('opened')) {
          window.scrollLock.disableScrolling();
          headerMenuButton.setAttribute('aria-label', 'Закрыть меню навигации.');
          document.addEventListener('click', onClickOverlayCloseMenu, false);
        } else {
          window.scrollLock.enableScrolling();
          headerMenuButton.setAttribute('aria-label', 'Открыть меню навигации.');
          document.removeEventListener('click', onClickOverlayCloseMenu, false);
        }
      }
    };

    headerMenuButton.addEventListener('click', () => {
      headerMenuWrapper.classList.toggle('opened');

      if (headerMenuWrapper.classList.contains('opened')) {
        window.scrollLock.disableScrolling();
        headerMenuButton.setAttribute('aria-label', 'Закрыть меню навигации.');
        document.addEventListener('click', onClickOverlayCloseMenu, false);
      } else {
        window.scrollLock.enableScrolling();
        headerMenuButton.setAttribute('aria-label', 'Открыть меню навигации.');
        document.removeEventListener('click', onClickOverlayCloseMenu, false);
      }
    });
  }

  if (dropdown) {
    dropdown.forEach((dropdownInstance) => {
      const dropdownWrapper = dropdownInstance.querySelector('.dropdown__wrapper');
      const dropdownList = dropdownInstance.querySelector('.dropdown__list');
      const dropdownText = dropdownInstance.querySelector('.dropdown__text');

      if (dropdownWrapper && dropdownList && dropdownText) {

        dropdownWrapper.addEventListener('click', () => {
          dropdownList.classList.toggle('is-open');
        });

        dropdownList.addEventListener('click', (evt) => {
          if (evt.target.closest('.dropdown__item') && evt.target.tagName === 'INPUT') {
            dropdownText.textContent = evt.target.closest('.dropdown__item').querySelector('span').textContent;
            dropdownList.classList.toggle('is-open');
          }
        });
      }
    });
  }


  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
