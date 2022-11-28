import { mapActions, mapGetters } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import {
  Controller,
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Grid,
} from 'swiper';

import {
  DEVICE_WIDTH,
  DESKTOP_WIDTH,
  TABLET_WIDTH,
} from '@/assets/js/modules/gsap-animations';
import changeActiveClass from '@/assets/js/modules/changeActiveClass';
import cardsActivate from '@/assets/js/modules/cards';

import 'swiper/css/bundle';

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
      swiperIndex: 0,
      modules: [Grid, Controller, Navigation, Pagination, Autoplay, EffectFade],
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 1200,
        resizeObserver: true,
        autoplay: {},
        effect: null,
        grid: {},
      },
      swiperTextOptions: {
        slidesPerView: 1,
        spaceBetween: 40,
        speed: 1200,
        resizeObserver: true,
        autoplay: {},
        effect: null,
      },
      slideClass: null, // transition, translated
      animationSlideTimeout: null,
    };
  },
  computed: {
    ...mapGetters(['sliderIndex']),
    swiperNavigation() {
      return {
        nextEl: `#slider-navigation-${this.swiperIndex} .navigation__next`,
        prevEl: `#slider-navigation-${this.swiperIndex} .navigation__prev`,
      };
    },
    swiperPagination() {
      return { el: `#slider-pagination-${this.swiperIndex} `, clickable: true };
    },
    swiperEnabled() {
      if (DEVICE_WIDTH >= TABLET_WIDTH && DEVICE_WIDTH < DESKTOP_WIDTH) {
        if (this.sectionName === 'types') {
          return false;
        }
      }

      if (DEVICE_WIDTH >= TABLET_WIDTH) {
        if (this.sectionName === 'rooms') {
          return false;
        }

        if (this.sectionName === 'features') {
          return false;
        }
      }

      return true;
    },
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
  created() {
    if (this.sectionName === 'features' && DEVICE_WIDTH < TABLET_WIDTH) {
      this.swiperOptions.grid = {
        rows: 2,
        fill: 'row',
      };
    }

    this.setFade();

    this.swiperIndex = this.sliderIndex;
    this.sliderIndexIncrement();
  },
  methods: {
    ...mapActions(['sliderIndexIncrement']),
    setSwiper(swiper) {
      this.swiper = swiper;

      this.setSwiperOptions();
    },
    setTextSwiper(swiper) {
      this.textSwiper = swiper;

      this.setSwiperTextOptions();
    },
    onSlideChange() {
      // console.log('onSlideChange');

      // Food sliders
      if (this.swiper?.el?.classList.contains('food__slider')) {
        if (this.foodNumberTabs?.length > 0 && this.foodTextTabs?.length > 0) {
          this.changeTab();
        }
      }
    },
    onBeforeTransitionStart() {
      // console.log('onBeforeTransitionStart');

      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        // Event sliders Coffe/Halls: Слайдер с меняющимся заголовком
        if (
          this.swiper?.el?.classList.contains('event__slider--coffee') ||
          this.swiper?.el?.classList.contains('event__slider--halls') ||
          this.swiper?.el?.classList.contains('doings__slider')
        ) {
          this.animationSlide(1);

          if (this.animationSlideTimeout) {
            clearTimeout(this.animationSlideTimeout);
          }

          this.animationSlideTimeout = setTimeout(() => {
            this.animationSlide(2);
          }, this.swiperOptions.speed + 100);
        }
      }
    },
    setSwiperOptions() {
      // Food slider
      if (this.swiper?.el?.classList.contains('food__slider')) {
        // this.swiperOptions.autoplay = {
        //   delay: 5000,
        //   stopOnLastSlide: true,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // };

        if (this.foodNumberTabs?.length > 0 && this.foodTextTabs?.length > 0) {
          this.changeTab();
        }
      }

      if (DEVICE_WIDTH < TABLET_WIDTH) {
        if (this.swiper?.el?.classList.contains('features__slider')) {
          this.swiperOptions.slidesPerView = 2;
          this.swiperOptions.spaceBetween = 24;
        }
      }

      if (DEVICE_WIDTH >= TABLET_WIDTH) {
        // Banquet slider / Mission slider
        if (
          this.swiper?.el?.classList.contains('banquet__slider') ||
          this.swiper?.el?.classList.contains('mission__slider') ||
          // this.swiper?.el?.classList.contains('spa__slider') ||
          // this.swiper?.el?.classList.contains('prices__slider') ||
          this.swiper?.el?.classList.contains('seating__slider')
        ) {
          this.swiperOptions.autoplay = {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          };
        }

        // Gallery slider
        if (this.swiper?.el?.classList.contains('gallery__slider')) {
          this.swiperOptions.speed = 500;
          this.swiperOptions.spaceBetween = 36;
        }
      }

      if (DEVICE_WIDTH >= TABLET_WIDTH && DEVICE_WIDTH < DESKTOP_WIDTH) {
        if (this.swiper?.el?.classList.contains('types__slider')) {
          cardsActivate('types', '.types__slide');
        }
      }

      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        // All without Seating slider
        if (!this.swiper?.el?.classList.contains('seating__slider')) {
          this.swiperOptions.speed = 500;
        }

        // Food slider
        if (this.swiper?.el?.classList.contains('food__slider')) {
          this.swiperOptions.spaceBetween = 75;
        }

        // Gallery slider
        if (this.swiper?.el?.classList.contains('gallery__slider')) {
          this.swiperOptions.spaceBetween = 320;
        }

        // Event slider - Group
        if (this.swiper?.el?.classList.contains('event__slider--group')) {
          this.swiperOptions.spaceBetween = 246;
        }

        // Event sliders All without Around/Attravtion/Saunas
        if (
          this.swiper?.el?.classList.contains('event__slider') &&
          !this.swiper?.el?.classList.contains('event__slider--around') &&
          !this.swiper?.el?.classList.contains('event__slider--attraction') &&
          !this.swiper?.el?.classList.contains('event__slider--saunas')
        ) {
          this.swiperOptions.spaceBetween = 280;
        }

        if (this.swiper?.el?.classList.contains('doings__slider')) {
          this.swiperOptions.spaceBetween = 270;

          let maxHeightSlide = 0;

          this.swiper?.slides.forEach((slide) => {
            if (slide.offsetHeight > maxHeightSlide) {
              maxHeightSlide = slide.offsetHeight;
            }
          });

          if (this.swiper && this.swiper?.el) {
            this.swiper.el.style.minHeight = `${maxHeightSlide}px`;
          }
        }

        if (this.swiper?.el?.classList.contains('team__slider')) {
          this.swiperOptions.spaceBetween = 51;
          this.swiperOptions.slidesPerView = 3;
          // this.swiperOptions.loop = true;
        }

        if (this.swiper?.el?.classList.contains('types__slider')) {
          // this.swiperOptions.loop = true;
          this.swiperOptions.slidesPerView = 3;
          this.swiperOptions.spaceBetween = 40;
        }

        if (
          this.swiper?.el?.classList.contains('seating__slider') ||
          this.swiper?.el?.classList.contains('prices__slider')
        ) {
          this.swiperOptions.spaceBetween = 0;
        }
      }
    },
    setSwiperTextOptions() {
      if (DEVICE_WIDTH >= TABLET_WIDTH) {
        if (this.textSwiper?.el?.classList.contains('seating__slider')) {
          this.swiperTextOptions.spaceBetween = 0;
        }
      }

      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        if (!this.textSwiper?.el?.classList.contains('seating__slider')) {
          this.swiperTextOptions.speed = 500;
        }

        if (
          this.textSwiper?.el?.classList.contains('seating__slider') ||
          this.textSwiper?.el?.classList.contains('prices__slider')
        ) {
          this.swiperTextOptions.spaceBetween = 0;
        }
      }
    },
    setFade() {
      // Banquet slider / Mission slider
      if (this.sectionName === 'banquet' || this.sectionName === 'mission') {
        this.swiperOptions.effect = 'fade';
      }

      if (DEVICE_WIDTH >= TABLET_WIDTH) {
        if (
          this.sectionName === 'event' ||
          this.sectionName === 'smart-rooms' ||
          this.sectionName === 'halls' ||
          this.sectionName === 'around' ||
          this.sectionName === 'attraction' ||
          this.sectionName === 'saunas' ||
          this.sectionName === 'locations' ||
          this.sectionName === 'coffee' ||
          this.sectionName === 'doings' ||
          this.sectionName === 'team' ||
          this.sectionName === 'prices'
        ) {
          this.swiperTextOptions.effect = 'fade';
        }
      }
    },
    slideChange(el) {
      if (this.swiper?.isEnd) {
        this.direction = 'prev';
      }

      if (this.swiper?.isBeginning) {
        this.direction = 'next';
      }

      if (el.target.closest('.swiper-slide-prev')) {
        this.swiper?.slidePrev();
      } else if (el.target.closest('.swiper-slide-next')) {
        this.swiper?.slideNext();
      } else {
        if (this.direction === 'next') {
          this.swiper?.slideNext();
        } else {
          this.swiper?.slidePrev();
        }
      }
    },
    changeTab() {
      const index = this.swiper?.activeIndex ?? 0;

      if (this.foodNumberTabs[index] && this.foodTextTabs[index]) {
        changeActiveClass(this.foodNumberTabs);
        this.foodNumberTabs[index].classList.add('active');

        changeActiveClass(this.foodTextTabs);
        this.foodTextTabs[index].classList.add('active');
      }
    },
    animationSlide(mode = 1) {
      if (mode === 1) {
        this.slideClass = 'transition';
      } else {
        this.slideClass = 'translated';
      }
    },
  },
};
