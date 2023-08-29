import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions} from './modules/accordion/init-accordion';
import {ScrollLock} from './utils/scroll-lock';
import {CustomSelect} from './modules/select/custom-select';
import {FocusLock} from './utils/focus-lock';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  iosVhFix();

  window.scrollLock = new ScrollLock();
  window.focusLock = new FocusLock();
  initAccordions();

  const headerMenuButton = document.querySelector('.header__menu-button');
  const headerMenuWrapper = document.querySelector('.header__menu-wrapper');
  const headerMenu = document.querySelector('.header__menu');
  const header = document.querySelector('.header');
  const heroPagination = document.querySelector('.hero__pagination-wrapper');
  const customSelectList = document.querySelectorAll('.custom-select__list');
  const feedbackFormButton = document.querySelector('.feedback__form-wrapper button[type="submit"]');
  const feedbackForm = document.querySelector('.feedback__form-wrapper form');
  const modalFormButton = document.querySelector('.modal__form-wrapper button[type="submit"]');
  const modalForm = document.querySelector('.modal__form-wrapper form');

  if (headerMenuWrapper && headerMenuButton && header && heroPagination && headerMenu) {
    const onClickOverlayCloseMenu = (evt) => {
      if (!evt.target.closest('.header__menu-button') && !evt.target.closest('.header__menu')) {
        headerMenuWrapper.classList.toggle('opened');

        if (headerMenuWrapper.classList.contains('opened')) {
          window.scrollLock.disableScrolling();
          window.focusLock.lock('.header__menu-wrapper');
          headerMenuButton.setAttribute('aria-label', 'Закрыть меню навигации.');
          document.addEventListener('click', onClickOverlayCloseMenu, false);
        } else {
          window.scrollLock.enableScrolling();
          headerMenuButton.setAttribute('aria-label', 'Открыть меню навигации.');
          document.removeEventListener('click', onClickOverlayCloseMenu, false);
          window.focusLock.unlock();
        }
      }
    };

    headerMenu.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'A') {
        headerMenuWrapper.classList.toggle('opened');

        if (headerMenuWrapper.classList.contains('opened')) {
          window.scrollLock.disableScrolling();
          window.focusLock.lock('.header__menu-wrapper');
          headerMenuButton.setAttribute('aria-label', 'Закрыть меню навигации.');
          document.addEventListener('click', onClickOverlayCloseMenu, false);
        } else {
          window.scrollLock.enableScrolling();
          headerMenuButton.setAttribute('aria-label', 'Открыть меню навигации.');
          document.removeEventListener('click', onClickOverlayCloseMenu, false);
          window.focusLock.unlock();
        }
      }
    });

    headerMenuButton.addEventListener('click', () => {
      headerMenuWrapper.classList.toggle('opened');

      if (headerMenuWrapper.classList.contains('opened')) {
        window.scrollLock.disableScrolling();
        window.focusLock.lock('.header__menu-wrapper');
        headerMenuButton.setAttribute('aria-label', 'Закрыть меню навигации.');
        document.addEventListener('click', onClickOverlayCloseMenu, false);
      } else {
        window.scrollLock.enableScrolling();
        headerMenuButton.setAttribute('aria-label', 'Открыть меню навигации.');
        document.removeEventListener('click', onClickOverlayCloseMenu, false);
        window.focusLock.unlock();
      }
    });
  }

  if (customSelectList) {
    customSelectList.forEach((el) => {
      el.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 13) {
          el.querySelector('[aria-selected="true"] input').checked = true;
        }
      });
    });
  }

  if (feedbackFormButton && feedbackForm) {
    feedbackFormButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (window.form.validateForm(feedbackForm)) {
        feedbackForm.submit();
        feedbackForm.reset();
      }
    });
  }

  if (modalFormButton && modalForm) {
    modalFormButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (window.form.validateForm(modalForm)) {
        modalForm.submit();
        modalForm.reset();
      }
    });
  }

  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
    const select = new CustomSelect();
    select.init();
  });
});
