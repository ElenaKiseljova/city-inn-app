<template lang="pug">
section.mission(v-if='page && sections && section', ref='section')
  .mission__container.container
    h2.title-inner.mission__title(v-if='title', v-html='title', ref='title')

    .mission__content
      p.mission__text(v-if='text', v-html='text')

    BaseNavigation(sectionName='mission')

    BaseSlider(v-if='images && images.length > 0', sectionName='mission')
      BaseSlide(v-for='image in images', sectionName='mission')
        BaseImage(
          sectionName='mission',
          modificator='mission',
          :image='image',
          alt='img'
        )
    BasePagination(sectionName='mission')
</template>

<script>
import { mapGetters } from 'vuex';

import titleAnimation from '../../mixins/titleAnimation';
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
  mixins: [titleAnimation, converteSymbolsNewLineToBr],
  computed: {
    ...mapGetters(['page']),
    sections() {
      return this.page.content && this.page.content.sections
        ? this.page.content.sections
        : null;
    },
    section() {
      return this.sections && this.sections[0] ? this.sections[0] : null;
    },
    title() {
      return this.section && this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    text() {
      return this.section && this.section.text && this.section.text !== ''
        ? this.converteSymbolsNewLineToBr(this.section.text)
        : null;
    },
    images() {
      return this.section && this.section.images ? this.section.images : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/mission';
</style>