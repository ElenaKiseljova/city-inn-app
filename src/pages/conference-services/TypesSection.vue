<template lang="pug">
section.types(v-if='page && pageName && sections && section', ref='section')
  .types__container.container
    header.types__header
      h2.title-inner.types__title(v-if='title', v-html='title', ref='title')

      BasePagination(sectionName='types')

      BaseNavigation(sectionName='types')

    .types__slider-container(v-if='slides.length > 0')
      BaseSlider(sectionName='types', :modificator='pageName')
        BaseSlide(
          v-for='slide in slides',
          :key='slide.title',
          sectionName='types',
          :modificator='pageName'
        )
          .types__top
            h3.types__subtitle.types__subtitle--tablet(
              v-if='slide.title && slide.title !== ""',
              v-html='converteSymbolsNewLineToBr(slide.title)'
            )

            BaseImage(
              sectionName='types',
              :modificator='pageName',
              :image='slide.image'
            )

          .types__bottom
            h3.types__subtitle.types__subtitle--mobile(
              v-if='slide.title && slide.title !== ""',
              v-html='converteSymbolsNewLineToBr(slide.title)'
            )

            p.types__text(
              v-if='slide.description && slide.description !== ""',
              v-html='converteSymbolsNewLineToBr(slide.description)'
            )

            BaseServices(
              sectionName='types',
              modificator='types',
              :items='slide.services'
            )

            BaseButton(
              sectionName='types',
              modificator='types',
              :button='slide.button'
            )
</template>

<script>
import { mapGetters } from 'vuex';

import { typesItemsAnimation } from '@/assets/js/gsap-animations';

import titleAnimation from '@/mixins/titleAnimation';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';

export default {
  mixins: [titleAnimation, converteSymbolsNewLineToBr],
  data() {
    return {
      typesItemsAnimationIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page.content?.sections ? this.page.content.sections : null;
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
  mounted() {
    this.setTypesItemsAnimation();
  },
  updated() {
    this.setTypesItemsAnimation();
  },
  async beforeUnmount() {
    await typesItemsAnimation.reset();
  },
  methods: {
    setTypesItemsAnimation() {
      if (this.$refs.section && !this.typesItemsAnimationIsSet) {
        this.typesItemsAnimationIsSet = typesItemsAnimation.init(
          this.$refs.section
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/types';
</style>