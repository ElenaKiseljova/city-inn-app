<template lang="pug">
section(
  v-if='page && sectionName && section',
  :class='`food food--${sectionName}`',
  ref='section'
)
  .food__container.container
    div(:class='`food__top food__top--${sectionName}`')
      h2(
        v-if='title',
        v-html='title',
        :class='`title-inner food__title food__title--mobile food__title--${sectionName}`', ref='titleMobile'
      )

      div(
        v-if='images && images.length > 0',
        :class='`food__slider-container food__slider-container--${sectionName}`'
      )
        SwiperSlider(
          :class="`food__slider food__slider--${sectionName}`"
          :modules="modules"
          :slides-per-view="swiperOptions.slidesPerView",
          :space-between="swiperOptions.spaceBetween",
          :resize-observer="swiperOptions.resizeObserver",
          :speed="swiperOptions.speed",
          :navigation="swiperNavigation",
          :pagination="swiperPagination",
          @swiper="setSwiper",
          @slideChange="onSlideChange"
        )
          SwiperSlide(
            v-for='image in images',
            :class="`food__slide food__slide--${sectionName}`"
            @click="slideChange"
          )
            BaseImage(
              sectionName='food',
              :modificator='sectionName',
              :image='image',
              alt='img'
            )

        BaseNavigation(:swiperIndex="swiperIndex", sectionName='food', :modificator='sectionName')

        BasePagination(:swiperIndex="swiperIndex", sectionName='food', :modificator='sectionName')

    div(:class='`food__bottom food__bottom--${sectionName}`')
      h2(
        v-if='title',
        v-html='title',
        :class='`title-inner food__title food__title--desktop food__title--${sectionName}`',
        ref='title'
      )

      p.food__subtitle(v-if='subTitle', v-html='subTitle')

      div(:class='`food__content food__content--${sectionName}`')
        p.food__text.food__text--top(
          v-if='textTop',
          v-html='textTop',
          :class='`food__text--${sectionName}`'
        )

        p.food__text.food__text--bottom(v-if='textBottom', v-html='textBottom')

        ul(
          v-if='tabs && tabs.length > 0',
          :class='`food__tabs food__tabs--${sectionName}`'
        )
          li(
            v-for='(tab, index) in tabs',
            :class='`food__tab-number food__tab-number--${index + 1} food__tab-number--${sectionName}`'
          )
            | {{ index + 1 }}

          li(
            v-for='(tab, index) in tabs',
            :class='`food__tab-text food__tab-text--${index + 1}`'
          )
            p.food__text.food__text--top(
              v-if='tab.textTop && tab.textTop !== ""',
              v-html='converteSymbolsNewLineToBr(tab.textTop)'
            )
            p.food__text.food__text--top(
              v-else-if='tab.text && tab.text !== ""',
              v-html='converteSymbolsNewLineToBr(tab.text)'
            )

            p.food__text.food__text--bottom(
              v-if='tab.textBottom && tab.textBottom !== ""',
              v-html='converteSymbolsNewLineToBr(tab.textBottom)'
            )

        BaseButton(
          v-if='tabs && tabs.length > 0 && more',
          sectionName='food',
          :modificator='sectionName',
          :button='more'
        )

      div(
        v-if='worktime || menu',
        :class='`food__buttons food__buttons--${sectionName}`'
      )
        BaseWorktime(
          v-if='worktime',
          sectionName='food',
          :modificator='sectionName',
          :text='worktime'
        )

        BaseButton(
          v-if='menu',
          sectionName='food',
          :modificator='sectionName',
          :button='menu'
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
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['page']),
    sections() {
      return this.page?.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      if (
        this.sectionName === 'approach-conference' ||
        this.sectionName === 'approach-group'
      ) {
        return this.sections && this.sections[0] ? this.sections[0] : null;
      }

      if (this.sectionName === 'menu') {
        return this.sections && this.sections[1] ? this.sections[1] : null;
      }

      if (this.sectionName === 'advantages' || this.sectionName === 'supply') {
        return this.sections && this.sections[2] ? this.sections[2] : null;
      }

      if (this.sectionName === 'breakfast') {
        return this.sections && this.sections[3] ? this.sections[3] : null;
      }

      if (this.sectionName === 'why-conference') {
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
    more() {
      return this.section?.more ? this.section.more : null;
    },
    worktime() {
      return this.section?.worktime && this.section.worktime !== ''
        ? this.section.worktime
        : null;
    },
    menu() {
      return this.haveMenuButton &&
        this.section &&
        (this.section.menu || this.section.more || this.section.button)
        ? this.section.menu || this.section.more || this.section.button
        : null;
    },
    images() {
      return this.section?.images ? this.section.images : null;
    },
    tabs() {
      return this.section?.tabs ? this.section.tabs : null;
    },
    haveMenuButton() {
      return this.sectionName === 'menu' ||
        this.sectionName === 'supply' ||
        this.sectionName === 'breakfast'
        ? true
        : false;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/food';
</style>
