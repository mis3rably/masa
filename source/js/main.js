import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions} from './modules/accordion/init-accordion';
import {ScrollLock} from './modules/scroll-lock/scroll-lock';
import {newsSlider} from './vendor';

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
  const newsFilterList = document.querySelector('.news__filter-list');
  const newsSlidesContainer = document.querySelector('.news__slider .swiper-wrapper');
  const newsSlidesList = document.querySelectorAll('.news__slider .swiper-slide');

  const sortingNews = (a, b) => {
    if (a.querySelector('time').dateTime.replace('-', '') > b.querySelector('time').dateTime.replace('-', '')) {
      return -1;
    } else if (a.querySelector('time').dateTime.replace('-', '') === b.querySelector('time').dateTime.replace('-', '')) {
      return 0;
    } else {
      return 1;
    }
  };

  if (headerMenuWrapper && headerMenuButton && header) {
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

  if (newsFilterList && newsSlidesList && newsSlider && newsSlidesContainer) {
    newsFilterList.addEventListener('click', (evt) => {
      if (evt.target.closest('.news__filter-button') && !evt.target.closest('.news__filter-button').classList.contains('is-active')) {
        const documentFragment = new DocumentFragment();
        const sortedDocumentFragment = new DocumentFragment();
        const pressedButton = evt.target.closest('.news__filter-button');
        const currentActiveButton = newsFilterList.querySelector('.news__filter-button.is-active');
        currentActiveButton.classList.remove('is-active');
        pressedButton.classList.add('is-active');
        let currentGroup = pressedButton.dataset.filter;
        newsSlidesContainer.replaceChildren();
        if (currentGroup === 'common') {
          newsSlidesList.forEach((el) => {
            documentFragment.append(el);
          });
          newsSlidesContainer.append(documentFragment);
        } else {
          Array.from(newsSlidesList).forEach((el) => {
            if (el.dataset.group === currentGroup) {
              documentFragment.append(el);
            }
          });
          Array.from(documentFragment.children).sort(sortingNews).forEach((el) => {
            sortedDocumentFragment.appendChild(el.cloneNode(true));
          });
          newsSlidesContainer.append(sortedDocumentFragment);
        }
        newsSlider.update();
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
