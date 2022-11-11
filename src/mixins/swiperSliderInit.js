import { Swiper, SwiperSlide } from 'swiper/vue';
import {
  Controller,
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from 'swiper';

import {
  DEVICE_WIDTH,
  DESKTOP_WIDTH,
  TABLET_WIDTH,
} from '@/assets/js/modules/gsap-animations';

import 'swiper/css/bundle';
import changeActiveClass from '@/assets/js/modules/changeActiveClass';

export default {
  components: {
    SwiperSlider: Swiper,
    SwiperSlide,
  },
  data() {
    return {
      direction: 'next',
      swiper: null,
      textSwiper: null,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 1200,
      resizeObserver: true,
      autoplay: {},
      pagination: {},
      navigation: {},
      effect: 'fade',
      modules: [Controller, Navigation, Pagination, Autoplay, EffectFade],
    };
  },
  computed: {
    foodNumberTabs() {
      return this.swiper?.el
        .closest('section')
        .querySelectorAll('.food__tab-number');
    },
    foodTextTabs() {
      return this.swiper?.el
        .closest('section')
        .querySelectorAll('.food__tab-text');
    },
  },
  methods: {
    setSwiper(swiper) {
      this.swiper = swiper;

      this.setSwiperOptions();
    },
    setTextSwiper(swiper) {
      this.textSwiper = swiper;
    },
    slideChange(el) {
      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        if (this.swiper.isEnd) {
          this.direction = 'prev';
        }

        if (this.swiper.isBeginning) {
          this.direction = 'next';
        }

        if (el.target.closest('.swiper-slide-prev')) {
          this.swiper.slidePrev();
        } else if (el.target.closest('.swiper-slide-next')) {
          this.swiper.slideNext();
        } else {
          if (this.direction === 'next') {
            this.swiper.slideNext();
          } else {
            this.swiper.slidePrev();
          }
        }
      }
    },
    onSlideChange() {
      console.log('onSlideChange');

      // Food sliders
      if (this.swiper.el.classList.contains('food__slider')) {
        if (this.foodNumberTabs?.length > 0 && this.foodTextTabs?.length > 0) {
          this.changeTab();
        }
      }
    },
    setSwiperOptions() {
      // Food slider
      if (this.swiper.el.classList.contains('food__slider')) {
        this.autoplay = {
          delay: 5000,
          stopOnLastSlide: true,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        };

        if (this.foodNumberTabs?.length > 0 && this.foodTextTabs?.length > 0) {
          this.changeTab();
        }
      }

      if (DEVICE_WIDTH >= TABLET_WIDTH) {
        // Banquet slider / Mission slider
        if (
          this.swiper.el.classList.contains('banquet__slider') ||
          this.swiper.el.classList.contains('mission__slider')
        ) {
          this.autoplay = {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          };
        }

        // Gallery slider
        if (this.swiper.el.classList.contains('gallery__slider')) {
          this.spaceBetween = 36;
        }
      }

      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        // All without Seating slider
        if (!this.swiper.el.classList.contains('.seating__slider')) {
          this.speed = 500;
        }

        // Gallery slider
        if (this.swiper.el.classList.contains('food__slider')) {
          this.spaceBetween = 75;
        }

        if (this.swiper.el.classList.contains('gallery__slider')) {
          this.spaceBetween = 320;
        }
      }
    },
    changeTab() {
      const index = this.swiper.activeIndex ?? 0;

      if (this.foodNumberTabs[index] && this.foodTextTabs[index]) {
        changeActiveClass(this.foodNumberTabs);
        this.foodNumberTabs[index].classList.add('active');

        changeActiveClass(this.foodTextTabs);
        this.foodTextTabs[index].classList.add('active');
      }
    },
  },
};
