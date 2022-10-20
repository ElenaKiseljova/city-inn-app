<template lang="pug">
section.gallery(v-if='page && sections && section')
  h2.visually-hidden Gallery

  .gallery__container.container
    BaseSlider(
      v-if='images?.length > 0',
      sectionName='gallery',
      :modificator='pageName'
    )
      BaseSlide(
        v-for='iamge in images',
        sectionName='gallery',
        :modificator='pageName'
      )
        BaseImage(
          sectionName='gallery',
          :modificator='pageName',
          :image='iamge'
        )

    BasePagination(sectionName='gallery', :modificator='pageName')

    BaseNavigation(sectionName='gallery', :modificator='pageName')
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';

export default {
  mixins: [converteSymbolsNewLineToBr],
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page?.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections && this.sections[2] ? this.sections[2] : null;
    },
    images() {
      return this.section && this.section.images ? this.section.images : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/gallery';
</style>