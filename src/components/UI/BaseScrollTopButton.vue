<template lang="pug">
.scroll-top(ref='scrollTop')
  router-link.scroll-top__link.button.button--circle(to='#promo')
    span.visually-hidden Scroll to top
    svg(width='48', height='48')
      use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-scroll-top')
</template>

<script>
import { animationScrollTop } from '@/assets/js/modules/gsap-animations';

export default {
  data() {
    return {
      animationScrollTopIsSet: false,
    };
  },
  mounted() {
    this.setAnimationScrollTop();
  },
  updated() {
    this.setAnimationScrollTop();
  },
  async beforeUnmount() {
    await animationScrollTop.reset();
  },
  methods: {
    setAnimationScrollTop() {
      if (this.$refs.scrollTop && !this.animationScrollTopIsSet) {
        this.animationScrollTopIsSet = animationScrollTop.init(
          this.$refs.scrollTop
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/scroll-top';
</style>