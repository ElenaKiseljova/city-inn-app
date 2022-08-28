<template lang="pug">
div(:class='`service ${modificationItemClasses}`')
  div(:class='`service__icon ${modificationIconClasses}`')
    img(width='40', height='40', :src='item.icon', :alt='item.title')

  h5(:class='`service__name ${modificationNameClasses}`')
    | {{ item.title }}
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    modificator: {
      type: String,
      required: true,
    },
  },
  computed: {
    modificationItemClasses() {
      const modificationClasses = this.modificator
        .split(',')
        .map((mod) => {
          return `service--${mod}`;
        })
        .join(' ');

      return modificationClasses;
    },
    modificationIconClasses() {
      const modificationClasses = this.modificator
        .split(',')
        .map((mod) => {
          return `service__icon--${mod}`;
        })
        .join(' ');

      return modificationClasses;
    },
    modificationNameClasses() {
      const modificationClasses = this.modificator
        .split(',')
        .map((mod) => {
          return `service__name--${mod}`;
        })
        .join(' ');

      return modificationClasses;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/service';
</style>