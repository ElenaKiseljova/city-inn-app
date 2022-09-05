<template lang="pug">
section.seating(v-if='page && sections && section')
  h2.title-inner.seating__title(v-if='title', v-html='title')

  BasePagination(sectionName='seating')

  BaseNavigation(sectionName='seating')

  BaseSlider(v-if='slides?.length > 0', sectionName='seating')
    BaseSlide(v-for='slide in slides', sectionName='seating')
      .seating__top
        BaseImage(
          sectionName='seating',
          :modificator='pageName',
          :image='slide.image'
        )

      .seating__bottom
        .seating__header
          .seating__icon
            img(width='50', height='50', :src='slide.SVG', alt='icon')
            //- svg(width='50', height='50')
            //-   use(
            //-     xlink:href="@/assets/img/sprites/sprite-mono.svg#icon-" + slide.icon
            //-   )

          h3.seating__subtitle
            | {{ slide.title }}

        BaseServices(
          sectionName='seating',
          modificator='seating',
          :items='slide.services'
        )

        BaseButton(
          sectionName='seating',
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
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseServices from '@/components/UI/BaseServices.vue';

export default {
  components: {
    BasePagination,
    BaseNavigation,
    BaseSlider,
    BaseSlide,
    BaseImage,
    BaseButton,
    BaseServices,
  },
  mixins: [converteSymbolsNewLineToBr],
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page.content?.sections ? this.page.content.sections : null;
    },
    section() {
      return this.sections && this.sections[1] ? this.sections[1] : null;
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
@import '~@/assets/scss/blocks/seating';
</style>