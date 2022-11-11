<template lang="pug">
section.cosy(v-if='page && pageName && sections && section', ref='section')
  .cosy__container.container
    .cosy__top
      h2.title-inner.cosy__title.cosy__title--mobile(
        v-if='title',
        v-html='title'
      )

      SwiperSlider(
        v-if='images?.length > 0',
        :class="`cosy__slider cosy__slider--${pageName}`"
        :modules="modules"
        :slides-per-view="slidesPerView",
        :space-between="spaceBetween",
        :resize-observer="resizeObserver",
        :speed="speed",
        :navigation="{ nextEl: '.cosy__navigation .navigation__next', prevEl: '.cosy__navigation .navigation__prev' }"
        :pagination="{ el: '.cosy__pagination', clickable: true }",
        @swiper="setSwiper"
      )
        SwiperSlide(
          v-for='image in images',
          :key='image',
          :class="`cosy__slide cosy__slide--${pageName}`",
          @click="slideChange"
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
        v-html='title',
        ref='title'
      )

      .cosy__content
        p.cosy__text.cosy__text--top(v-if='textTop', v-html='textTop')

        p.cosy__text.cosy__text--bottom(v-if='textBottom', v-html='textBottom')

      BaseNavigation(sectionName='cosy', :modificator='pageName')
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
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page?.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections && this.sections[0] ? this.sections[0] : null;
    },
    title() {
      return this.section?.title && this.section.title !== ''
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
      return this.section?.textBottom && this.section.textBottom !== ''
        ? this.converteSymbolsNewLineToBr(this.section.textBottom)
        : null;
    },
    images() {
      return this.section?.images ? this.section.images : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/cosy';
</style>
