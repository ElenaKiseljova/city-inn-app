<template lang="pug">
section.cosy(v-if='page && pageName && sections && section', ref='section')
  .cosy__container.container
    .cosy__top
      h2.title-inner.cosy__title.cosy__title--mobile(
        v-if='title',
        v-html='title'
      )

      BaseSlider(
        v-if='images && images.length > 0',
        sectionName='cosy',
        :modificator='pageName'
      )
        BaseSlide(
          v-for='image in images',
          :key='image',
          sectionName='cosy',
          :modificator='pageName'
        )
          BaseImage(
            sectionName='cosy',
            :modificator='pageName',
            :image='image'
          )

      BasePagination(sectionName='cosy', :modificator='pageName')

    .cosy__bottom
      h2.title-inner.cosy__title.cosy__title--desktop(
        v-if='title',
        v-html='title'
      )

      .cosy__content
        p.cosy__text.cosy__text--top(v-if='textTop', v-html='textTop')

        p.cosy__text.cosy__text--bottom(v-if='textBottom', v-html='textBottom')

      BaseNavigation(sectionName='cosy', :modificator='pageName')
</template>

<script>
import { mapGetters } from 'vuex';

import sectionAnimation from '../../mixins/sectionAnimation';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseSlider from '../../components/UI/BaseSlider.vue';
import BaseSlide from '../../components/UI/BaseSlide.vue';
import BasePagination from '../../components/UI/BasePagination.vue';
import BaseNavigation from '../../components/UI/BaseNavigation.vue';
import BaseImage from '../../components/UI/BaseImage.vue';

export default {
  components: {
    BaseSlider,
    BaseSlide,
    BasePagination,
    BaseNavigation,
    BaseImage,
  },
  mixins: [sectionAnimation, converteSymbolsNewLineToBr],
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
    textTop() {
      if (this.section) {
        const textTop =
          this.section.textTop || this.section.text || this.section.description;

        return textTop && textTop !== ''
          ? this.converteSymbolsNewLineToBr(textTop)
          : null;
      }

      return null;
    },
    textBottom() {
      return this.section &&
        this.section.textBottom &&
        this.section.textBottom !== ''
        ? this.converteSymbolsNewLineToBr(this.section.textBottom)
        : null;
    },
    images() {
      return this.section && this.section.images ? this.section.images : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/cosy';
</style>