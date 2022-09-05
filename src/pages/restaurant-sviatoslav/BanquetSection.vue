<template lang="pug">
section.banquet(v-if='page && pageName && sections && section')
  .banquet__container.container
    h2.title-inner.banquet__title(v-if='title', v-html='title')

    BaseSlider(v-if='images && images.length > 0', sectionName='banquet')
      BaseSlide(v-for='image in images', sectionName='banquet')
        BaseImage(
          sectionName='banquet',
          :modificator='pageName',
          :image='image',
          alt='img'
        )
    BasePagination(sectionName='banquet')
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseSlider from '../../components/UI/BaseSlider.vue';
import BaseSlide from '../../components/UI/BaseSlide.vue';
import BaseNavigation from '../../components/UI/BaseNavigation.vue';
import BasePagination from '../../components/UI/BasePagination.vue';
import BaseImage from '../../components/UI/BaseImage.vue';

export default {
  components: {
    BaseSlider,
    BaseSlide,
    BaseNavigation,
    BasePagination,
    BaseImage,
  },
  mixins: [converteSymbolsNewLineToBr],
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page.content && this.page.content.sections
        ? this.page.content.sections
        : null;
    },
    section() {
      return this.sections && this.sections[2] ? this.sections[2] : null;
    },
    title() {
      return this.section && this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    images() {
      return this.section && this.section.images ? this.section.images : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/banquet';
</style>