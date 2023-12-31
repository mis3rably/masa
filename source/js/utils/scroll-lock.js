import {iosChecker} from './ios-checker';

export class ScrollLock {
  constructor() {
    this._iosChecker = iosChecker;
    this._lockClass = this._iosChecker() ? 'scroll-lock-ios' : 'scroll-lock';
    this._scrollTop = null;
    this._fixedBlockElements = document.querySelectorAll('[data-fix-block]');
  }

  _getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  _getBodyScrollTop() {
    return (
      self.pageYOffset ||
      (document.documentElement && document.documentElement.ScrollTop) ||
      (document.body && document.body.scrollTop)
    );
  }

  disableScrolling() {
    this._scrollTop = document.body.dataset.scroll = document.body.dataset.scroll ? document.body.dataset.scroll : this._getBodyScrollTop();
    this._getScrollbarWidth();
    if (this._getScrollbarWidth()) {
      document.body.style.paddingRight = `${this._getScrollbarWidth()}px`;
      if (document.querySelector('.header') && document.querySelector('.hero .swiper-pagination') && window.matchMedia('(min-width: 1420px)').matches) {
        document.querySelector('.header').style.left = `calc(50% - ${this._getScrollbarWidth()}px)`;
        document.querySelector('.header').style.translate = `calc(-50% + ${Math.round(this._getScrollbarWidth() / 2)}px) 0`;
        document.querySelector('.hero__pagination-wrapper').style.left = `calc(50% - ${this._getScrollbarWidth()}px)`;
        document.querySelector('.hero__pagination-wrapper').style.translate = `calc(-50% + ${Math.round(this._getScrollbarWidth() / 2)}px) 0`;
      }
      this._fixedBlockElements.forEach((block) => {
        block.style.paddingRight = `${this._getScrollbarWidth()}px`;
      });
    }
    document.body.style.top = `-${this._scrollTop}px`;
    document.body.classList.add(this._lockClass);
  }

  enableScrolling() {
    document.body.classList.remove(this._lockClass);
    window.scrollTo(0, +document.body.dataset.scroll);
    document.body.style.paddingRight = null;
    document.body.style.top = null;
    document.querySelector('.header').style.left = null;
    document.querySelector('.header').style.translate = null;
    document.querySelector('.hero__pagination-wrapper').style.left = null;
    document.querySelector('.hero__pagination-wrapper').style.translate = null;
    this._fixedBlockElements.forEach((block) => {
      block.style.paddingRight = null;
    });
    document.body.removeAttribute('data-scroll');
    this._scrollTop = null;
  }
}

window.scrollLock = new ScrollLock();
