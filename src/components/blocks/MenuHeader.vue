<template lang="pug">
.menu
  .menu__container.container
    .menu__nav
      NavigationHeader(:items='navigationList')

    .menu__bottom
      .menu__social
        SocialList(:items='social', direction='horizontal')

      .menu__call.call
        a.call__link(
          v-if='call',
          :href='call.link',
          :data-text='call.text',
          :data-phone='call.phone'
        )
          span.call__text
            | {{ call.text }}

          span.call__icon
            svg(width='48', height='48')
              use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-phone')
  BaseImage(
    v-for='(navItemHeader, index) in navigationList',
    :key='navItemHeader.title',
    sectionName='menu',
    :image='navItemHeader.image'
  )
</template>

<script>
import social from '../../mixins/social';

import SocialList from './SocialList.vue';
import NavigationHeader from './NavigationHeader.vue';
import BaseImage from '../mixins/BaseImage.vue';

export default {
  components: {
    NavigationHeader,
    SocialList,
    BaseImage,
  },
  mixins: [social],
  computed: {
    header() {
      return this.$store.getters.header || {};
    },
    call() {
      if (this.header.content && this.header.content.call) {
        return this.header.content.call;
      }

      return null;
    },
    navigationList() {
      if (this.header.content && this.header.content.menu) {
        return this.header.content.menu;
      }

      return [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/menu';
@import '~@/assets/scss/blocks/nav';
@import '~@/assets/scss/blocks/call';
</style>