<template lang="pug">
ul(v-if='pageName', :class='`social social--${direction}`')
  li(
    v-for='(item, index) in itemsWithType',
    :key='item.link',
    :class='`social__item social__item--${direction}`'
  )
    a(
      v-if='item.type === "link"',
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
      v-else-if='item.type === "route"',
      :class='`social__link social__link--${pageName}`',
      :to='item.link'
    )
      span.visually-hidden {{ item.link }}

      svg(width='48', height='48')
        use(
          :xlink:href='require(`@/assets/img/sprites/sprite-mono.svg`) + `#${item.icon}`'
        )
</template>

<script>
import { mapGetters } from 'vuex';

import checkUrlType from '@/mixins/checkUrlType';

export default {
  mixins: [checkUrlType],
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
    ...mapGetters(['pageName']),
    itemsWithType() {
      const itemsWithType = this.items.map((item) => {
        item.type = this.checkUrlType(item.link);

        return item;
      });

      return itemsWithType;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/social';
</style>