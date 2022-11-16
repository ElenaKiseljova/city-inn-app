<template lang="pug">
section.types.dooble(v-if='page && pageName && sections && section', ref='section')
  .types__container.container
    header.types__header
      h2.title-inner.types__title(v-if='title', v-html='title', ref='title')

      BasePagination(:swiperIndex="swiperIndex", sectionName='types')

      BaseNavigation(:swiperIndex="swiperIndex", sectionName='types')

    .types__slider-container(v-if='slides.length > 0')
      SwiperSlider(
        :class="`types__slider types__slider--images types__slider--${pageName} dooble__slider dooble__slider--images`"
        :modules="modules"
        :slides-per-view="swiperOptions.slidesPerView",
        :space-between="swiperOptions.spaceBetween",
        :resize-observer="swiperOptions.resizeObserver",
        :speed="swiperOptions.speed",
        :navigation="swiperNavigation",
        :pagination="swiperPagination", 
        :enabled="swiperEnabled",
        :controller="{ control: textSwiper }",
        @swiper="setSwiper"
        @beforeTransitionStart="onBeforeTransitionStart"
      )
        SwiperSlide(
          v-for='slide in slides',
          :key='slide.title',
          :class="`types__slide types__slide--images types__slide--${pageName} ${slideClass}`",
          @click="slideChange"
        )
          .types__top
            h3.types__subtitle.types__subtitle--tablet(
              v-if='slide.title && slide.title !== ""',
              v-html='converteSymbolsNewLineToBr(slide.title)'
            )

            BaseImage(
              sectionName='types',
              :modificator='pageName',
              :image='slide.image'
            )

          .types__bottom.types__bottom--desktop
            h3.types__subtitle.types__subtitle--mobile(
              v-if='slide.title && slide.title !== ""',
              v-html='converteSymbolsNewLineToBr(slide.title)'
            )

            p.types__text(
              v-if='slide.description && slide.description !== ""',
              v-html='converteSymbolsNewLineToBr(slide.description)'
            )

            BaseServices(
              sectionName='types',
              modificator='types',
              :items='slide.services'
            )

            BaseButton(
              sectionName='types',
              modificator='types',
              :button='slide.button'
            )

      SwiperSlider(
        :class="`types__slider types__slider--text types__slider--${pageName} dooble__slider dooble__slider--text`"
        :modules="modules"
        :slides-per-view="swiperTextOptions.slidesPerView",
        :space-between="swiperTextOptions.spaceBetween",
        :resize-observer="swiperTextOptions.resizeObserver",
        :speed="swiperTextOptions.speed",
        :effect="swiperTextOptions.effect",
        :fadeEffect="{crossFade: true}",
        :controller="{ control: swiper }",
        @swiper="setTextSwiper"
      )
        SwiperSlide(
          v-for='slide in slides',
          :key='slide.title',
          :class="`types__slide types__slide--text types__slide--${pageName}`"
        )
          .types__bottom.types__bottom--mobile
            h3.types__subtitle.types__subtitle--mobile(
              v-if='slide.title && slide.title !== ""',
              v-html='converteSymbolsNewLineToBr(slide.title)'
            )

            p.types__text(
              v-if='slide.description && slide.description !== ""',
              v-html='converteSymbolsNewLineToBr(slide.description)'
            )

            BaseServices(
              sectionName='types',
              modificator='types',
              :items='slide.services'
            )

            BaseButton(
              sectionName='types',
              modificator='types',
              :button='slide.button'
            )
</template>

<script>
import { mapGetters } from 'vuex';

// import { typesItemsAnimation } from '@/assets/js/modules/gsap-animations';

import titleAnimation from '@/mixins/titleAnimation';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import swiperSliderInit from '@/mixins/swiperSliderInit';

export default {
  mixins: [titleAnimation, converteSymbolsNewLineToBr, swiperSliderInit],
  data() {
    return {
      // typesItemsAnimationIsSet: false,
      sectionName: 'types',
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
      return this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    slides() {
      return this.section.slides ? this.section.slides : [];
    },
  },
  // mounted() {
  //   this.setTypesItemsAnimation();
  // },
  // updated() {
  //   this.setTypesItemsAnimation();
  // },
  // async beforeUnmount() {
  //   await typesItemsAnimation.reset();
  // },
  // methods: {
  //   setTypesItemsAnimation() {
  //     if (this.$refs.section && !this.typesItemsAnimationIsSet) {
  //       this.typesItemsAnimationIsSet = typesItemsAnimation.init(
  //         this.$refs.section
  //       );
  //     }
  //   },
  // },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/types';
</style>
