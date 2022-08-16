<template lang="pug">
ul(:class='`social social--${direction}`')
  li(
    v-for='(item, index) in items',
    :key='item.link',
    :class='`social__item social__item--${direction}`'
  ) 
    router-link(
      :class='`social__link social__link--${pageName}`',
      :to='item.link',
      target='_blank'
    )
      span.visually-hidden {{ item.title }}

      svg(width='48', height='48')
        use(
          :xlink:href='require(`@/assets/img/sprites/sprite-mono.svg`) + `#icon-${item.icon}`'
        )
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    direction: {
      type: String,
      required: true,
      default: 'horizontal',
    },
  },
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/social';
</style>