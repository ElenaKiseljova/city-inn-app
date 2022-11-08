import Swiper from '../libs/swiper-bundle.min';
import changeActiveClass from './changeActiveClass';
import cardsActivate from './cards';

const TABLET_WIDTH = 768;
const DESKTOP_WIDTH = 1366;

const DEVICE_WIDTH =
  window.innerWidth && document.documentElement.clientWidth
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName('body')[0].clientWidth;

const reloader = () => {
  // Reloader
  window.addEventListener('resize', () => {
    const DEVICE_WIDTH_RESIZE =
      window.innerWidth && document.documentElement.clientWidth
        ? Math.min(window.innerWidth, document.documentElement.clientWidth)
        : window.innerWidth ||
          document.documentElement.clientWidth ||
          document.getElementsByTagName('body')[0].clientWidth;

    if (
      DEVICE_WIDTH !== DEVICE_WIDTH_RESIZE &&
      Math.abs(DEVICE_WIDTH - DEVICE_WIDTH_RESIZE) > 100
    ) {
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
  const newAttr = { ...attr };

  let prevButton = null;
  let nextButton = null;
  let pagination = null;

  const swiperArgs = {
    slidesPerView: 1,
    spaceBetween: 0,
    resizeObserver: true,
    speed: 1200,
    // slideToClickedSlide: true,
    // rewind: true,
  };

  if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
    swiperArgs.speed = 500;
  }

  prevButton = swiperItem
    .closest('section')
    .querySelector('.swiper-button-prev');
  nextButton = swiperItem
    .closest('section')
    .querySelector('.swiper-button-next');

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

  // Gallery slider
  if (swiperItem.classList.contains('gallery__slider')) {
    newAttr.breakpoints = {
      // when window width is >= 768px
      768: {
        spaceBetween: 36,
        // navigation: {
        //   nextEl: nextButton,
        //   prevEl: prevButton,
        // },
      },
      // when window width is >= 1366px
      1366: {
        spaceBetween: 320,
        // navigation: {
        //   nextEl: nextButton,
        //   prevEl: prevButton,
        // },
      },
    };
  }

  // Autoplay + fade sliders
  if (
    swiperItem.classList.contains('banquet__slider') ||
    swiperItem.classList.contains('mission__slider')
    // || swiperItem.classList.contains('seating__slider')
  ) {
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

  if (
    DEVICE_WIDTH >= TABLET_WIDTH &&
    swiperItem.classList.contains('gym__slider')
  ) {
    newAttr.autoplay = {
      delay: 5000,
    };
  }

  if (!pagination) {
    pagination = swiperItem
      .closest('section')
      .querySelector('.swiper-pagination');
  }

  if (pagination && !swiperItem.classList.contains('dooble__slider--text')) {
    swiperArgs.pagination = {
      el: pagination,
      clickable: true,
    };
  }

  if (
    prevButton &&
    nextButton &&
    !swiperItem.classList.contains('dooble__slider--text')
  ) {
    swiperArgs.navigation = {
      nextEl: nextButton,
      prevEl: prevButton,
    };
  }

  const swiperArgsMerged = {
    ...swiperArgs,
    ...newAttr,
  };

  const swiperSlider = new Swiper(swiperItem, swiperArgsMerged);

  // Food sliders
  if (swiperItem.classList.contains('food__slider')) {
    const foodNumberTabs = swiperItem
      .closest('section')
      .querySelectorAll('.food__tab-number');
    const foodTextTabs = swiperItem
      .closest('section')
      .querySelectorAll('.food__tab-text');

    if (foodNumberTabs.length > 0 && foodTextTabs.length > 0) {
      changeTab(swiperSlider, foodNumberTabs, foodTextTabs);

      swiperSlider.on('slideChange', () => {
        changeTab(swiperSlider, foodNumberTabs, foodTextTabs);
      });
    }
  }

  swiperSlider.on('touchStart', (swiper) => {
    // console.log('touchStart');
    if (swiper.isEnd) {
      // console.log(swiper.isEnd, 'isEnd');

      swiper.allowSlideNext = false;
    } else {
      swiper.allowSlideNext = true;
    }

    if (swiper.isBeginning) {
      // console.log(swiper.isBeginning, 'isBeginning');

      swiper.allowSlidePrev = false;
    } else {
      swiper.allowSlidePrev = true;
    }
  });

  // Переход к следующему/предыдущему слайду по клику
  if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
    swiperSlider.on('click', (swiper, touchEvent) => {
      if (touchEvent.target.tagName !== 'A') {
        if (swiper.clickedSlide?.classList.contains('swiper-slide-active')) {
          swiper.slidePrev();
        } else {
          swiper.slideNext();
        }
      }
    });
  }

  return swiperSlider;
};

export { swiperInit };

// Dooble sliders
const doobleSliderInit = (doobleSliderImages = null) => {
  if (doobleSliderImages) {
    if (
      doobleSliderImages.classList.contains('cards__slider') &&
      DEVICE_WIDTH >= DESKTOP_WIDTH
    ) {
      return;
    }

    if (
      doobleSliderImages.classList.contains('rooms__slider') &&
      DEVICE_WIDTH >= TABLET_WIDTH
    ) {
      return;
    }

    if (
      doobleSliderImages.classList.contains('types__slider') &&
      DEVICE_WIDTH >= TABLET_WIDTH &&
      DEVICE_WIDTH < DESKTOP_WIDTH
    ) {
      cardsActivate('types', '.types__slide');

      return;
    }

    const pagination = doobleSliderImages
      .closest('.dooble')
      .querySelector('.swiper-pagination');

    const attrImages = {
      speed: 1200,
      pagination: {
        el: pagination,
        clickable: true,
      },
    };

    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      if (
        doobleSliderImages.classList.contains('spa__slider') ||
        doobleSliderImages.classList.contains('seating__slider') ||
        doobleSliderImages.classList.contains('prices__slider')
      ) {
        attrImages.autoplay = {
          delay: 5000,
        };
      }

      if (doobleSliderImages.classList.contains('seating__slider')) {
        attrImages.spaceBetween = 0;
      }
    }

    if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
      attrImages.speed = 500;

      if (doobleSliderImages.classList.contains('event__slider--group')) {
        attrImages.spaceBetween = 246;
      }

      if (
        !doobleSliderImages.classList.contains('event__slider--around') &&
        !doobleSliderImages.classList.contains('event__slider--attraction') &&
        !doobleSliderImages.classList.contains('event__slider--saunas')
      ) {
        attrImages.spaceBetween = 280;
      }

      if (doobleSliderImages.classList.contains('doings__slider')) {
        attrImages.spaceBetween = 270;
      }

      if (doobleSliderImages.classList.contains('team__slider')) {
        attrImages.spaceBetween = 51;
        attrImages.slidesPerView = 3;
        attrImages.loop = true;
      }

      if (doobleSliderImages.classList.contains('types__slider')) {
        attrImages.loop = true;
        attrImages.slidesPerView = 3;
        attrImages.spaceBetween = 40;
      }

      if (
        doobleSliderImages.classList.contains('seating__slider') ||
        doobleSliderImages.classList.contains('prices__slider')
      ) {
        attrImages.spaceBetween = 0;
      }

      if (doobleSliderImages.classList.contains('seating__slider')) {
        attrImages.speed = 1200;
      }
    }

    const imagesDoobleSlider = swiperInit(doobleSliderImages, attrImages);

    // Слайдер с меняющимся заголовком
    if (
      doobleSliderImages.classList.contains('event__slider--coffee') ||
      doobleSliderImages.classList.contains('event__slider--halls')
    ) {
      let lastTimeout;
      imagesDoobleSlider.on('beforeTransitionStart', () => {
        animationSlideBottom(imagesDoobleSlider, 1);

        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }

        lastTimeout = setTimeout(() => {
          animationSlideBottom(imagesDoobleSlider, 2);
        }, 700);
      });
    } else if (
      doobleSliderImages.classList.contains('doings__slider') &&
      DEVICE_WIDTH >= DESKTOP_WIDTH
    ) {
      let maxHeightSlide = 0;

      imagesDoobleSlider.slides.forEach((slide) => {
        if (slide.offsetHeight > maxHeightSlide) {
          maxHeightSlide = slide.offsetHeight;
        }
      });

      imagesDoobleSlider.el.style.minHeight = `${maxHeightSlide}px`;

      // Слайдер с меняющимся заголовком
      let lastTimeout;
      imagesDoobleSlider.on('beforeTransitionStart', () => {
        animationSlideBottom(imagesDoobleSlider, 1);

        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }

        lastTimeout = setTimeout(() => {
          animationSlideBottom(imagesDoobleSlider, 2);
        }, 500);
      });
    }

    const doobleSliderText = doobleSliderImages
      .closest('.dooble')
      .querySelector('.dooble__slider--text');

    if (doobleSliderText) {
      if (
        DEVICE_WIDTH >= DESKTOP_WIDTH &&
        (doobleSliderText.classList.contains('doings__slider') ||
          doobleSliderText.classList.contains('team__slider'))
      ) {
        return imagesDoobleSlider;
      }

      if (
        DEVICE_WIDTH >= TABLET_WIDTH &&
        (doobleSliderText.classList.contains('types__slider') ||
          doobleSliderText.classList.contains('spa__slider'))
      ) {
        return imagesDoobleSlider;
      }

      let attrText = {
        speed: 1200,
        spaceBetween: 40,
        // pagination: {
        //   el: null,
        //   clickable: true,
        // },
        // breakpoints: {
        //   // when window width is >= 1366px
        //   1366: {},
        // },
      };

      if (DEVICE_WIDTH >= TABLET_WIDTH) {
        if (
          doobleSliderText.classList.contains('event__slider') ||
          doobleSliderText.classList.contains('doings__slider') ||
          doobleSliderText.classList.contains('team__slider') ||
          doobleSliderText.classList.contains('prices__slider')
        ) {
          attrText = {
            effect: 'fade',
            fadeEffect: {
              crossFade: true,
            },
            // breakpoints: {
            //   // when window width is >= 1366px
            //   1366: {},
            // },
          };
        }

        if (doobleSliderText.classList.contains('seating__slider')) {
          attrText.spaceBetween = 0;
          attrImages.speed = 1200;
        }
      }

      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        attrText.speed = 500;

        if (
          doobleSliderText.classList.contains('seating__slider') ||
          doobleSliderText.classList.contains('prices__slider')
        ) {
          attrText.spaceBetween = 0;
        }

        if (doobleSliderText.classList.contains('seating__slider')) {
          attrText.speed = 1200;
        }
      }

      const textDoobleSlider = swiperInit(doobleSliderText, attrText);

      textDoobleSlider.on('slideChange', () => {
        imagesDoobleSlider.slideTo(textDoobleSlider.activeIndex);
      });

      imagesDoobleSlider.on('slideChange', () => {
        textDoobleSlider.slideTo(imagesDoobleSlider.activeIndex);
      });
    }

    return imagesDoobleSlider;
  }
};

export { doobleSliderInit };

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

    const pagination = featuresIconsSlider
      .closest('section')
      .querySelector('.swiper-pagination');

    if (pagination) {
      swiperArgs.pagination = {
        el: pagination,
        clickable: true,
      };
    }

    const featuresSwiper = new Swiper(featuresIconsSlider, swiperArgs);

    featuresSwiper.on('click', () => {
      if (
        featuresSwiper.clickedSlide?.classList.contains('swiper-slide-active')
      ) {
        featuresSwiper.slidePrev();
      } else {
        featuresSwiper.slideNext();
      }
    });

    return featuresSwiper;
  }
};

export { featuresSliderInit };

export default () => {
  // // Swipers not Dooble sliders
  // const swipers = document.querySelectorAll('.swiper:not(.dooble__slider)');
  // swipers.forEach((swiperItem) => {
  //   swiperInit(swiperItem);
  // });
  // // Dooble sliders
  // const doobleSlidersImages = document.querySelectorAll(
  //   '.dooble__slider--images'
  // );
  // if (doobleSlidersImages.length > 0) {
  //   doobleSlidersImages.forEach((doobleSliderImages) => {
  //     doobleSliderInit(doobleSliderImages);
  //   });
  // }
  // // Standart
  // const featuresIconsSlider = document.querySelector('.features__icons');
  // featuresSliderInit(featuresIconsSlider);
};
