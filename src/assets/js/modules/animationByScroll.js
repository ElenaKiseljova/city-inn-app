import { scrollbar } from './bodyScrollbar';
import { DEVICE_WIDTH, DEVICE_HEIGHT, DESKTOP_WIDTH } from './gsap-animations';

let scrollTimeout;

export default () => {
  const header = document.querySelector('.page-header');
  const headerLogo = header?.querySelector('.page-header__logo');
  const headerRight = header?.querySelector('.page-header__right');
  const scrollTop = document.querySelector('.scroll-top');

  const scrollCallback = (y) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // headerRight, headerLogo
    if (y > 10) {
      if (!headerRight?.classList.contains('scrolled')) {
        headerRight?.classList.add('scrolled');
      }

      if (!headerLogo?.classList.contains('scrolled')) {
        headerLogo?.classList.add('scrolled');
      }

      if (headerRight?.classList.contains('stoped') && scrollTimeout) {
        headerRight?.classList.remove('stoped');

        clearTimeout(scrollTimeout);
      } else {
        scrollTimeout = setTimeout(() => {
          headerRight?.classList.add('stoped');

          clearTimeout(scrollTimeout);
        }, 1000);
      }
    } else {
      if (headerRight?.classList.contains('scrolled')) {
        headerRight?.classList.remove('scrolled');
      }

      if (headerLogo?.classList.contains('scrolled')) {
        headerLogo?.classList.remove('scrolled');
      }
    }

    // scrollTop
    if (y > DEVICE_HEIGHT * 2 && !scrollTop?.classList.contains('active')) {
      scrollTop?.classList.add('active');
    } else if (
      y < DEVICE_HEIGHT * 2 &&
      scrollTop?.classList.contains('active')
    ) {
      scrollTop?.classList.remove('active');
    }
  };

  if (DEVICE_WIDTH < DESKTOP_WIDTH) {
    const onScrollMobile = () => {
      scrollCallback(window.scrollY);
    };

    window.addEventListener('scroll', onScrollMobile);
  } else {
    const onScrollDesktop = (evt) => {
      scrollCallback(evt.target.scrollTop);
    };

    scrollbar.getScrollElement().addEventListener('scroll', onScrollDesktop);
  }
};
