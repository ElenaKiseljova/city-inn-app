import gsap from '../libs/gsap.min';
import ScrollTrigger from '../libs/ScrollTrigger.min';

gsap.registerPlugin(ScrollTrigger);

const TABLET_WIDTH = 768;
const DESKTOP_WIDTH = 1280;

const getDewiceWidth = () => {
  return window.innerWidth && document.documentElement.clientWidth
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName('body')[0].clientWidth;
};

const DEVICE_WIDTH = getDewiceWidth();

const DEVICE_HEIGHT =
  window.innerHeight && document.documentElement.clientHeight
    ? Math.min(window.innerHeight, document.documentElement.clientHeight)
    : window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight;

const reloader = () => {
  // Reloader
  window.addEventListener('resize', () => {
    const DEVICE_WIDTH_RESIZE = getDewiceWidth();

    if (
      DEVICE_WIDTH !== DEVICE_WIDTH_RESIZE &&
      Math.abs(DEVICE_WIDTH - DEVICE_WIDTH_RESIZE) > 100
    ) {
      document.location.reload();
    }
  });
};

export {
  reloader,
  getDewiceWidth,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  TABLET_WIDTH,
  DESKTOP_WIDTH,
};

/**
 * Аниаммция элементов списков по триггеру: init/reset
 *
 */
const animationOpacityTranslate = (
  elements,
  trigerElement,
  scrollTriggerId = null,
  options
) => {
  if (DEVICE_WIDTH >= TABLET_WIDTH && elements.length > 0 && trigerElement) {
    scrollTriggerId = scrollTriggerId
      ? `${scrollTriggerId}-${new Date().getTime()}`
      : `scrollTriggerId-${new Date().getTime()}`;

    const animation = gsap.to(elements, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        id: scrollTriggerId,
        trigger: trigerElement,
        scrub: 1,
        markers: false,
        ...options,
      },
    });

    return {
      animation,
      scrollTriggerId,
    };
  }

  return false;
};

class Animation {
  constructor(
    selectorItem,
    scrollTriggerId = null,
    options = { start: 'top bottom', end: 'bottom center' }
  ) {
    this.selectorItem = selectorItem;
    this.scrollTriggerId = scrollTriggerId;
    this.options = options;
  }

  static trigger = null;
  static animation = null;

  elements() {
    return this.triggerValue
      ? this.triggerValue.querySelectorAll(this.selectorItem)
      : [];
  }

  init(trigger) {
    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      this.triggerInit = trigger;

      const response = animationOpacityTranslate(
        this.elements(),
        trigger,
        this.scrollTriggerId,
        this.options
      );

      this.animationInit = response.animation;
      this.scrollTriggerIdInit = response.scrollTriggerId;

      return true;
    }
  }

  reset() {
    const elements = this.elements();

    if (elements && elements.length > 0) {
      gsap.set(elements, { clearProps: true });
    }

    if (this.animation) {
      this.animation.pause(0).kill(true);
    } else {
      // console.log('Animation no exist');
    }

    const curScrollTrigger = ScrollTrigger.getById(this.scrollTriggerId);

    if (curScrollTrigger) {
      curScrollTrigger.kill(true);
    } else {
      // console.log('ScrollTrigger not found: ', this.scrollTriggerId);
    }
  }

  set triggerInit(value) {
    this.trigger = value;
  }

  set scrollTriggerIdInit(value) {
    this.scrollTriggerId = value;
  }

  set animationInit(value) {
    this.animation = value;
  }

  get triggerValue() {
    return this.trigger;
  }
}

//.contacts
const contactsAnimation = new Animation('.contacts__item', 'contacts', {
  start: 'top center',
  end: 'bottom bottom',
  scrub: null,
});

export { contactsAnimation };

//.page-footer
const pageFooterAnimation = new Animation('.page-footer__item', 'page-footer', {
  start: 'top bottom',
  end: 'bottom bottom',
  scrub: null,
  // markers: true,
});

export { pageFooterAnimation };

//parent block .service
const serviceAnimation = new Animation('.service', 'services', {
  start: 'top bottom',
  end: 'top bottom',
});

export { serviceAnimation };

//parent block .service
const featuresAnimation = new Animation('.service', 'features', {
  start: 'top bottom',
  end: 'top bottom',
});

export { featuresAnimation };

//.promo__social
const promoSocialAnimation = new Animation(
  '.promo__lang, .promo__social .social__item',
  'promoSocial',
  { scrub: null }
);

export { promoSocialAnimation };

//.types
const typesItemsAnimation = new Animation('.types__slide', 'types');

export { typesItemsAnimation };

// Experiences
const experienceAnimation = (list) => {
  if (list) {
    let init = true;

    const listObjStart = {};
    const listObjEnd = {};

    const items = list.querySelectorAll('.experience__number');

    const updateList = (obj = null) => {
      items.forEach((item, index) => {
        if (init && !obj) {
          listObjEnd[index] = parseInt(item.textContent, 10);
          listObjStart[index] = 0;
          item.textContent = 0;
        } else if (!init && obj) {
          item.textContent = parseInt(obj[index], 10);
        }
      });
    };

    if (init) {
      updateList();

      gsap.to(listObjStart, {
        ...listObjEnd,
        duration: 2,
        scrollTrigger: {
          trigger: '.experience',
          // markers: true,
          start: 'top center',
          end: 'bottom center',
        },
        onUpdate() {
          updateList(listObjStart);
        },
      });

      init = false;
    }

    return true;
  }

  return false;
};

export { experienceAnimation };

const sectionTitleAnimation = ({ title, titles, trigger }) => {
  if ((titles || title) && trigger) {
    //  && DEVICE_WIDTH >= TABLET_WIDTH
    const els = title || titles;

    gsap.to(els, {
      // x: 0,
      // y: 0,
      // opacity: 1,
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: trigger,
        // markers: true,
        scrub: 1,
        start: 'top center',
        end: 'bottom top',
        onToggle: () => {
          if (title) {
            title.classList.toggle('active');
          } else {
            titles.forEach((t) => t?.classList.toggle('active'));
          }
        },
      },
    });

    return true;
  }

  return false;
};

export { sectionTitleAnimation };

const sectionAnimation = (section, trigger) => {
  if (section && trigger && DEVICE_WIDTH >= TABLET_WIDTH) {
    gsap.to(section, {
      x: 0,
      duration: 3,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        // markers: true,
        scrub: 0.3,
        start: 'top bottom',
        end: 'top center',
      },
    });

    return true;
  }

  return false;
};

export { sectionAnimation };

/**
 * Синхронная анимация появления кнопок хедера и сокрытия кнопок промо секции
 *
 */
// .page-header__social | .promo__container--home, .promo__container--smart
const animationHeaderSocialAndPromoButtons = {
  animation: null,
  elements: [],
  trigger: null,
  init(trigger) {
    if (trigger) {
      this.trigger = trigger;

      const headerButtonsContainer = document.querySelector(
        '.page-header__social--smart, .page-header__social--home'
      );
      const promoButtonsContainer = trigger.querySelector(
        '.promo__container--home, .promo__container--smart'
      );

      if (headerButtonsContainer) {
        this.animation = gsap.to(headerButtonsContainer, {
          scrollTrigger: {
            id: 'threeElements',
            trigger: trigger,
            start: '10% top',
            end: 9999999,
            // markers: true,
            onToggle: () => {
              if (headerButtonsContainer) {
                this.elements[0] = headerButtonsContainer;

                headerButtonsContainer.classList.toggle('scrolled');
              }

              if (promoButtonsContainer) {
                this.elements[1] = promoButtonsContainer;

                promoButtonsContainer.classList.toggle('scrolled');
              }
            },
          },
        });

        return true;
      }
    }

    return false;
  },
  reset() {
    if (this.animation) {
      this.animation.pause(0).kill(true);
    }

    if (ScrollTrigger.getById('threeElements')) {
      ScrollTrigger.getById('threeElements').kill(true);
    }

    this.elements.forEach((element) => {
      element.classList.remove('scrolled');
    });
  },
  status() {
    console.log(
      this.elements,
      this.trigger,
      this.animation,
      ScrollTrigger.getById('threeElements')
    );
  },
};

export { animationHeaderSocialAndPromoButtons };

/**
 * Анимация заголовка и текста страницы
 */
//.promo__title | .promo
const promoTitleAndTextAnimation = (trigger) => {
  if (trigger) {
    // && DEVICE_WIDTH >= TABLET_WIDTH
    const elements = trigger.querySelectorAll('.promo__title, .promo__text');

    if (elements.length > 0) {
      gsap.to(elements, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'Power1.easeIn',
        // scrollTrigger: {
        //   trigger: trigger,
        //   // markers: true,
        //   // scrub: 1,
        //   start: 'top top',
        //   end: '98vh top',
        // },
      });

      return true;
    }
  }

  return false;
};

export { promoTitleAndTextAnimation };

/**
 * Анимация фоновой картинки
 */
const imageBgAnimation = (trigger) => {
  if (trigger) {
    const elements = trigger.querySelectorAll('picture');

    if (elements.length > 0) {
      gsap.to(elements, {
        scale: 2,
        transformOrigin: 'center',
        duration: 0.1,
        ease: 'Power1.easeIn',
        scrollTrigger: {
          trigger: trigger,
          // markers: true,
          scrub: 1,
          start: 'top top',
          end: 'bottom top',
        },
      });

      return true;
    }
  }

  return false;
};

export { imageBgAnimation };

// Переходы слайдов
const animationSlideElements = (
  swiperSlider,
  selector1,
  selector2,
  mode = 1
) => {
  const el1 =
    swiperSlider.slides[swiperSlider.activeIndex].querySelector(selector1);
  const el2 =
    swiperSlider.slides[swiperSlider.activeIndex].querySelector(selector2);

  if (el1 && el2) {
    gsap.to(el1, {
      x: 0,
      // opacity: 1,
      duration: 1.2,
    });

    switch (mode) {
      case 1:
        gsap.to(el2, {
          x: 0,
          // opacity: 1,
          duration: 1.2,
        });

        break;

      case 2:
        gsap.to(el2, {
          // opacity: 1,
          duration: 1.2,
          ease: 'Power3.easeOut',
        });

        break;

      default:
        break;
    }
  }

  if (swiperSlider.previousIndex !== undefined) {
    const el3 =
      swiperSlider.slides[swiperSlider.previousIndex].querySelector(selector1);
    const el4 =
      swiperSlider.slides[swiperSlider.previousIndex].querySelector(selector2);

    if (el3 && el4) {
      gsap.to(el3, {
        x: '-100%',
        // opacity: 0,
        duration: 1,
      });

      switch (mode) {
        case 1:
          gsap.to(el4, {
            x: '100%',
            // opacity: 0,
            duration: 1,
          });

          break;

        case 2:
          gsap.to(el4, {
            // opacity: 0,
            duration: 1,
            ease: 'Power3.easeOut',
          });

          break;

        default:
          break;
      }
    }
  }
};

export { animationSlideElements };

// Анимация абзацев на текстовых страницах
const textItemsAnimation = {
  animation: null,
  element: null,
  init(item, callback) {
    if (item && callback) {
      this.element = item;

      this.animation = gsap.to(item, {
        scrollTrigger: {
          id: 'textItems',
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          // markers: true,
          onEnter: () => {
            // console.log('enter');
            callback();
          },
          onEnterBack: () => {
            // console.log('onEnterBack');
            callback();
          },
        },
      });

      return true;
    }

    return false;
  },
  reset() {
    if (this.animation) {
      this.animation.pause(0).kill(true);
    }

    if (ScrollTrigger.getById('textItems')) {
      ScrollTrigger.getById('textItems').kill(true);
    }

    if (this.element) {
      this.element.classList.remove('active');
    }
  },
};

export { textItemsAnimation };

// Закрепление навигации по текстовым страницам при скролле
const textNavPin = {
  animation: null,
  element: null,
  init(trigger, pin) {
    if (trigger && pin) {
      this.element = pin;

      this.animation = gsap.to(pin, {
        scrollTrigger: {
          id: 'textNavPin',
          trigger: trigger,
          scrub: 0.3,
          // markers: true,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            const translateValue = trigger.offsetHeight - pin.offsetHeight;

            let state = (self.end - self.start) * self.progress;

            if (state > translateValue) {
              state = translateValue;
            }

            pin.style.transform = `translateY(${state}px)`;

            // console.log(state, self.end - self.start);
          },
        },
      });

      return true;
    }

    return false;
  },
  reset() {
    if (this.animation) {
      this.animation.pause(0).kill(true);
    }

    if (ScrollTrigger.getById('textNavPin')) {
      ScrollTrigger.getById('textNavPin').kill(true);
    }

    if (this.element) {
      gsap.set(this.element, { clearProps: true });
    }
  },
};

export { textNavPin };
