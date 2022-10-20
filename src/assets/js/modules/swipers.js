import Swiper from '../libs/swiper-bundle.min';
import changeActiveClass from './changeActiveClass';
import cardsActivate from './cards';
import { animationSlideElements } from './gsap-animations';

const TABLET_WIDTH = 768;
const DESKTOP_WIDTH = 1366;

const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
  ? Math.min(window.innerWidth, document.documentElement.clientWidth)
  : window.innerWidth
  || document.documentElement.clientWidth
  || document.getElementsByTagName('body')[0].clientWidth;

const reloader = () => {
  // Reloader
  window.addEventListener('resize', () => {
    const DEVICE_WIDTH_RESIZE = window.innerWidth && document.documentElement.clientWidth
      ? Math.min(window.innerWidth, document.documentElement.clientWidth)
      : window.innerWidth
      || document.documentElement.clientWidth
      || document.getElementsByTagName('body')[0].clientWidth;

    if (DEVICE_WIDTH !== DEVICE_WIDTH_RESIZE && Math.abs(DEVICE_WIDTH - DEVICE_WIDTH_RESIZE) > 100) {
      document.location.reload();
    }
  });
};

export { reloader };

const animationSlideBottom = (swiperSlider, mode = 1) => {
  if (mode === 1) {
    changeActiveClass(swiperSlider.slides, 'remove', 'translated');
    changeActiveClass(swiperSlider.slides, 'add', 'transition');
  } else {
    changeActiveClass(swiperSlider.slides, 'remove', 'transition');
    changeActiveClass(swiperSlider.slides, 'add', 'translated');
  }
};

const changeTab = (swiperSlider, numbers = [], texts = []) => {
  const index = swiperSlider.activeIndex ?? 0;

  if (numbers[index] && texts[index]) {
    changeActiveClass(numbers);
    numbers[index].classList.add('active');

    changeActiveClass(texts);
    texts[index].classList.add('active');
  }
};

const swiperInit = (swiperItem, attr = {}) => {
  // Sliders destroy
  if (swiperItem.classList.contains('rooms__slider') && (DEVICE_WIDTH >= TABLET_WIDTH)) {
    return;
  }

  if (swiperItem.classList.contains('types__slider') && (DEVICE_WIDTH >= TABLET_WIDTH && DEVICE_WIDTH < DESKTOP_WIDTH)) {
    cardsActivate('types', '.types__slide');

    return;
  }

  if (swiperItem.classList.contains('cards__slider') && (DEVICE_WIDTH > TABLET_WIDTH)) {
    return;
  }

  const newAttr = { ...attr };

  let prevButton = null;
  let nextButton = null;
  let pagination = null;

  const swiperArgs = {
    slidesPerView: 1,
    spaceBetween: 0,
    resizeObserver: true,
    speed: 500,
  };

  prevButton = swiperItem.closest('section').querySelector('.swiper-button-prev');
  nextButton = swiperItem.closest('section').querySelector('.swiper-button-next');

  // Половинчатые двойные (картинка + текст) слайдеры СТАРТ
  if (swiperItem.classList.contains('cards__slider') ||
    swiperItem.classList.contains('team__slider') ||
    swiperItem.classList.contains('rooms__slider') ||
    swiperItem.classList.contains('spa__slider') ||
    swiperItem.classList.contains('types__slider') || swiperItem.classList.contains('prices__slider')
  ) {
    if (DEVICE_WIDTH < DESKTOP_WIDTH) {
      swiperArgs.speed = 1200;
    }
  }
  // Половинчатые двойные (картинка +  текст) слайдеры КОНЕЦ

  // Cards slider
  if (swiperItem.classList.contains('cards__slider')) {
    pagination = swiperItem.closest('.cards__item').querySelector('.swiper-pagination');
  }

  // Food slider
  if (swiperItem.classList.contains('food__slider')) {
    swiperArgs.autoplay = {
      delay: 5000,
      stopOnLastSlide: true,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    };

    if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
      swiperArgs.spaceBetween = 75;
    }
  }

  // Doings slider
  if (swiperItem.classList.contains('doings__slider')) {
    if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
      swiperArgs.spaceBetween = 270;
    }
  }

  // Gallery slider
  if (swiperItem.classList.contains('gallery__slider')) {
    newAttr.breakpoints = {
      // when window width is >= 768px
      768: {
        spaceBetween: 36,
        navigation: {
          nextEl: nextButton,
          prevEl: prevButton,
        },
      },
      // when window width is >= 1366px
      1366: {
        spaceBetween: 320,
        navigation: {
          nextEl: nextButton,
          prevEl: prevButton,
        },
      },
    };
  }

  // Types slider
  if (swiperItem.classList.contains('types__slider')) {
    if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
      swiperArgs.loop = true;
      swiperArgs.slidesPerView = 3;
      swiperArgs.spaceBetween = 40;
    }
  }

  // Team slider
  if (swiperItem.classList.contains('team__slider')) {
    if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
      swiperArgs.spaceBetween = 51;
      swiperArgs.slidesPerView = 3;
      swiperArgs.loop = true;
    }
  }

  // Autoplay + fade sliders
  if (swiperItem.classList.contains('banquet__slider')
    || swiperItem.classList.contains('mission__slider')
    || swiperItem.classList.contains('seating__slider')) {
    newAttr.effect = 'fade';
    newAttr.fadeEffect = {
      crossFade: true,
    };

    if (DEVICE_WIDTH > TABLET_WIDTH) {
      newAttr.autoplay = {
        delay: 5000,
      };
    }
  }

  // Autoplay sliders
  if (swiperItem.classList.contains('spa__slider')
    || swiperItem.classList.contains('gym__slider')
    || swiperItem.classList.contains('prices__slider')) {
    if (DEVICE_WIDTH > TABLET_WIDTH) {
      newAttr.autoplay = {
        delay: 5000,
      };
    }
  }

  if (!pagination) {
    pagination = swiperItem.closest('section').querySelector('.swiper-pagination');
  }

  if (pagination) {
    swiperArgs.pagination = {
      el: pagination,
      clickable: true,
    };
  }

  if (prevButton && nextButton) {
    swiperArgs.breakpoints = {
      // when window width is >= 1366px
      1366: {
        navigation: {
          nextEl: nextButton,
          prevEl: prevButton,
        },
      },
    };
  }

  const swiperArgsMerged = {
    ...swiperArgs,
    ...newAttr,
  };

  const swiperSlider = new Swiper(swiperItem, swiperArgsMerged);

  // Половинчатые двойные (картинка +  текст) слайдеры СТАРТ
  // Doings slider
  if (swiperItem.classList.contains('doings__slider')) {
    if (DEVICE_WIDTH < DESKTOP_WIDTH) {
      animationSlideElements(swiperSlider, '.doings__top', '.doings__bottom');

      swiperSlider.on('beforeTransitionStart', () => {
        animationSlideElements(swiperSlider, '.doings__top', '.doings__bottom');
      });
    } else if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
      let maxHeightSlide = 0;

      swiperSlider.slides.forEach((slide) => {
        if (slide.offsetHeight > maxHeightSlide) {
          maxHeightSlide = slide.offsetHeight;
        }
      });

      swiperSlider.el.style.minHeight = `${maxHeightSlide}px`;

      // Слайдер с меняющимся заголовком
      let lastTimeout;
      swiperSlider.on('beforeTransitionStart', () => {
        animationSlideBottom(swiperSlider, 1);

        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }

        lastTimeout = setTimeout(() => {
          animationSlideBottom(swiperSlider, 2);
        }, 500);
      });
    }
  }

  // Team slider
  if (swiperItem.classList.contains('team__slider')) {
    if (DEVICE_WIDTH < DESKTOP_WIDTH) {
      animationSlideElements(swiperSlider, '.team__top', '.team__bottom');

      swiperSlider.on('beforeTransitionStart', () => {
        animationSlideElements(swiperSlider, '.team__top', '.team__bottom');
      });
    }
  }

  // Rooms slider
  if (swiperItem.classList.contains('rooms__slider')) {
    if (DEVICE_WIDTH < TABLET_WIDTH) {
      animationSlideElements(swiperSlider, '.room__top', '.room__bottom');

      swiperSlider.on('beforeTransitionStart', () => {
        animationSlideElements(swiperSlider, '.room__top', '.room__bottom');
      });
    }
  }

  // Types slider
  if (swiperItem.classList.contains('types__slider')) {
    if (DEVICE_WIDTH < TABLET_WIDTH) {
      animationSlideElements(swiperSlider, '.types__top', '.types__bottom');

      swiperSlider.on('beforeTransitionStart', () => {
        animationSlideElements(swiperSlider, '.types__top', '.types__bottom');
      });
    }
  }

  // Spa slider
  if (swiperItem.classList.contains('spa__slider')) {
    if (DEVICE_WIDTH < TABLET_WIDTH) {
      animationSlideElements(swiperSlider, '.spa__top', '.spa__bottom');

      swiperSlider.on('beforeTransitionStart', () => {
        animationSlideElements(swiperSlider, '.spa__top', '.spa__bottom');
      });
    }
  }

  // Conference
  if (swiperItem.classList.contains('seating__slider')) {
    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      animationSlideElements(swiperSlider, '.seating__bottom', '.seating__top', 2);

      swiperSlider.on('beforeTransitionStart', () => {
        animationSlideElements(swiperSlider, '.seating__bottom', '.seating__top', 2);
      });
    }
  }

  if (swiperItem.classList.contains('prices__slider')) {
    animationSlideElements(swiperSlider, '.prices__top', '.prices__bottom');

    swiperSlider.on('beforeTransitionStart', () => {
      animationSlideElements(swiperSlider, '.prices__top', '.prices__bottom');
    });
  }
  // Половинчатые двойные (картинка +  текст) слайдеры КОНЕЦ

  // Food sliders
  if (swiperItem.classList.contains('food__slider')) {
    const foodNumberTabs = swiperItem.closest('section').querySelectorAll('.food__tab-number');
    const foodTextTabs = swiperItem.closest('section').querySelectorAll('.food__tab-text');

    if (foodNumberTabs.length > 0 && foodTextTabs.length > 0) {
      changeTab(swiperSlider, foodNumberTabs, foodTextTabs);

      swiperSlider.on('slideChange', () => {
        changeTab(swiperSlider, foodNumberTabs, foodTextTabs);
      });
    }
  }

  if (swiperItem.classList.contains('cards__slider')) {
    if (DEVICE_WIDTH < DESKTOP_WIDTH) {
      animationSlideElements(swiperSlider, '.cards__img-wrapper', '.cards__content');

      swiperSlider.on('beforeTransitionStart', () => {
        animationSlideElements(swiperSlider, '.cards__img-wrapper', '.cards__content');
      });
    }
  }


  // Переход к следующему/предыдущему слайду по клику
  swiperSlider.on('click', (_, touchEvent) => {
    if (swiperSlider.clickedSlide.classList.contains('swiper-slide-active') && touchEvent.target.tagName !== 'A') {
      swiperSlider.slidePrev();
    } else if (touchEvent.target.tagName !== 'A') {
      swiperSlider.slideNext();
    }
  });

  return swiperSlider;
};

export { swiperInit };

const eventSliderInit = (eventSliderImages = null) => {
  if (eventSliderImages) {
    const attrImages = {
      speed: 1200,
    };

    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      attrImages.speed = 500;
    }

    if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
      if (eventSliderImages.classList.contains('event__slider--group')) {
        attrImages.spaceBetween = 246;
      } else if (!eventSliderImages.classList.contains('event__slider--around') && !eventSliderImages.classList.contains('event__slider--attraction') && !eventSliderImages.classList.contains('event__slider--saunas')) {
        attrImages.spaceBetween = 280;
      }
    }

    const imagesEventSlider = swiperInit(eventSliderImages, attrImages);

    // Слайдер с меняющимся заголовком
    if (eventSliderImages.classList.contains('event__slider--coffee') || eventSliderImages.classList.contains('event__slider--halls')) {
      let lastTimeout;
      imagesEventSlider.on('beforeTransitionStart', () => {
        animationSlideBottom(imagesEventSlider, 1);

        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }

        lastTimeout = setTimeout(() => {
          animationSlideBottom(imagesEventSlider, 2);
        }, 700);
      });
    }

    const eventSliderText = eventSliderImages.closest('.event').querySelector('.event__slider--text');

    if (eventSliderText) {
      let attrText = {
        speed: 1200,
        spaceBetween: 40,
        breakpoints: {
          // when window width is >= 1366px
          1366: {
          },
        },
      };

      if (DEVICE_WIDTH >= TABLET_WIDTH) {
        attrText = {
          speed: 500,
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          breakpoints: {
            // when window width is >= 1366px
            1366: {
            },
          },
        };
      }

      const textEventSlider = swiperInit(eventSliderText, attrText);

      textEventSlider.on('slideChange', () => {
        imagesEventSlider.slideTo(textEventSlider.activeIndex);
      });

      imagesEventSlider.on('slideChange', () => {
        textEventSlider.slideTo(imagesEventSlider.activeIndex);
      });
    }
  }
};

export { eventSliderInit };

const featuresSliderInit = (featuresIconsSlider = null) => {
  if (featuresIconsSlider && DEVICE_WIDTH < TABLET_WIDTH) {
    const swiperArgs = {
      slidesPerView: 2,
      spaceBetween: 24,
      grid: {
        rows: 2,
        fill: 'row',
      },
    };

    const pagination = featuresIconsSlider.closest('section').querySelector('.swiper-pagination');

    if (pagination) {
      swiperArgs.pagination = {
        el: pagination,
        clickable: true,
      };
    }

    const featuresSwiper = new Swiper(featuresIconsSlider, swiperArgs);

    featuresSwiper.on('click', () => {
      if (featuresSwiper.clickedSlide.classList.contains('swiper-slide-active')) {
        featuresSwiper.slidePrev();
      } else {
        featuresSwiper.slideNext();
      }
    });
  }
};

export { featuresSliderInit };

export default () => {
  // Swipers not Events slider
  const swipers = document.querySelectorAll('.swiper:not(.event__slider)');

  swipers.forEach((swiperItem) => {
    swiperInit(swiperItem);
  });

  // Events sliders
  const eventSlidersImages = document.querySelectorAll('.event__slider--images');

  if (eventSlidersImages.length > 0) {
    eventSlidersImages.forEach((eventSliderImages) => {
      eventSliderInit(eventSliderImages);
    });
  }

  // Standart
  const featuresIconsSlider = document.querySelector('.features__icons');

  featuresSliderInit(featuresIconsSlider);
};
