<template lang="pug">
footer#footer(
  v-if='pageName && header && footer',
  :class='`page-footer page-footer--${pageName}`',
  ref='footer'
)
  .page-footer__container.container
    .page-footer__left
      BaseLogo(sectionName='page-footer', modificator='footer') 

      .page-footer__copyright
        p.page-footer__text(v-for='(copyrightText, index) in copyright')
          | {{ copyrightText }}

          span(v-if='index === 0') © {{ year }}

    .page-footer__right
      .page-footer__social
        BaseSocial(:items='social', direction='horizontal')

      ul.page-footer__list
        li.page-footer__item(v-for='(column, index) in columns')
          h4.page-footer__title
            | {{ column.title }}

          template(v-for='item in column.items')
            address.page-footer__address(v-if='item.type === "text"')
              | {{ item.text }}

            a.page-footer__link(
              v-else-if='item.type === "link"',
              :href='item.link'
            )
              | {{ item.text }}

            router-link.page-footer__link(
              v-else-if='item.type === "route"',
              :to='item.link'
            )
              | {{ item.text }}
</template>

<script>
import { mapGetters } from 'vuex';

import { pageFooterAnimation } from '@/assets/js/modules/gsap-animations';

import social from '@/mixins/social';
import checkUrlType from '@/mixins/checkUrlType';

export default {
  components: {},
  mixins: [social, checkUrlType],
  data() {
    return {
      footerAnimationInited: false,
    };
  },
  computed: {
    ...mapGetters(['pageName', 'header', 'footer', 'routeChanged']),
    columns() {
      if (this.footer.content?.columns) {
        const columnsWithType = this.footer.content.columns.map((column) => {
          const items = column.items || [];

          items.forEach((item) => {
            item.type = this.checkUrlType(item.link);
          });

          return column;
        });

        return columnsWithType;
      }

      return [];
    },
    copyright() {
      if (this.footer.content?.copyright) {
        return this.footer.content.copyright;
      }

      return [];
    },
    year() {
      return new Date().getFullYear();
    },
  },
  watch: {
    async routeChanged(newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        this.setFooterAnimation('reset');
      } else if (newVal === true) {
        // 500 time for animation route
        setTimeout(() => {
          this.setFooterAnimation();
        }, 500);
      }
    },
  },
  mounted() {
    this.setFooterAnimation();
  },
  updated() {
    this.setFooterAnimation();
  },
  methods: {
    setFooterAnimation(type = 'init') {
      if (type === 'init' && this.routeChanged && this.$refs.footer) {
        if (!this.footerAnimationInited) {
          this.footerAnimationInited = pageFooterAnimation.init(
            this.$refs.footer
          );
        }
      } else if (type === 'reset' && !this.routeChanged) {
        pageFooterAnimation.reset();

        this.footerAnimationInited = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/layout/page-footer';
</style>