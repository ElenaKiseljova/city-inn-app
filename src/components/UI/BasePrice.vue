<template lang="pug">
.price(:class='`${sectionName}__price`')
  h4.price__title
    | {{ price.text }}
  p.price__number
    | {{ price.number }} ₴
</template>

<script>
export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/price';
</style>