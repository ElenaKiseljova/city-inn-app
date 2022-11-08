<template lang="pug">
div(:class='`navigation ${additionalClassesNavigation}`')
  button.navigation__prev.button.button--circle.swiper-button-prev
    span.visually-hidden Prev
    svg(width='48', height='48')
      use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-arrow-prev')

  button.navigation__next.button.button--circle.swiper-button-next
    span.visually-hidden Next
    svg(width='48', height='48')
      use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-arrow-next')
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
    additionalClassesNavigation() {
      const sectionModificator =
        this.modificator !== ''
          ? `${this.sectionName}__navigation--${this.modificator}`
          : '';

      return `${this.sectionName}__navigation ${sectionModificator}`;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/navigation';
</style>
