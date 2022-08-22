<template lang="pug">
div(
  :class='`swiper ${sectionName}__slider ${sliderType} ${sliderModification}`'
)
  div(
    :class='`swiper-wrapper ${this.sectionName}__slider-wrapper ${sliderWrapperType} ${sliderWrapperMofification}`'
  )
    slot
      | Empty slide
</template>

<script>
import swipers from '../../assets/js/swipers';

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
  computed: {
    pageName() {
      return this.$store.getters.pageName || '';
    },
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
    swipers();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/libs/swiper-bundle.min';
</style>