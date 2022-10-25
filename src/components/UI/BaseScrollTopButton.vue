<template lang="pug">
.scroll-top
  router-link.scroll-top__link.button.button--circle(to='#promo')
    span.visually-hidden Scroll to top
    svg(width='48', height='48')
      use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-scroll-top')
</template>

<style lang="scss">
@import '~@/assets/scss/blocks/scroll-top';
</style>