<template lang="pug">
header.page-header(v-if='pageName && header')
  .page-header__container.container
    .page-header__top
      BaseLogo(sectionName='page-header', modificator='header') 

      .page-header__right(ref='headerRight')
        .page-header__buttons
          BaseButton(
            v-if='book',
            sectionName='page-header',
            :modificator='pageName',
            :button='book'
          )

          BaseButton(
            v-if='offer',
            sectionName='page-header',
            :modificator='pageName',
            :button='offer'
          )

        .page-header__links
          button.page-header__burger.burger.__js
            span.visually-hidden Open/Close menu
            .burger__left.__js
            .burger__right.__js

          BaseLang(sectionName='page-header')

          div(
            :class='`page-header__social __js page-header__social--${pageName}`'
          )
            BaseSocial(:items='buttons', direction='vertical')

  .page-header__menu.__js(ref='scrollbarMenu')
    MenuHeader
</template>

<script>
import { mapGetters } from 'vuex';

import Scrollbar from 'smooth-scrollbar';

import headerAndToTopButtonAnimationByScroll from '@/assets/js/modules/headerAndToTopButtonAnimationByScroll';
import {
  DEVICE_WIDTH,
  DESKTOP_WIDTH,
} from '@/assets/js/modules/gsap-animations';

import checkUrlType from '@/mixins/checkUrlType';

import MenuHeader from '@/components/blocks/MenuHeader.vue';

export default {
  components: {
    MenuHeader,
  },
  mixins: [checkUrlType],
  data() {
    return {
      scrollbarMenuIsSet: false,
      scrollHeaderRightAnimationIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['pageName', 'header', 'routeChanged']),
    book() {
      return this.header.content?.book ? this.header.content.book : null;
    },
    offer() {
      return this.header.content?.offer ? this.header.content.offer : null;
    },
    buttons() {
      const buttons = [];

      if (this.book) {
        buttons.push({
          ...this.book,
          icon: 'icon-phone',
          type: this.checkUrlType(this.book.link),
        });
      }

      if (this.offer) {
        buttons.push({
          ...this.offer,
          icon: 'icon-offer',
          type: this.checkUrlType(this.offer.link),
        });
      }

      return buttons;
    },
  },
  mounted() {
    this.setScrollbarMenu();
    this.setScrollHeaderRightAnimation();
  },
  updated() {
    this.setScrollbarMenu();
    this.setScrollHeaderRightAnimation();
  },
  methods: {
    setScrollbarMenu() {
      if (
        this.$refs.scrollbarMenu &&
        !this.scrollbarMenuIsSet &&
        DEVICE_WIDTH >= DESKTOP_WIDTH
      ) {
        const options = {};

        Scrollbar.init(this.$refs.scrollbarMenu, options);

        this.scrollbarMenuIsSet = true;
      }
    },
    setScrollHeaderRightAnimation() {
      if (this.$refs.headerRight && !this.scrollHeaderRightAnimationIsSet) {
        headerAndToTopButtonAnimationByScroll(this.$refs.headerRight);

        this.scrollHeaderRightAnimationIsSet = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/layout/page-header';
@import '~@/assets/scss/blocks/burger';

#scrollbar-menu {
  width: 100%;
  height: 100vh;

  overflow: auto;
}
</style>