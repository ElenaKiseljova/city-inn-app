<template lang="pug">
header.page-header
  .page-header__container.container
    .page-header__top
      div(
        :class='`page-header__logo logo logo--header __js logo--${pageName}`'
      )
        router-link.logo__link(to='/')
          svg(width='120', height='120')
            use(xlink:href='@/assets/img/sprites/sprite-multi.svg#icon-logo')

      .page-header__right
        .page-header__buttons
          a(
            v-if='book',
            :class='`page-header__button button __js page-header__button--${pageName}`',
            :href='book.link',
            target='_blank'
          )
            span {{ book.title }}

          router-link(
            v-if='offer',
            :class='`page-header__button button __js page-header__button--${pageName}`',
            :to='offer.link'
          )
            span {{ offer.title }}

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
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    header() {
      return this.$store.getters.header;
    },
    book() {
      return this.header.content.book;
    },
    offer() {
      return this.header.content.offer;
    },
    buttons() {
      if (this.book && this.offer) {
        return [
          {
            ...this.book,
            icon: 'icon-phone',
          },
          {
            ...this.offer,
            icon: 'icon-offer',
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