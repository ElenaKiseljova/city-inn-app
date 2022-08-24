<template lang="pug">
section.mission
  .mission__container.container
    h2.title-inner.mission__title(v-html='title')

    .mission__content
      p.mission__text(v-html='text')

    BaseNavigation(sectionName='mission')

    BaseSlider(sectionName='mission')
      BaseSlide(v-for='image in images', sectionName='mission')
        BaseImage(
          sectionName='mission',
          :modificator='sectionName',
          :image='image',
          alt='img'
        )
    BasePagination(sectionName='mission')
</template>

<script>
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseSlider from '../../components/mixins/BaseSlider.vue';
import BaseSlide from '../../components/mixins/BaseSlide.vue';
import BaseNavigation from '../../components/mixins/BaseNavigation.vue';
import BasePagination from '../../components/mixins/BasePagination.vue';
import BaseImage from '../../components/mixins/BaseImage.vue';

export default {
  mixins: [converteSymbolsNewLineToBr],
  components: {
    BaseSlider,
    BaseSlide,
    BaseNavigation,
    BasePagination,
    BaseImage,
  },
  data() {
    return {
      sectionName: 'mission',
    };
  },
  computed: {
    page() {
      return this.$store.getters.page || {};
    },
    mission() {
      return this.page.content &&
        this.page.content.sections &&
        this.page.content.sections[0]
        ? this.page.content.sections[0]
        : {};
    },
    title() {
      const title = this.mission.title;

      return title ? this.converteSymbolsNewLineToBr(title) : '';
    },
    text() {
      const text = this.mission.text;

      return text ? this.converteSymbolsNewLineToBr(text) : '';
    },
    images() {
      return this.mission.images || [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/mission';
</style>