<template lang="pug">
div(:class='classes')
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
      required: true,
    },
  },
  computed: {
    classes() {
      return `${this.sectionName}__pagination pagination swiper-pagination ${this.sectionName}__pagination--${this.modificator}`;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/pagination';
</style>