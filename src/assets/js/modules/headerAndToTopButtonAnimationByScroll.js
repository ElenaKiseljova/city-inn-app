import { scrollbar } from "./bodyScrollbar";
import { DEVICE_WIDTH, DEVICE_HEIGHT, DESKTOP_WIDTH } from "./gsap-animations";

export default (el) => {
  const scrollTop = document.querySelector('.scroll-top');

  let scrollTopActive = false;
  let scrollTimeout;

  const scrollCallback = (y) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    if (y > 10) {
      if (!el.classList.contains('scrolled')) {
        el.classList.add('scrolled');
      }

      if (el.classList.contains('stoped')) {
        el.classList.remove('stoped');
      }

      scrollTimeout = setTimeout(() => {
        el.classList.add('stoped');

        clearTimeout(scrollTimeout);
      }, 1000);
    } else {
      if (el.classList.contains('scrolled')) {
        el.classList.remove('scrolled');
      }
    }

    if (y > (DEVICE_HEIGHT * 2) && !scrollTopActive) {
      scrollTop?.classList.add('active');

      scrollTopActive = true;
    } else if (y < (DEVICE_HEIGHT * 2) && scrollTopActive) {
      scrollTop?.classList.remove('active');

      scrollTopActive = false;
    }
  };

  if (DEVICE_WIDTH < DESKTOP_WIDTH) {
    const onScrollMobile = () => {
      scrollCallback(window.scrollY);
    };

    window.addEventListener('scroll', onScrollMobile);
  } else {
    const onScrollDesktop = (status) => {
      scrollCallback(status.offset.y);
    };

    scrollbar.addListener(onScrollDesktop);
  }
};