<template lang="pug">
header.page-header(v-if='pageName && header')
  .page-header__container.container
    .page-header__top
      div(
        :class='`page-header__logo logo logo--header __js logo--${pageName}`'
      )
        router-link.logo__link(:to='toHome')
          svg(width='120', height='120')
            use(xlink:href='@/assets/img/sprites/sprite-multi.svg#icon-logo')

      .page-header__right
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

import { DEVICE_WIDTH, DESKTOP_WIDTH } from '@/assets/js/gsap-animations';

import checkUrlType from '@/mixins/checkUrlType';

import MenuHeader from '../blocks/MenuHeader.vue';
import BaseButton from '../UI/BaseButton.vue';
import BaseSocial from '../UI/BaseSocial.vue';

export default {
  components: {
    MenuHeader,
    BaseButton,
    BaseSocial,
  },
  mixins: [checkUrlType],
  data() {
    return {
      scrollbarMenuIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['pageName', 'header', 'lang', 'routeChanged']),
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
    toHome() {
      return this.lang === 'uk' ? `/` : `/${this.lang}`;
    },
  },
  mounted() {
    this.setScrollbarMenu();
  },
  updated() {
    this.setScrollbarMenu();
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
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/layout/page-header';
@import '~@/assets/scss/blocks/logo';
@import '~@/assets/scss/blocks/burger';

#scrollbar-menu {
  width: 100%;
  height: 100vh;

  overflow: auto;
}
</style>