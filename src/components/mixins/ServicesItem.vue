<template lang="pug">
li(:class='`services__item services__item--${modificator} ${additionalClass}`')
  div(:class='`services__icon services__icon--${modificator}`')
    img(width='40', height='40', :src='item.icon', :alt='item.title')

  h5(:class='`services__name services__name--${modificator}`')
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
};
</script>