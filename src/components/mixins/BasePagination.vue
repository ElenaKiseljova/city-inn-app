<template lang="pug">
div(:class='paginationClasses')
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