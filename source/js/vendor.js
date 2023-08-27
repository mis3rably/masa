import Swiper from './vendor/swiper';
import './vendor/focus-visible-polyfill';
import L from './vendor/leaflet';

const newsFilterList = document.querySelector('.news__filter-list');
const newsSlidesContainer = document.querySelector('.news__slider .swiper-wrapper');
const newsSlidesList = document.querySelectorAll('.news__slider .swiper-slide');

export const heroSlider = new Swiper('.hero', {
  slidesPerView: 'auto',
  effect: 'fade',
  loading: 'lazy',
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.hero .swiper-pagination',
    clickable: true,
  },
});

export const curriculumSlider = new Swiper('.curriculum__slider', {
  slidesPerView: 1,
  spaceBetween: 15,
  loading: 'lazy',

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

export const newsSlider = new Swiper('.news__slider', {
  slidesPerView: 1,
  spaceBetween: 20,
  loading: 'lazy',

  grid: {
    rows: 2,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
      grid: {
        rows: 2,
      },
    },

    1200: {
      slidesPerView: 'auto',
      spaceBetween: 32,
      grid: {
        rows: 1,
      },
    },
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
});

const sortingNews = (a, b) => {
  if (a.querySelector('time').dateTime.replace('-', '') > b.querySelector('time').dateTime.replace('-', '')) {
    return -1;
  } else if (a.querySelector('time').dateTime.replace('-', '') === b.querySelector('time').dateTime.replace('-', '')) {
    return 0;
  } else {
    return 1;
  }
};

if (newsFilterList && newsSlidesList && newsSlider && newsSlidesContainer) {
  const breakpoint = window.matchMedia('(min-width: 1200px)');

  window.addEventListener('resize', () => {
    if (breakpoint.matches && newsSlidesContainer.style.width !== null) {
      newsSlidesContainer.style.width = null;
    }
  });

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


export const reviewsSlider = new Swiper('.reviews__slider', {
  slidesPerView: 1,
  spaceBetween: 15,

  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
  },

  pagination: {
    el: '.reviews .swiper-pagination',
    type: 'progressbar',
  },

  navigation: {
    nextEl: '.reviews__slider-button.swiper-button-next',
    prevEl: '.reviews__slider-button.swiper-button-prev',
  },
});

const map = L.map('contacts-map').setView([55.02866, 82.92824], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const myIcon = L.icon({
  iconUrl: './img/map/marker-icon.png',
  iconRetinaUrl: './img/map/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [25, 25],
  popupAnchor: [-3, -76],
  shadowUrl: './img/map/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [25, 25],
});

L.marker([55.02866, 82.92824], {icon: myIcon}).addTo(map);
