<template lang="pug">
section.banquet(v-if='page && pageName && sections && section', ref='section')
  .banquet__container.container
    h2.title-inner.banquet__title(v-if='title', v-html='title', ref='title')

    SwiperSlider(
      v-if='images && images.length > 0', 
      :class="`banquet__slider banquet__slider--${pageName}`"
      :modules="modules"
      :slides-per-view="swiperOptions.slidesPerView",
      :space-between="swiperOptions.spaceBetween",
      :resize-observer="swiperOptions.resizeObserver",
      :speed="swiperOptions.speed",   
      :pagination="swiperPagination",
      :effect="swiperOptions.effect",
      :fadeEffect="{crossFade: true}",
      :autoplay="swiperOptions.autoplay",
      :loop="swiperOptions.loop",
      @swiper="setSwiper"
    )
      SwiperSlide(
        v-for='image in images',
        :key='image',
        :class="`banquet__slide banquet__slide--${pageName}`"
        @click="slideChange"
      )
        BaseImage(
          sectionName='banquet',
          :modificator='pageName',
          :image='image',
          alt='img'
        )
        
    BasePagination(:swiperIndex="swiperIndex", sectionName='banquet')
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import titleAnimation from '@/mixins/titleAnimation';
import imageBgAnimation from '@/mixins/imageBgAnimation';
import swiperSliderInit from '@/mixins/swiperSliderInit';

export default {
  mixins: [
    imageBgAnimation,
    titleAnimation,
    converteSymbolsNewLineToBr,
    swiperSliderInit,
  ],
  data() {
    return {
      sectionName: 'banquet',
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page?.content && this.page.content.sections
        ? this.page.content.sections
        : null;
    },
    section() {
      return this.sections && this.sections[2] ? this.sections[2] : null;
    },
    title() {
      return this.section?.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    images() {
      return this.section?.images ? this.section.images : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/banquet';
</style>
