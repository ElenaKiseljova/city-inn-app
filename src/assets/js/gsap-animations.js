import gsap from './libs/gsap.min';
import ScrollTrigger from './libs/ScrollTrigger.min';

gsap.registerPlugin(ScrollTrigger);

const TABLET_WIDTH = 768;

const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
  ? Math.min(window.innerWidth, document.documentElement.clientWidth)
  : window.innerWidth
  || document.documentElement.clientWidth
  || document.getElementsByTagName('body')[0].clientWidth;

/**
 * Аниаммция элементов списков по триггеру: init/reset
 *  
 */
const animationOpacityTranslate = (elements, trigerElement) => {
  if (elements.length > 0 && trigerElement) {
    return gsap.to(elements, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: trigerElement,
        // markers: true,
        // scrub: 1,
        start: 'top 70%',
        end: 'bottom center',
      },
    });
  }

  return false;
};

const animationOpacityTranslateReset = (elements) => {
  if (elements.length > 0) {
    gsap.to(elements, {
      x: 20,
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.inOut',
    });

    return true;
  }

  return false;
};

class Animation {
  constructor(selectorItem) {
    this.selectorItem = selectorItem;
  }

  static trigger = null;

  elements() {
    return this.triggerValue ? this.triggerValue.querySelectorAll(this.selectorItem) : [];
  }

  init(trigger) {
    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      this.triggerInit = trigger;

      this.scrollTriggerInit = animationOpacityTranslate(this.elements(), trigger);

      return true;
    }
  }

  reset() {
    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      if (this.scrollTrigger) {
        this.scrollTrigger.kill();
        console.log(this.scrollTrigger);
      }

      return animationOpacityTranslateReset(this.elements());
    }
  }

  set triggerInit(value) {
    this.trigger = value;
  }

  set scrollTriggerInit(value) {
    this.scrollTrigger = value;
  }

  get triggerValue() {
    return this.trigger;
  }
}

//.contacts
const contactsAnimation = new Animation('.contacts__item');

export { contactsAnimation };

//.page-footer
const pageFooterAnimation = new Animation('.page-footer__item');

export { pageFooterAnimation };

//.services
const servicesAnimation = new Animation('.services__item');

export { servicesAnimation };

//.promo__social
const promoSocialAnimation = new Animation('.promo__lang, .promo__social .social__item');

export { promoSocialAnimation };


export default () => {
  if (DEVICE_WIDTH >= TABLET_WIDTH) {
    /** 
      * Синхронная анимация появления кнопок хедера и сокрытия кнопок промо секции 
      * на мобильных устройствах
      * 
    */
    // .page-header__social | .promo--home .promo__buttons, .promo--smart .promo__buttons | .promo
    const animationPromoAndHeaderButtonsBookAndOffer = (element1, element2, trigger) => {
      if (element1 && element2 && trigger) {
        gsap.to(element1, {
          x: 0,
          duration: 1.5,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: trigger,
            scrub: 1,
            // markers: true,
            start: 'top top',
            end: '98vh top',
          },
        });

        gsap.to(element2, {
          y: 192,
          duration: 1.5,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: trigger,
            scrub: 1,
            // markers: true,
            start: 'top top',
            end: '98vh top',
          },
        });

        return true;
      }

      return false;
    };

    const pageHeaderButtons = document.querySelector('.page-header__social');
    const promoButtons = document.querySelector('.promo--home .promo__buttons, .promo--smart .promo__buttons');
    const promo = document.querySelector('.promo');

    animationPromoAndHeaderButtonsBookAndOffer(pageHeaderButtons, promoButtons, promo);

    /**
     * Анимация заголовка страницы
     */
    //.promo__content--image:not(.promo__content--home) | .promo
    const promoTitleAnimation = (element, trigger) => {
      console.log(element, trigger);
      if (element && trigger) {
        gsap.to(element, {
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
      }
    };

    const promoContainerTitle = document.querySelector('.promo__content--image:not(.promo__content--home)');

    promoTitleAnimation(promoContainerTitle, promo);


    // Rooms
    const rooms = document.querySelectorAll('.room, .home');
    if (rooms.length > 0) {
      rooms.forEach((room) => {
        const roomTitle = room.querySelectorAll('.room__title--desktop, .home__title');
        const roomButtons = room.querySelectorAll('.room__button, .home__button');
        const roomPrice = room.querySelector('.room__price, .home__content');

        animationOpacityTranslate(roomTitle, room);
        animationOpacityTranslate(roomButtons, roomPrice);
      });
    }

    // Experiences
    const list = document.querySelector('.experience__list');

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
    }
  }
};
