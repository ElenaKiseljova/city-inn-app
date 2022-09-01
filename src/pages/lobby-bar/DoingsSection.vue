<template lang="pug">
section.doings(v-if='page && pageName && sections && section', ref='section')
  .doings__title-wrapper
    h2.title-inner.doings__title(v-if='title', v-html='title', ref='title')

  .doings__slider-container(v-if='slides && slides.length > 0')
    BaseSlider(sectionName='doings', :modificator='pageName')
      BaseSlide(
        v-for='slide in slides',
        :key='slide.title',
        sectionName='doings',
        :modificator='pageName'
      ) 
        .doings__top
          BaseImage(
            sectionName='doings',
            :modificator='pageName',
            :image='slide.image'
          )

        .doings__bottom
          h3.doings__subtitle(
            v-if='slide.title && slide.title !== ""',
            v-html='converteSymbolsNewLineToBr(slide.title)'
          )

          p.doings__text(
            v-if='slide.text && slide.text !== ""',
            v-html='converteSymbolsNewLineToBr(slide.text)'
          )

    BaseNavigation(sectionName='doings', :modificator='pageName')

    BasePagination(sectionName='doings', :modificator='pageName')
</template>

<script>
import { mapGetters } from 'vuex';

import titleAnimation from '../../mixins/titleAnimation';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseSlider from '../../components/UI/BaseSlider.vue';
import BaseSlide from '../../components/UI/BaseSlide.vue';
import BasePagination from '../../components/UI/BasePagination.vue';
import BaseNavigation from '../../components/UI/BaseNavigation.vue';
import BaseImage from '../../components/UI/BaseImage.vue';

export default {
  mixins: [titleAnimation, converteSymbolsNewLineToBr],
  components: {
    BaseSlider,
    BaseSlide,
    BasePagination,
    BaseNavigation,
    BaseImage,
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page && this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections && this.sections[0] ? this.sections[0] : null;
    },
    title() {
      return this.section && this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    slides() {
      return this.section && this.section.slides ? this.section.slides : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/doings';
</style>