<template lang="pug">
section.parking(v-if='page && pageName && sections && section', ref='section')
  .parking__container.container
    .parking__content
      h2.title-inner.parking__title(v-if='title', v-html='title', ref='title')

      p.parking__text(v-if='description', v-html='description')

    .parking__img-wrapper
      BaseImage(sectionName='parking', :modificator='pageName', :image='image')
</template>

<script>
import { mapGetters } from 'vuex';

import titleAnimation from '@/mixins/titleAnimation';
import sectionAnimation from '@/mixins/sectionAnimation';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';

export default {
  mixins: [titleAnimation, sectionAnimation, converteSymbolsNewLineToBr],
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page.content?.sections ? this.page.content.sections : null;
    },
    section() {
      return this.sections && this.sections[5] ? this.sections[5] : null;
    },
    title() {
      return this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    description() {
      return this.section.description && this.section.description !== ''
        ? this.converteSymbolsNewLineToBr(this.section.description)
        : null;
    },
    image() {
      return this.section.image ? this.section.image : {};
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/parking';
</style>