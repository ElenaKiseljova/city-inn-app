import { scrollbar } from "./bodyScrollbar";
import { DEVICE_WIDTH, DESKTOP_WIDTH } from "./gsap-animations";

export default (el) => {
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