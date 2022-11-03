<template lang="pug">
div(
  :class='`swiper ${sectionName}__slider ${sliderType} ${sliderModification}`',
  ref='slider'
)
  div(
    :class='`swiper-wrapper ${this.sectionName}__slider-wrapper ${sliderWrapperType} ${sliderWrapperMofification}`'
  )
    slot
      | Empty slide
</template>

<script>
import { mapGetters } from 'vuex';

import {
  swiperInit,
  eventSliderInit,
  featuresSliderInit,
} from '@/assets/js/modules/swipers';

export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    modificator: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      sliderIsInited: false,
    };
  },
  computed: {
    ...mapGetters(['pageName']),
    sliderModificator() {
      return this.modificator ? this.modificator : this.pageName;
    },
    sliderModification() {
      return this.sliderModificator !== ''
        ? `${this.sectionName}__slider--${this.sliderModificator}`
        : '';
    },
    sliderType() {
      return this.type !== ''
        ? `${this.sectionName}__slider--${this.type}`
        : '';
    },
    sliderWrapperType() {
      return this.type !== ''
        ? `${this.sectionName}__slider-wrapper--${this.type}`
        : '';
    },
    sliderWrapperMofification() {
      return this.sliderModificator !== ''
        ? `${this.sectionName}__slider-wrapper--${this.sliderModificator}`
        : '';
    },
  },
  mounted() {
    this.sliderInit();
  },
  updated() {
    this.sliderInit();
  },
  methods: {
    sliderInit() {
      if (this.$refs.slider && !this.sliderIsInited) {
        const slider = this.$refs.slider;

        if (slider.classList.contains('event__slider--images')) {
          eventSliderInit(slider);
        } else if (slider.classList.contains('features__slider')) {
          featuresSliderInit(slider);
        } else if (!slider.classList.contains('event__slider--text')) {
          swiperInit(slider);
        }

        this.sliderIsInited = true;
      }
    },
  },
};
</script>
