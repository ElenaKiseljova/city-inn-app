<template lang="pug">
section.supply.dooble(
  v-if='page && pageName && section && slides',
  ref='section'
)
  .supply__container.container
    .supply__top
      .supply__slider-container(
        v-if='slides?.length > 0'
      )
        SwiperSlider(
          class="supply__slider supply__slider--images dooble__slider dooble__slider--images"
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
            :key='slide.image',
            class="supply__slide",
            @click="slideChange"
          )
            BaseImage(
              sectionName='supply',
              :modificator='pageName',
              :image='slide.image || slide.previewImage',
              alt='img'
            )

            h2.title-inner.supply__title.supply__title--mobile(
              v-if='slide.title',
              v-html='converteSymbolsNewLineToBr(slide.title)',
              ref='titleMobile'
            )

        BaseNavigation(:swiperIndex="swiperIndex", sectionName='supply', :modificator='pageName')

        BasePagination(:swiperIndex="swiperIndex", sectionName='supply', :modificator='pageName')

    .supply__bottom
      SwiperSlider(
        v-if='slides?.length > 0',
        class="supply__slider supply__slider--text dooble__slider dooble__slider--text"
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
          :key='slide.image',
          class="supply__slide supply__slide--text "
        )
          h2.title-inner.supply__title.supply__title--desktop(
              v-if='slide.title',
              v-html='converteSymbolsNewLineToBr(slide.title)',
              ref='title'
            )

          h3.supply__subtitle(
            v-if='subTitle',
            v-html='subTitle',
          )

          .supply__content(
            v-if='slide.topText || slide.bottomText || slide.text || slide.description',
          )
            p.supply__text.supply__text--top(
              v-if='slide.topText && slide.topText !== ""',
              v-html='converteSymbolsNewLineToBr(slide.topText)'
            )

            p.supply__text.supply__text--bottom(
              v-if='slide.bottomText && slide.bottomText !== ""',
              v-html='converteSymbolsNewLineToBr(slide.bottomText)'
            )

            p.supply__text(
              v-if='slide.description && slide.description !== ""',
              v-html='converteSymbolsNewLineToBr(slide.description)',
            )

          .supply__buttons(
            v-if='slide.button || slide.more',
          )
            BaseButton(
              sectionName='supply',
              :modificator='pageName',
              :button='slide.button || slide.more'
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
      sectionName: 'supply',
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
    slides() {
      return this.section && this.section.slides ? this.section.slides : [];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/supply';
</style>
