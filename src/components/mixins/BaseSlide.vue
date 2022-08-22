<template lang="pug">
div(
  :class='`swiper-slide ${this.sectionName}__slide ${slideType} ${slideModification}`'
)
  slot
    | Empty slide
</template>

<script>
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
    slideModificator() {
      return this.modificator ? this.modificator : this.pageName;
    },
    slideModification() {
      return this.slideModificator !== ''
        ? `${this.sectionName}__slide--${this.slideModificator}`
        : '';
    },
    slideType() {
      return this.type !== '' ? `${this.sectionName}__slide--${this.type}` : '';
    },
  },
};
</script>