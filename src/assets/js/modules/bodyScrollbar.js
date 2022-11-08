import Scrollbar from 'smooth-scrollbar';
import ScrollTrigger from '../libs/ScrollTrigger.min';
import { DEVICE_WIDTH, DESKTOP_WIDTH } from './gsap-animations';

let scrollbar;

const scrollbarInit = () => {
  if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
    const wrapper = document.querySelector('.wrapper');

    if (wrapper) {
      scrollbar = Scrollbar.init(wrapper, {
        delegateTo: document,
        damping: 0.05,
        continuousScrolling: false,
      });

      ScrollTrigger.scrollerProxy(wrapper, {
        scrollTop(value) {
          if (arguments.length) {
            scrollbar.scrollTop = value; // setter
          }
          return scrollbar.scrollTop; // getter
        },
      });

      scrollbar.addListener(ScrollTrigger.update);
      ScrollTrigger.defaults({ scroller: wrapper });
    }
  }
};

export { scrollbarInit, scrollbar };
