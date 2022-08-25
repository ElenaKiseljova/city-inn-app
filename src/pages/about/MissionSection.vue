<template lang="pug">
section.mission(v-if='page')
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
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseSlider from '../../components/UI/BaseSlider.vue';
import BaseSlide from '../../components/UI/BaseSlide.vue';
import BaseNavigation from '../../components/UI/BaseNavigation.vue';
import BasePagination from '../../components/UI/BasePagination.vue';
import BaseImage from '../../components/UI/BaseImage.vue';

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
    ...mapGetters(['page']),
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