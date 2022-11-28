import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import ScrollTrigger from '../libs/ScrollTrigger.min';
import { DEVICE_WIDTH, DESKTOP_WIDTH } from './gsap-animations';

let scrollbar;

const scrollbarInit = () => {
  if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
    const wrapper = document.querySelector('.wrapper');

    if (wrapper) {
      scrollbar = new SimpleBar(wrapper);

      const scrollbarEl = scrollbar.getScrollElement();

      ScrollTrigger.scrollerProxy(wrapper, {
        scrollTop(value) {
          if (arguments.length) {
            scrollbarEl.scrollTop = value; // setter
          }
          return scrollbarEl.scrollTop; // getter
        },
      });

      // scrollbar.addListener(ScrollTrigger.update);
      ScrollTrigger.defaults({ scroller: scrollbarEl });
    }
  }
};

const TOO_MANY_REPETITIONS = 20;
let scrollInterval;
let i = 0;

const isScrollbar = async (callback) => {
  return await new Promise((resolve) => {
    if (scrollbar) {
      resolve(callback());
    } else {
      scrollInterval = setInterval(() => {
        if (scrollbar || i > TOO_MANY_REPETITIONS) {
          if (scrollbar) {
            resolve(callback());
          } else {
            throw new Error('TOO_MANY_REPETITIONS');
          }

          clearInterval(scrollInterval);
        }

        i++;
      }, 500);
    }
  });
};

export { scrollbarInit, scrollbar, isScrollbar };
