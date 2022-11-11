<template lang="pug">
section.mission(v-if='page && sections && section', ref='section')
  .mission__container.container
    h2.title-inner.mission__title(v-if='title', v-html='title', ref='title')

    .mission__content
      p.mission__text(v-if='text', v-html='text')

    BaseNavigation(sectionName='mission')

    SwiperSlider(
      v-if='images && images.length > 0',
      :class="`mission__slider`"
      :modules="modules"
      :slides-per-view="slidesPerView",
      :space-between="spaceBetween",
      :resize-observer="resizeObserver",
      :speed="speed",      
      :pagination="{ el: '.mission__pagination', clickable: true }",
      :navigation="{ nextEl: '.mission__navigation .navigation__next', prevEl: '.mission__navigation .navigation__prev' }",
      :effect="'fade'",
      :autoplay="autoplay",
      @swiper="setSwiper"
    )
      SwiperSlide(
        v-for='image in images',
        :key='image',
        :class="`mission__slide`"
        @click="slideChange"
      )
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

import titleAnimation from '@/mixins/titleAnimation';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import imageBgAnimation from '@/mixins/imageBgAnimation';
import swiperSliderInit from '@/mixins/swiperSliderInit';

export default {
  mixins: [
    imageBgAnimation,
    titleAnimation,
    converteSymbolsNewLineToBr,
    swiperSliderInit,
  ],
  computed: {
    ...mapGetters(['page']),
    sections() {
      return this.page?.content?.sections ? this.page.content.sections : null;
    },
    section() {
      return this.sections && this.sections[0] ? this.sections[0] : null;
    },
    title() {
      return this.section?.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    text() {
      return this.section?.text && this.section.text !== ''
        ? this.converteSymbolsNewLineToBr(this.section.text)
        : null;
    },
    images() {
      return this.section?.images ? this.section.images : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/mission';
</style>
