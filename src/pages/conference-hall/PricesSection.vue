<template lang="pug">
section.prices.dooble(v-if='page && sections && section', ref='section')
  h2.title-inner.prices__title(v-if='title', v-html='title', ref='title')

  BasePagination(sectionName='prices')
  BaseNavigation(sectionName='prices')

  .prices__slider-container
    BaseSlider(v-if='slides?.length > 0', sectionName='prices', additionalClass='dooble__slider dooble__slider--images')
      BaseSlide(v-for='slide in slides', sectionName='prices')
        .prices__top
          BaseImage(
            sectionName='prices',
            :modificator='pageName',
            :image='slide.image'
          )

    BaseSlider(v-if='slides?.length > 0', sectionName='prices', additionalClass='dooble__slider dooble__slider--text')
      BaseSlide(v-for='slide in slides', sectionName='prices')
        .prices__bottom
          h3.prices__subtitle(
            v-if='slide.title && slide.title !== ""',
            v-html='converteSymbolsNewLineToBr(slide.title)'
          )

          p.prices__text(
            v-if='slide.text && slide.text !== ""',
            v-html='converteSymbolsNewLineToBr(slide.text)'
          )

          BaseServices(
            v-if='slide.services?.length > 0',
            sectionName='prices',
            modificator='prices',
            :items='slide.services'
          )

          BasePrice(
            v-if='slide.price',
            sectionName='prices',
            modificator='prices',
            :price='{ number: slide.price, text: slide.priceFor || slide.prePrice }'
          )

          BaseButton(
            sectionName='prices',
            :modificator='pageName',
            :button='slide.button'
          )

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
      return this.sections && this.sections[2] ? this.sections[2] : null;
    },
    title() {
      return this.section?.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    slides() {
      return this.section?.slides ? this.section.slides : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/prices';
</style>
