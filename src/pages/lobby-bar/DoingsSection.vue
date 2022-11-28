<template lang="pug">
section.doings.dooble(v-if='page && pageName && sections && section', ref='section')
  .doings__title-wrapper
    h2.title-inner.doings__title(v-if='title', v-html='title', ref='title')

  .doings__slider-container(v-if='slides?.length > 0', ref='dooingsContainer')
    SwiperSlider(
      :class="`doings__slider doings__slider--images doings__slider--${pageName} dooble__slider dooble__slider--images`"
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
        :class="`doings__slide doings__slide--images doings__slide--${pageName} ${slideClass}`",
        @click="slideChange"
      )
        .doings__top
          BaseImage(
            sectionName='doings',
            :modificator='pageName',
            :image='slide.image'
          )

        .doings__bottom.doings__bottom--desktop(ref='dooingsBottom')
          h3.doings__subtitle(
            v-if='slide.title && slide.title !== ""',
            v-html='converteSymbolsNewLineToBr(slide.title)'
          )

          p.doings__text(
            v-if='slide.text && slide.text !== ""',
            v-html='converteSymbolsNewLineToBr(slide.text)'
          )
    
    SwiperSlider(
      :class="`doings__slider doings__slider--text doings__slider--${pageName} dooble__slider dooble__slider--text`"
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
        :class="`doings__slide doings__slide--text doings__slide--${pageName}`"
      )
        .doings__bottom.doings__bottom--mobile
          h3.doings__subtitle(
            v-if='slide.title && slide.title !== ""',
            v-html='converteSymbolsNewLineToBr(slide.title)'
          )

          p.doings__text(
            v-if='slide.text && slide.text !== ""',
            v-html='converteSymbolsNewLineToBr(slide.text)'
          )

    BaseNavigation(:swiperIndex="swiperIndex", sectionName='doings', :modificator='pageName')

    BasePagination(:swiperIndex="swiperIndex", sectionName='doings', :modificator='pageName')
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
      sectionName: 'doings',
      isSetDoingsMaxHeightTop: false,
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
      return this.sections && this.sections[0] ? this.sections[0] : null;
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
  mounted() {
    this.setHeightDoingsTop();
  },
  updated() {
    this.setHeightDoingsTop();
  },
  methods: {
    setHeightDoingsTop() {
      if (
        this.$refs.dooingsContainer &&
        this.$refs.dooingsBottom &&
        !this.isSetDoingsMaxHeightTop
      ) {
        const DOOINGS_MIN_HEIGHT_TOP = 520;
        let maxHeightBottom = 0;

        if (this.$refs.dooingsBottom?.length) {
          this.$refs.dooingsBottom.forEach((bot) => {
            if (bot.offsetHeight > maxHeightBottom)
              maxHeightBottom = bot.offsetHeight;
          });
        }

        const dooingsMaxHeightTop =
          this.$refs.dooingsContainer.offsetHeight - maxHeightBottom;
        const dooingsMaxHeightTopFinal =
          dooingsMaxHeightTop > DOOINGS_MIN_HEIGHT_TOP
            ? dooingsMaxHeightTop
            : DOOINGS_MIN_HEIGHT_TOP;

        this.$refs.dooingsContainer.style.setProperty(
          '--max-height-top',
          `${dooingsMaxHeightTopFinal}px`
        );

        this.isSetDoingsMaxHeightTop = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/doings';
</style>
