<template lang="pug">
section.bar(v-if='page && pageName && sections && section')
  .bar__container.container
    .bar__top
      h2.title-inner.bar__title(v-if='title', v-html='title')

      .bar__img-wrapper(v-if='image')
        BaseImage(sectionName='bar', :modificator='pageName', :image='image')

    .bar__bottom
      .bar__content
        p.bar__text(v-if='text', v-html='text')

      .bar__buttons
        BaseButton(
          v-if='more',
          sectionName='bar',
          :modificator='`${pageName},more`',
          :button='more'
        )

        BaseButton(
          v-if='book',
          sectionName='bar',
          :modificator='`${pageName},book`',
          :button='book'
        )
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../../components/UI/BaseImage.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

export default {
  mixins: [converteSymbolsNewLineToBr],
  components: {
    BaseImage,
    BaseButton,
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page && this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections && this.sections[1] ? this.sections[1] : null;
    },
    title() {
      return this.section && this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    text() {
      return this.section && this.section.text && this.section.text !== ''
        ? this.converteSymbolsNewLineToBr(this.section.text)
        : null;
    },
    image() {
      return this.section && this.section.image ? this.section.image : null;
    },
    more() {
      return this.section && this.section.more ? this.section.more : null;
    },
    book() {
      return this.section && this.section.book ? this.section.book : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/bar';
</style>