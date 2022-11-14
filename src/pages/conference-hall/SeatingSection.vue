<template lang="pug">
section.seating.dooble(v-if='page && sections && section', ref='section')
  h2.title-inner.seating__title(v-if='title', v-html='title', ref='title')

  BasePagination(:swiperIndex="swiperIndex", sectionName='seating')

  BaseNavigation(:swiperIndex="swiperIndex", sectionName='seating')

  .seating__slider-container
    SwiperSlider(
      v-if='slides?.length > 0', 
      :class="`seating__slider seating__slider--images seating__slider--${pageName} dooble__slider dooble__slider--images`"
      :modules="modules"
      :slides-per-view="swiperOptions.slidesPerView",
      :space-between="swiperOptions.spaceBetween",
      :resize-observer="swiperOptions.resizeObserver",
      :speed="swiperOptions.speed",
      :navigation="swiperNavigation",
      :pagination="swiperPagination",
      :controller="{ control: textSwiper }",
      @swiper="setSwiper"
      @beforeTransitionStart="onBeforeTransitionStart"
    )
      SwiperSlide(
        v-for='slide in slides',
        :key='slide.title',
        :class="`seating__slide seating__slide--images seating__slide--${pageName} ${slideClass}`",
        @click="slideChange"
      )
        .seating__top
          BaseImage(
            sectionName='seating',
            :modificator='pageName',
            :image='slide.image'
          )
    SwiperSlider(
      v-if='slides?.length > 0', 
      :class="`seating__slider seating__slider--text seating__slider--${pageName} dooble__slider dooble__slider--text`"
      :modules="modules"
      :slides-per-view="swiperTextOptions.slidesPerView",
      :space-between="swiperTextOptions.spaceBetween",
      :resize-observer="swiperTextOptions.resizeObserver",
      :speed="swiperTextOptions.speed",
      :controller="{ control: swiper }",
      :effect="swiperTextOptions.effect",
      :fadeEffect="{crossFade: true}",
      @swiper="setTextSwiper"
    )
      SwiperSlide(
        v-for='slide in slides',
        :key='slide.title',
        :class="`seating__slide seating__slide--text seating__slide--${pageName}`"
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

import titleAnimation from '@/mixins/titleAnimation';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import swiperSliderInit from '@/mixins/swiperSliderInit';

export default {
  mixins: [titleAnimation, converteSymbolsNewLineToBr, swiperSliderInit],
  data() {
    return {
      sectionName: 'seating',
    };
  },
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
