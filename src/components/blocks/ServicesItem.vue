<template lang="pug">
li(:class='`services__item ${modificationItemClasses}`')
  div(:class='`services__icon ${modificationIconClasses}`')
    img(width='40', height='40', :src='item.icon', :alt='item.title')

  h5(:class='`services__name ${modificationNameClasses}`')
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
    additionalClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    modificationItemClasses() {
      const modificationClasses = this.modificator
        .split(',')
        .map((mod) => {
          return `services__item--${mod}`;
        })
        .join(' ');

      return modificationClasses;
    },
    modificationIconClasses() {
      const modificationClasses = this.modificator
        .split(',')
        .map((mod) => {
          return `services__icon--${mod}`;
        })
        .join(' ');

      return modificationClasses;
    },
    modificationNameClasses() {
      const modificationClasses = this.modificator
        .split(',')
        .map((mod) => {
          return `services__name--${mod}`;
        })
        .join(' ');

      return modificationClasses;
    },
  },
};
</script>