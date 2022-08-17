<template lang="pug">
footer(:class='`page-footer page-footer--${pageName}`')
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
          h4.page-footer__title.new
            | {{ column.title }}

          a.page-footer__link(
            v-for='columnLink in columnLinks(index)',
            :href='columnLink.link'
          )
            | {{ columnLink.text }}

          router-link.page-footer__link(
            v-for='columnLinkApp in columnLinksApp(index)',
            :to='columnLinkApp.link'
          )
            | {{ columnLinkApp.text }}

          address.page-footer__address(
            v-for='columnText in columnTexts(index)'
          )
            | {{ columnText.text }}
</template>

<script>
import social from '../../mixins/social';

import SocialList from '../blocks/SocialList.vue';

export default {
  components: {
    SocialList,
  },
  mixins: [social],
  methods: {
    columnLinksApp(index) {
      return this.columns[index].items.filter(
        (i) =>
          i.link &&
          i.link !== '' &&
          !i.link.includes('http') &&
          !i.link.includes('tel:') &&
          !i.link.includes('mailto:')
      );
    },
    columnTexts(index) {
      return this.columns[index].items.filter((i) => !i.link || i.link === '');
    },
    columnLinks(index) {
      return this.columns[index].items.filter(
        (i) =>
          !this.columnLinksApp(index).includes(i) &&
          !this.columnTexts(index).includes(i)
      );
    },
  },
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