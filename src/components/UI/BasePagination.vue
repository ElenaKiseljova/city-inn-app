<template lang="pug">
div(:class='paginationClasses', :id="`slider-pagination-${swiperIndex}`")
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
      default: '',
    },
    swiperIndex: {
      type: [String, Number],
      required: true,
      default: 0,
    },
  },
  computed: {
    paginationClasses() {
      const paginationModificator =
        this.modificator !== ''
          ? `${this.sectionName}__pagination--${this.modificator}`
          : '';

      return `${this.sectionName}__pagination pagination swiper-pagination ${paginationModificator}`;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/pagination';
</style>
