import gsap from './libs/gsap.min';
import ScrollTrigger from './libs/ScrollTrigger.min';
import Scrollbar from 'smooth-scrollbar';

gsap.registerPlugin(ScrollTrigger);

const TABLET_WIDTH = 768;
const DESKTOP_WIDTH = 1366;

const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
  ? Math.min(window.innerWidth, document.documentElement.clientWidth)
  : window.innerWidth
  || document.documentElement.clientWidth
  || document.getElementsByTagName('body')[0].clientWidth;

export { DEVICE_WIDTH, TABLET_WIDTH, DESKTOP_WIDTH };

let scrollbar;
if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
  scrollbar = Scrollbar.init(document.body, {
    delegateTo: document,
    damping: 0.05,
    continuousScrolling: false,
  });

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        scrollbar.scrollTop = value; // setter
      }
      return scrollbar.scrollTop;    // getter
    }
  });

  scrollbar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: document.body });
}

export { scrollbar };

/**
 * Аниаммция элементов списков по триггеру: init/reset
 *  
 */
const animationOpacityTranslate = (elements, trigerElement, scrollTriggerId = null) => {
  if (DEVICE_WIDTH >= TABLET_WIDTH && elements.length > 0 && trigerElement) {
    scrollTriggerId = scrollTriggerId ? `${scrollTriggerId}-${new Date().getTime()}` : `scrollTriggerId-${new Date().getTime()}`;

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
        // markers: true,
        start: 'top bottom',
        end: 'bottom center',
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
  constructor(selectorItem, scrollTriggerId = null) {
    this.selectorItem = selectorItem;
    this.scrollTriggerId = scrollTriggerId;
  }

  static trigger = null;
  static animation = null;

  elements() {
    return this.triggerValue ? this.triggerValue.querySelectorAll(this.selectorItem) : [];
  }

  init(trigger) {
    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      this.triggerInit = trigger;

      const response = animationOpacityTranslate(this.elements(), trigger, this.scrollTriggerId);

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
const contactsAnimation = new Animation('.contacts__item', 'contacts');

export { contactsAnimation };

//.page-footer
const pageFooterAnimation = new Animation('.page-footer__item', 'page-footer');

export { pageFooterAnimation };

//parent block .service
const serviceAnimation = new Animation('.service', 'services');

export { serviceAnimation };

//.promo__social
const promoSocialAnimation = new Animation('.promo__lang, .promo__social .social__item', 'promoSocial');

export { promoSocialAnimation };

//.types
const typesItemsAnimation = new Animation('.types__slide', 'types');

export { typesItemsAnimation };

//.cards
const cardsItemsAnimation = new Animation('.cards__item', 'cards');

export { cardsItemsAnimation };


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

const sectionTitleAnimation = (title, trigger) => {
  if (title && trigger && DEVICE_WIDTH >= TABLET_WIDTH) {
    gsap.to(title, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: trigger,
        // markers: true,
        // scrub: 1,
        start: 'top 70%',
        end: 'bottom center',
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
        end: 'top top',
      },
    });

    return true;
  }

  return false;
};

export { sectionAnimation };

/** 
      * Синхронная анимация появления кнопок хедера и сокрытия кнопок промо секции + масштабирование лого
      * 
    */
// .page-header__social | .promo__container--home, .promo__container--smart | .promo
const animationThreeElements = {
  animation: null,
  elements: [],
  trigger: null,
  init(trigger) {
    if (trigger) {
      this.trigger = trigger;

      const headerLogo = document.querySelector('.page-header__logo');
      const headerButtons = document.querySelector('.page-header__social--smart, .page-header__social--home');
      const promoButtonsContainer = trigger.querySelector('.promo__container--home, .promo__container--smart');

      if (headerLogo) {
        this.elements[0] = headerLogo;

        this.animation = gsap.to(headerLogo, {
          scrollTrigger: {
            id: 'threeElements',
            trigger: trigger,
            start: '10% top',
            end: 9999999,
            // markers: true,
            onToggle: () => {
              if (headerButtons) {
                this.elements[1] = headerButtons;

                headerButtons.classList.toggle('scrolled');
              }

              if (promoButtonsContainer) {
                this.elements[2] = promoButtonsContainer;

                promoButtonsContainer.classList.toggle('scrolled');
              }

              headerLogo.classList.toggle('scrolled');
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
    console.log(this.elements, this.trigger, this.animation, ScrollTrigger.getById('threeElements'));
  }
};

export { animationThreeElements };

/**
     * Анимация заголовка и текста страницы
     */
//.promo__title | .promo
const promoTitleAndTextAnimation = (trigger) => {
  if (trigger && DEVICE_WIDTH >= TABLET_WIDTH) {
    const elements = trigger.querySelectorAll('.promo__title, .promo__text');

    if (elements.length > 0) {
      gsap.to(elements, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'Power1.easeIn',
        scrollTrigger: {
          trigger: trigger,
          // markers: true,
          // scrub: 1,
          start: 'top top',
          end: '98vh top',
        },
      });

      return true;
    }
  }

  return false;
};

export { promoTitleAndTextAnimation };
