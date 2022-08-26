<template lang="pug">
.price(:class='`${sectionName}__price ${modificationClasses}`')
  h4.price__title(
    v-if='price.text !== ""',
    :class='`${modificationTitleClasses}`'
  )
    | {{ price.text }}
  p.price__number(:class='`${modificationNumberClasses}`')
    | {{ price.number }}

    template(v-if='price.text !== ""') ₴
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
    modificator: {
      type: String,
      required: false,
    },
  },
  computed: {
    modificationClasses() {
      return this.modificator && this.modificator !== ''
        ? `${this.sectionName}__price--${this.modificator}`
        : '';
    },
    modificationTitleClasses() {
      return this.modificator && this.modificator !== ''
        ? `price__title--${this.modificator}`
        : '';
    },
    modificationNumberClasses() {
      return this.modificator && this.modificator !== ''
        ? `price__number--${this.modificator}`
        : '';
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/price';
</style>