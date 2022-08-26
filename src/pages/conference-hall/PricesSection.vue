<template lang="pug">
section.prices(v-if='page && sections && section')
  h2.title-inner.prices__title(v-if='title', v-html='title')

  BasePagination(sectionName='prices')
  BaseNavigation(sectionName='prices')

  BaseSlider(v-if='slides && slides.length > 0', sectionName='prices')
    BaseSlide(v-for='slide in slides', sectionName='prices')
      .prices__top
        BaseImage(
          sectionName='prices',
          :modificator='pageName',
          :image='slide.image'
        )

      .prices__bottom
        h3.prices__subtitle(
          v-if='slide.title && slide.title !== ""',
          v-html='converteSymbolsNewLineToBr(slide.title)'
        )

        p.prices__text(
          v-if='slide.text && slide.text !== ""',
          v-html='converteSymbolsNewLineToBr(slide.text)'
        )

        ServicesList(
          v-if='slide.services && slide.services.length > 0',
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

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BasePagination from '@/components/UI/BasePagination.vue';
import BaseNavigation from '@/components/UI/BaseNavigation.vue';
import BaseSlider from '@/components/UI/BaseSlider.vue';
import BaseSlide from '@/components/UI/BaseSlide.vue';
import BaseImage from '@/components/UI/BaseImage.vue';
import ServicesList from '@/components/blocks/ServicesList.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BasePrice from '@/components/UI/BasePrice.vue';

export default {
  components: {
    BasePagination,
    BaseNavigation,
    BaseSlider,
    BaseSlide,
    BaseImage,
    ServicesList,
    BaseButton,
    BasePrice,
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
      return this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    slides() {
      return this.section.slides ? this.section.slides : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/prices';
</style>