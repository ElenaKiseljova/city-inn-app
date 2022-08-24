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
          template(v-for='button in buttons')
            a(
              v-if='button.type === "link"',
              :class='`page-header__button button __js page-header__button--${pageName}`',
              :href='button.link',
              target='_blank'
            )
              span {{ button.title }}

            router-link(
              v-if='button.type === "route"',
              :class='`page-header__button button __js page-header__button--${pageName}`',
              :to='button.link'
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
import checkUrlType from '../../mixins/checkUrlType';

import SocialList from '../blocks/SocialList.vue';
import MenuHeader from '../blocks/MenuHeader.vue';

export default {
  mixins: [checkUrlType],
  components: {
    SocialList,
    MenuHeader,
  },
  data() {
    return {
      headerIsSet: false,
    };
  },
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    header() {
      return this.$store.getters.header || {};
    },
    book() {
      const bookButton =
        this.header.content && this.header.content.book
          ? this.header.content.book
          : null;

      if (
        bookButton &&
        bookButton.link &&
        bookButton.link !== '' &&
        bookButton.title &&
        bookButton.title !== ''
      ) {
        return { ...bookButton, type: this.checkUrlType(bookButton.link) };
      }

      return null;
    },
    offer() {
      const offerButton =
        this.header.content && this.header.content.offer
          ? this.header.content.offer
          : null;

      if (
        offerButton &&
        offerButton.link &&
        offerButton.link !== '' &&
        offerButton.title &&
        offerButton.title !== ''
      ) {
        return { ...offerButton, type: this.checkUrlType(offerButton.link) };
      }

      return null;
    },
    buttons() {
      const buttons = [];

      if (this.book) {
        buttons.push({
          ...this.book,
          icon: 'icon-phone',
        });
      }

      if (this.offer) {
        buttons.push({
          ...this.offer,
          icon: 'icon-offer',
        });
      }

      return buttons;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/layout/page-header';
@import '~@/assets/scss/blocks/logo';
@import '~@/assets/scss/blocks/burger';
</style>