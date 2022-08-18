<template lang="pug">
footer#footer(:class='`page-footer page-footer--${pageName}`')
  .page-footer__container.container
    .page-footer__left
      .page-footer__logo.logo.logo--footer
        router-link.logo__link(to='/')
          svg(width='120', height='120')
            use(xlink:href='@/assets/img/sprites/sprite-multi.svg#icon-logo')

      .page-footer__copyright
        p.page-footer__text(v-for='(copyrightText, index) in copyright')
          | {{ copyrightText }}

          span(v-if='index === 0') © {{ year }}

    .page-footer__right
      .page-footer__social
        SocialList(:items='social', direction='horizontal')

      ul.page-footer__list
        li.page-footer__item(v-for='(column, index) in columns')
          h4.page-footer__title
            | {{ column.title }}

          template(v-for='item in column.items')
            address.page-footer__address(v-if='item.link === ""')
              | {{ item.text }}

            a.page-footer__link(
              v-else-if='item.link !== "" && item.link.includes("http") && item.link.includes("tel:") && item.link.includes("mailto:")',
              :href='item.link'
            )
              | {{ item.text }}

            router-link.page-footer__link(v-else, :to='item.link')
              | {{ item.text }}
</template>

<script>
import social from '../../mixins/social';

import SocialList from '../blocks/SocialList.vue';

export default {
  components: {
    SocialList,
    item: null,
  },
  watch: {
    item() {
      console.log('item changed');
    },
  },
  mixins: [social],
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    header() {
      return this.$store.getters.header;
    },
    footer() {
      return this.$store.getters.footer;
    },
    columns() {
      if (this.footer.content && this.footer.content.columns) {
        return this.footer.content.columns;
      }

      return [];
    },
    copyright() {
      if (this.footer.content && this.footer.content.copyright) {
        return this.footer.content.copyright;
      }

      return [];
    },
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/layout/page-footer';
</style>