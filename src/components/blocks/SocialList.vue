<template lang="pug">
ul(:class='`social social--${direction}`')
  li(
    v-for='(item, index) in items',
    :key='item.link',
    :class='`social__item social__item--${direction}`'
  ) 
    a(
      v-if='item.link.includes("http") || item.link.includes("tel:") || item.link.includes("mailto:")',
      :class='`social__link social__link--${pageName}`',
      :href='item.link',
      target='_blank'
    )
      span.visually-hidden {{ item.title }}
      svg(width='48', height='48')
        use(
          :xlink:href='require(`@/assets/img/sprites/sprite-mono.svg`) + `#${item.icon}`'
        )

    router-link(
      v-else,
      :class='`social__link social__link--${pageName}`',
      :to='item.link'
    )
      span.visually-hidden {{ item.title }}

      svg(width='48', height='48')
        use(
          :xlink:href='require(`@/assets/img/sprites/sprite-mono.svg`) + `#${item.icon}`'
        )
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    direction: {
      type: String,
      required: false,
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