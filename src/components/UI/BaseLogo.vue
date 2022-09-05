<template lang="pug">
div(:class='`${sectionName}__logo logo logo--${modificator} logo--${pageName}`')
  router-link.logo__link(:to='toHome')
    svg(width='120', height='120')
      use(xlink:href='@/assets/img/sprites/sprite-multi.svg#icon-logo')
</template>

<script>
import { mapGetters } from 'vuex';

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
    ...mapGetters(['lang', 'pageName']),
    toHome() {
      return this.lang === 'uk' ? `/` : `/${this.lang}`;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/logo';
</style>