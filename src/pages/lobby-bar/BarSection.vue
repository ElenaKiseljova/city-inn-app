<template lang="pug">
section.bar(v-if='page && pageName && sections && section', ref='section')
  .bar__container.container
    .bar__top
      .bar__title-wrapper
        h2.title-inner.bar__title(v-if='title', v-html='title', ref='title')

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

import titleAnimation from '@/mixins/titleAnimation';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import imageBgAnimation from '@/mixins/imageBgAnimation';

export default {
  mixins: [imageBgAnimation, titleAnimation, converteSymbolsNewLineToBr],
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page?.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections && this.sections[1] ? this.sections[1] : null;
    },
    title() {
      return this.section?.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    text() {
      return this.section?.text && this.section.text !== ''
        ? this.converteSymbolsNewLineToBr(this.section.text)
        : null;
    },
    image() {
      return this.section?.image ? this.section.image : null;
    },
    more() {
      return this.section?.more ? this.section.more : null;
    },
    book() {
      return this.section?.book ? this.section.book : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/bar';
</style>