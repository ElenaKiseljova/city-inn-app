<template lang="pug">
header.page-header
  .page-header__container.container
    .page-header__top
      div(
        :class='`page-header__logo logo logo--header __js logo--${pageName}`'
      )
        a.logo__link(href='index.html')
          svg(width='120', height='120')
            use(xlink:href='@/assets/img/sprites/sprite-multi.svg#icon-logo')

      .page-header__right
        .page-header__buttons
          a(
            v-for='button in buttons',
            :key='button.link',
            :class='`page-header__button button __js page-header__button--${pageName}`',
            :href='button.link'
          )
            span {{ button.title }}

        .page-header__links
          button.page-header__burger.burger.__js
            span.visually-hidden Open/Close menu
            .burger__left.__js
            .burger__right.__js

          div(
            :class='`page-header__social __js page-header__social--${pageName}`'
          )
            SocialList(:items='buttons', direction='vertical')

  .page-header__menu.__js
    MenuHeader
</template>

<script>
import menu from '../../assets/js/menu';

import SocialList from '../blocks/SocialList.vue';
import MenuHeader from '../blocks/MenuHeader.vue';

export default {
  components: {
    SocialList,
    MenuHeader,
  },
  data() {
    return {};
  },
  computed: {
    header() {
      return this.$store.getters.header;
    },
    pageName() {
      return this.$store.getters.pageName;
    },
    buttons() {
      const book = this.header.content.book;
      const offer = this.header.content.offer;

      if (book && offer) {
        return [
          {
            ...book,
            icon: 'phone',
          },
          {
            ...offer,
            icon: 'offer',
          },
        ];
      }

      return [];
    },
  },
  mounted() {
    menu();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/layout/page-header';
@import '~@/assets/scss/blocks/logo';
@import '~@/assets/scss/blocks/burger';
</style>