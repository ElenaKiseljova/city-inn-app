<template lang="pug">
section.gallery(v-if='page && sections && section')
  h2.visually-hidden Gallery

  .gallery__container.container
    SwiperSlider(
      v-if='images?.length > 0',
      :class="`gallery__slider gallery__slider--${pageName}`"
      :modules="modules"
      :slides-per-view="swiperOptions.slidesPerView",
      :space-between="swiperOptions.spaceBetween",
      :resize-observer="swiperOptions.resizeObserver",
      :speed="swiperOptions.speed",
      :navigation="swiperNavigation",
      :pagination="swiperPagination",
      :loop="swiperOptions.loop",
      @swiper="setSwiper"
    )
      SwiperSlide(
        v-for='image in images',
        :key='image',
        :class="`gallery__slide gallery__slide--${pageName}`",
        @click="slideChange"
      )
  
        BaseImage(
          sectionName='gallery',
          :modificator='pageName',
          :image='image'
        )

    BasePagination(:swiperIndex="swiperIndex", sectionName='gallery', :modificator='pageName')

    BaseNavigation(:swiperIndex="swiperIndex", sectionName='gallery', :modificator='pageName')
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import swiperSliderInit from '@/mixins/swiperSliderInit';

export default {
  mixins: [converteSymbolsNewLineToBr, swiperSliderInit],
  data() {
    return {
      sectionName: 'gallery',
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page?.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections && this.sections[2] ? this.sections[2] : null;
    },
    images() {
      return this.section && this.section.images ? this.section.images : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/gallery';
</style>
