import Swiper from './vendor/swiper';
import './vendor/focus-visible-polyfill';

export const heroSlider = new Swiper('.hero', {
  slidesPerView: 'auto',
  effect: 'fade',
  allowTouchMove: false,

  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },

  pagination: {
    el: '.hero .swiper-pagination',
    clickable: true,
  },
});

export const curriculumSlider = new Swiper('.curriculum__slider', {
  slidesPerView: 1,
  spaceBetween: 15,

  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },

  pagination: {
    el: '.curriculum .swiper-pagination',
    type: 'progressbar',
  },

  navigation: {
    nextEl: '.curriculum__nav-button.swiper-button-next',
    prevEl: '.curriculum__nav-button.swiper-button-prev',
  },
});

const breakpoint = window.matchMedia('(min-width:1200px)');

export let newsSlider = new Swiper('.news__slider', {
  slidesPerView: 1,
  spaceBetween: 32,
  init: false,

  grid: {
    rows: 2,
  },

  pagination: {
    el: '.news__slider-pagination',
    clickable: true,
    renderBullet: (index, className) => {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },

  navigation: {
    nextEl: '.news__slider-button--next',
    prevEl: '.news__slider-button--prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
});

if (!breakpoint.matches) {
  newsSlider.init();
} else {
  newsSlider = new Swiper('.news__slider', {
    slidesPerView: 'auto',
    spaceBetween: 32,

    pagination: {
      el: '.news__slider-pagination',
      clickable: true,
      renderBullet: (index, className) => {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },

    navigation: {
      nextEl: '.news__slider-button--next',
      prevEl: '.news__slider-button--prev',
    },
  });
}

breakpoint.addEventListener('change', (evt) => {
  if (!evt.matches) {
    newsSlider = new Swiper('.news__slider', {
      slidesPerView: 1,
      spaceBetween: 32,

      grid: {
        rows: 2,
      },

      pagination: {
        el: '.news__slider-pagination',
        clickable: true,
        renderBullet: (index, className) => {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },

      navigation: {
        nextEl: '.news__slider-button--next',
        prevEl: '.news__slider-button--prev',
      },

      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    });
  } else {
    newsSlider.destroy();
    newsSlider = new Swiper('.news__slider', {
      slidesPerView: 'auto',
      spaceBetween: 32,

      pagination: {
        el: '.news__slider-pagination',
        clickable: true,
        renderBullet: (index, className) => {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },

      navigation: {
        nextEl: '.news__slider-button--next',
        prevEl: '.news__slider-button--prev',
      },
    });
  }
});
