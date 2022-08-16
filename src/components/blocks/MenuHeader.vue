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

  .menu__img 
    picture.menu__picture.__js(
      v-for='(navItemHeader, index) in navigationList',
      :key='navItemHeader.title',
      :class='index === 0 ? "active" : ""'
    ) 
      source(
        v-if='navItemHeader.image && navItemHeader.image.webp && navItemHeader.image.webp.desktop && navItemHeader.image.webp.mobile',
        media='(min-width: 768px)',
        type='image/webp',
        :srcset='navItemHeader.image.webp.desktop'
      )
      source(
        v-if='navItemHeader.image && navItemHeader.image.webp && navItemHeader.image.webp.desktop && navItemHeader.image.webp.mobile',
        media='(min-width: 100px)',
        type='image/webp',
        :srcset='navItemHeader.image.webp.mobile'
      )

      source(
        v-else-if='navItemHeader.image && navItemHeader.image.webp && navItemHeader.image.webp.desktop',
        type='image/webp',
        :srcset='navItemHeader.image.webp.desktop'
      )

      source(
        v-if='navItemHeader.image && navItemHeader.image.jpg && navItemHeader.image.jpg.desktop && navItemHeader.image.jpg.mobile',
        media='(min-width: 768px)',
        :srcset='navItemHeader.image.jpg.desktop'
      )

      img(
        v-if='navItemHeader.image && navItemHeader.image.jpg && navItemHeader.image.jpg.desktop && navItemHeader.image.jpg.mobile',
        :src='navItemHeader.image.jpg.mobile',
        :alt='navItemHeader.title'
      )

      img(
        v-else-if='navItemHeader.image && navItemHeader.image.jpg && navItemHeader.image.jpg.desktop',
        :src='navItemHeader.image.jpg.desktop',
        :alt='navItemHeader.title'
      )
</template>

<script>
import call from '../../assets/js/call-us';

import SocialList from '../blocks/SocialList.vue';
import NavigationHeader from './NavigationHeader.vue';

export default {
  components: {
    NavigationHeader,
    SocialList,
  },
  computed: {
    header() {
      return this.$store.getters.header;
    },
    social() {
      if (
        this.header.content &&
        this.header.content.social &&
        this.header.content.address
      ) {
        const address = this.header.content.address;

        const social = [address, ...this.header.content.social];

        return social;
      }

      return [];
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
  mounted() {
    call();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/menu';
@import '~@/assets/scss/blocks/nav';
@import '~@/assets/scss/blocks/call';
</style>