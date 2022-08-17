<template lang="pug">
div(:class='`worktime ${additionalClassesWorktime}`')
  div(:class='`worktime__clock worktime__clock--${sectionName}`')
    svg(width='48', height='48')
      use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-clock')

  span
    | {{ text }}
</template>

<script>
export default {
  props: {
    sectionName: {
      type: String,
      requider: true,
    },
    text: {
      type: String,
      requider: false,
      default: '7:00 - 22:00.',
    },
    modificator: {
      type: String,
      requider: false,
      default: null,
    },
  },
  computed: {
    additionalClassesWorktime() {
      const modification = this.modificator
        ? `${this.sectionName}__worktime--${this.modificator}`
        : ``;

      return `${this.sectionName}__worktime ${modification}`;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/worktime';
</style>