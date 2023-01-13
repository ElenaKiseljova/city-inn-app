<template lang="pug">
section.prices.dooble(v-if='page && sections && section', ref='section')
  h2.title-inner.prices__title(v-if='title', v-html='title', ref='title')

  BasePagination(:swiperIndex="swiperIndex", sectionName='prices')
  BaseNavigation(:swiperIndex="swiperIndex", sectionName='prices')

  .prices__slider-container
    SwiperSlider(
      v-if='slides?.length > 0', 
      :class="`prices__slider prices__slider--images prices__slider--${pageName} dooble__slider dooble__slider--images`"
      :modules="modules"
      :slides-per-view="swiperOptions.slidesPerView",
      :space-between="swiperOptions.spaceBetween",
      :resize-observer="swiperOptions.resizeObserver",
      :speed="swiperOptions.speed",
      :navigation="swiperNavigation",
      :pagination="swiperPagination",
      :controller="{ control: textSwiper }",
      :loop="swiperOptions.loop",
      @swiper="setSwiper"
      @beforeTransitionStart="onBeforeTransitionStart"
    )
      SwiperSlide(
        v-for='slide in slides',
        :key='slide.title',
        :class="`prices__slide prices__slide--images prices__slide--${pageName} ${slideClass}`",
        @click="slideChange"
      )
        .prices__top
          BaseImage(
            sectionName='prices',
            :modificator='pageName',
            :image='slide.image'
          )

    SwiperSlider(
      v-if='slides?.length > 0', 
      :class="`prices__slider prices__slider--text prices__slider--${pageName} dooble__slider dooble__slider--text`"
      :modules="modules"
      :slides-per-view="swiperTextOptions.slidesPerView",
      :space-between="swiperTextOptions.spaceBetween",
      :resize-observer="swiperTextOptions.resizeObserver",
      :speed="swiperTextOptions.speed",
      :controller="{ control: swiper }",
      :effect="swiperTextOptions.effect",
      :fadeEffect="{crossFade: true}",
      :loop="swiperOptions.loop",
      @swiper="setTextSwiper"
    )
      SwiperSlide(
        v-for='slide in slides',
        :key='slide.title',
        :class="`prices__slide prices__slide--text prices__slide--${pageName}`"
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
import swiperSliderInit from '@/mixins/swiperSliderInit';

export default {
  mixins: [
    titleAnimation,
    sectionAnimation,
    converteSymbolsNewLineToBr,
    swiperSliderInit,
  ],
  data() {
    return {
      sectionName: 'prices',
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
