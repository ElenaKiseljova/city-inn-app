<template lang="pug">
TheMain
  section.not-found 
    .not-found__container.container 
      h1.not-found__title 404

      p.not-found__text {{ text }}
        template(v-if='supportMail')
          br
          a(:href='supportMailHref') {{ supportMail }}

  .not-found__bottom(ref='notFoundBottom')
    .not-found__container.not-found__container--bottom.container 
      .not-found__social 
        BaseLang(sectionName='not-found')
        BaseSocial(:items='social', direction='horizontal')

      BaseButton(
        v-if='book',
        sectionName='not-found',
        :modificator='pageName',
        :button='book'
      )

      .not-found__call.call
        a.call__link(
          v-if='callUs.link && callUs.text',
          :href='callUs.link',
          :data-text='callUs.text',
          :data-phone='callUs.phone'
        )
          span.call__text
            | {{ callUs.text }}

          span.call__icon
            svg(width='48', height='48')
              use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-phone')

      a.not-found__phone.phone(v-if='callUs.link', :href='callUs.link')
        svg(width='48', height='48')
          use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-phone')
</template>

<script>
import { mapGetters } from 'vuex';

import { callUs } from '@/assets/js/call-us';
import social from '@/mixins/social';

import TheMain from '@/components/layout/TheMain.vue';

export default {
  components: {
    TheMain,
  },
  mixins: [social],
  data() {
    return {
      notFoundScriptsIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName', 'header']),
    book() {
      return this.header?.content?.book ? this.header.content.book : null;
    },
    callUs() {
      return this.header?.content?.call ? this.header.content.call : {};
    },
    text() {
      return this.page?.content && this.page.content.text
        ? this.page.content.text
        : '';
    },
    supportMail() {
      return this.page?.content && this.page.content.supportMail
        ? this.page.content.supportMail
        : null;
    },
    supportMailHref() {
      return this.supportMail ? `mailto:${this.supportMail}` : '#';
    },
  },
  mounted() {
    this.setNotFoundScripts();
  },
  updated() {
    this.setNotFoundScripts();
  },
  methods: {
    setNotFoundScripts() {
      if (this.$refs.notFoundBottom && !this.notFoundScriptsIsSet) {
        callUs(this.$refs.notFoundBottom);

        this.notFoundScriptsIsSet = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/not-found';
@import '~@/assets/scss/blocks/phone';
</style>




