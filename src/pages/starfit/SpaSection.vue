<template lang="pug">
section.spa.dooble(v-if='page && sections && section', ref='section')
  .spa__left
    h2.title-inner.spa__title.spa__title--mobile(v-if='title', v-html='title', ref="titleMobile")

    SwiperSlider(
      v-if='slides && slides.length > 0',
      :class="`spa__slider spa__slider--images spa__slider--${pageName} dooble__slider dooble__slider--images`"
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
        :class="`spa__slide spa__slide--images spa__slide--${pageName} ${slideClass}`",
        @click="slideChange"
      )
        .spa__top
          BaseImage(
            sectionName='spa',
            :modificator='pageName',
            :image='slide.image'
          )

    SwiperSlider(
      v-if='slides && slides.length > 0',
      :class="`spa__slider spa__slider--text spa__slider--${pageName} dooble__slider dooble__slider--text`"
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
        :class="`spa__slide spa__slide--text spa__slide--${pageName}`"
      )
        .spa__bottom
          p.spa__text(
            v-if='slide.description && slide.description !== ""',
            v-html='converteSymbolsNewLineToBr(slide.description)'
          )

          BaseServices(
            v-if='slide.services && slide.services.length > 0',
            sectionName='spa',
            modificator='spa',
            :items='slide.services'
          )

          BaseWorktime(
            v-if='slide.worktime && slide.worktime !== ""',
            sectionName='spa',
            :modificator='pageName',
            :text='slide.worktime'
          )

          BaseButton(
            v-if='slide.button',
            sectionName='spa',
            :modificator='pageName',
            :button='slide.button'
          )
    
    BasePagination(:swiperIndex="swiperIndex", sectionName='spa', :modificator='pageName')

  .spa__right
    h2.title-inner.spa__title.spa__title--desktop(
      v-if='title',
      v-html='title',
      ref='title'
    )

    p.spa__text.spa__text--top(v-if='textTop', v-html='textTop')

    p.spa__text.spa__text--bottom(v-if='textBottom', v-html='textBottom')

    BaseServices(
      v-if='services && services.length > 0',
      sectionName='spa',
      modificator='spa',
      :items='services',
      :additionalItem='{ worktime }'
    )

    .spa__buttons
      BaseWorktime(
        v-if='worktime',
        sectionName='spa',
        modificator='desktop',
        :text='worktime'
      )

      BaseButton(
        v-if='rules',
        sectionName='spa',
        :modificator='pageName',
        :button='rules'
      )

      .spa__arrow-top.arrow-top
        svg(width='48', height='48')
          use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-arrow-top')
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
        : null;
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
      return this.section?.textTop && this.section.textTop !== ''
        ? this.converteSymbolsNewLineToBr(this.section.textTop)
        : null;
    },
    textBottom() {
      return this.section?.textBottom && this.section.textBottom !== ''
        ? this.converteSymbolsNewLineToBr(this.section.textBottom)
        : null;
    },
    worktime() {
      return this.section?.worktime && this.section.worktime !== ''
        ? this.section.worktime
        : null;
    },
    rules() {
      return this.section?.rules ? this.section.rules : null;
    },
    services() {
      return this.section?.services ? this.section.services : [];
    },
    slides() {
      return this.section?.slides ? this.section.slides : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/spa';
</style>
