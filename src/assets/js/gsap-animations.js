import gsap from './libs/gsap.min';
import ScrollTrigger from './libs/ScrollTrigger.min';

gsap.registerPlugin(ScrollTrigger);

const TABLET_WIDTH = 768;

const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
  ? Math.min(window.innerWidth, document.documentElement.clientWidth)
  : window.innerWidth
  || document.documentElement.clientWidth
  || document.getElementsByTagName('body')[0].clientWidth;

const animationOpacityTranslate = (elements, trigerElement) => {
  if (elements.length > 0 && trigerElement) {
    gsap.to(elements, {
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

    return true;
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

const animationPromoButtons = (elements) => {
  gsap.to(elements, {
    y: 192,
    duration: 1,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: '.promo',
      scrub: 1,
      // markers: true,
      start: 'top top',
      end: '98vh top',
    },
  });
};

const animationPromoSocial = () => {
  gsap.to('.page-header__social', {
    x: 0,
    duration: 1,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: '.promo',
      // scrub: 1,
      // markers: true,
      start: 'top top',
      end: '98vh top',
    },
  });
};

// Contacts
const contactsAnimation = {
  trigger() {
    return document.querySelector('.contacts');
  },
  elements() {
    return this.trigger() ? this.trigger().querySelectorAll('.contacts__item') : [];
  },
  init() {
    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      return animationOpacityTranslate(this.elements(), this.trigger());
    }
  },
  reset() {
    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      return animationOpacityTranslateReset(this.elements());
    }
  },
};
export { contactsAnimation };

const pageFooter = {
  trigger() {
    return document.querySelector('.page-footer');
  },
  elements() {
    return this.trigger() ? this.trigger().querySelectorAll('.page-footer__item') : [];
  },
  init() {
    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      return animationOpacityTranslate(this.elements(), this.trigger());
    }
  },
  reset() {
    if (DEVICE_WIDTH >= TABLET_WIDTH) {
      return animationOpacityTranslateReset(this.elements());
    }
  },
};
export { pageFooter };


export default () => {
  if (DEVICE_WIDTH < TABLET_WIDTH) {
    const imageContainers = document.querySelectorAll('.promo--home .promo__container--image, .promo--smart .promo__container--image');

    if (imageContainers.length > 0) {
      animationPromoButtons(imageContainers);
    }
  }

  if (DEVICE_WIDTH >= TABLET_WIDTH) {
    animationPromoSocial();

    // Services
    const services = document.querySelectorAll('.services, .promo__social');
    if (services.length > 0) {
      services.forEach((servicesBlock) => {
        const servicesItems = servicesBlock.querySelectorAll('.services__item, .promo__lang, .social__item');

        animationOpacityTranslate(servicesItems, servicesBlock);
      });
    }

    animationOpacityTranslate('.promo__container--image', '.promo__container--image:not(.promo__container--home)');
    animationOpacityTranslate('.promo__text', '.promo__text');

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
