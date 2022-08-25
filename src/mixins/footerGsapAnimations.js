import { pageFooterAnimation } from '../assets/js/gsap-animations';

export default {
  data() {
    return {
      footerAnimationInited: false,

      footerLastInterval: null,

      i: 0,
    };
  },
  mounted() {
    if (!this.footerAnimationInited) {
      this.footerLastInterval = setInterval(() => {
        const footer = document.querySelector('.page-footer');
        if (footer) {
          clearInterval(this.footerLastInterval);

          this.footerAnimationInited = pageFooterAnimation.init(footer);
        }

        this.i += 1;

        if (this.i > 10) {
          clearInterval(this.footerLastInterval);
        }
      }, 300);
    }
  },
  unmounted() {
    pageFooterAnimation.reset();
  },
};