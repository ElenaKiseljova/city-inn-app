import Scrollbar from 'smooth-scrollbar';
import ScrollTrigger from '../libs/ScrollTrigger.min';
import { DEVICE_WIDTH, DESKTOP_WIDTH } from './gsap-animations';

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