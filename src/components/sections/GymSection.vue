<template lang="pug">
section(
  v-if='page && sections && section',
  :class='`gym gym--${pageName}`',
  ref='section'
)
  div(:class='`gym__container container gym__container--${pageName}`')
    div(:class='`gym__top gym__top--${pageName}`')
      h2(
        v-if='title',
        v-html='title',
        :class='`title-inner gym__title gym__title--mobile gym__title--${pageName}`',
        ref='titleMobile'
      )

      SwiperSlider(
        v-if='images && images.length > 0',
        :class="`gym__slider gym__slider--${pageName}`"
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
          :class="`gym__slide gym__slide--${pageName}`",
          @click="slideChange"
        )
          BaseImage(
            sectionName='gym',
            :modificator='pageName',
            :image='image',
            atr='img'
          )

      BasePagination(:swiperIndex="swiperIndex", sectionName='gym', :modificator='pageName')

    div(:class='`gym__bottom gym__bottom--${pageName}`')
      h2(
        v-if='title',
        v-html='title',
        :class='`title-inner gym__title gym__title--desktop gym__title--${pageName}`',
        ref='title'
      )

      h3(
        v-if='subTitle',
        v-html='subTitle',
        :class='`gym__subtitle gym__subtitle--${pageName}`'
      )

      p(
        v-if='description',
        v-html='description',
        :class='`gym__description gym__description--${pageName}`'
      )

      BaseWorktime(
        v-if='worktime',
        sectionName='gym',
        :modificator='pageName',
        :text='worktime'
      )

      div(:class='`gym__buttons gym__buttons--${pageName}`')
        BaseButton(
          v-if='rules',
          sectionName='gym',
          :modificator='pageName',
          :button='rules'
        )

        div(:class='`gym__arrow-top arrow-top gym__arrow-top--${pageName}`')
          svg(width='48', height='48')
            use(
              xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-arrow-top'
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
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page?.content.sections ? this.page.content.sections : null;
    },
    section() {
      if (this.pageName === 'starfit') {
        return this.sections && this.sections[2] ? this.sections[2] : null;
      }

      if (this.pageName === 'group') {
        return this.sections && this.sections[4] ? this.sections[4] : null;
      }

      return null;
    },
    title() {
      return this.section?.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    subTitle() {
      return this.section?.subTitle && this.section.subTitle !== ''
        ? this.converteSymbolsNewLineToBr(this.section.subTitle)
        : null;
    },
    description() {
      if (this.section) {
        const text = this.section.description || this.section.textTop;

        return text && text !== ''
          ? this.converteSymbolsNewLineToBr(text)
          : null;
      }

      return null;
    },
    images() {
      return this.section?.images ? this.section.images : [];
    },
    rules() {
      return this.section && (this.section.button || this.section.rules)
        ? this.section.button || this.section.rules
        : null;
    },
    worktime() {
      return this.section?.worktime && this.section.worktime !== ''
        ? this.section.worktime
        : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/gym';
</style>
