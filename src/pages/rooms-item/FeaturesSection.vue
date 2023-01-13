<template lang="pug">
section.features(v-if='page && pageName && sections && section', ref='features')
  h2.visually-hidden Features

  .features__container.container
    SwiperSlider(
      v-if='services && services.length > 0',
      :class="`features__slider features__slider--${pageName}`"
      :modules="modules"
      :slides-per-view="swiperOptions.slidesPerView",
      :space-between="swiperOptions.spaceBetween",
      :resize-observer="swiperOptions.resizeObserver",
      :speed="swiperOptions.speed",
      :grid="swiperOptions.grid",
      :navigation="swiperNavigation",
      :pagination="swiperPagination",
      :enabled="swiperEnabled",
      :loop="swiperOptions.loop",
      @swiper="setSwiper"
    )
      SwiperSlide(
        v-for='service in services',
        :key='service',
        :class="`features__slide features__slide--${pageName}`",
        @click="slideChange"
      )
        BaseService(modificator='features', :item='service')

    BasePagination(:swiperIndex="swiperIndex", sectionName='features', :modificator='pageName')
</template>

<script>
import { mapGetters } from 'vuex';

import { featuresAnimation } from '@/assets/js/modules/gsap-animations';

import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import swiperSliderInit from '@/mixins/swiperSliderInit';

export default {
  mixins: [converteSymbolsNewLineToBr, swiperSliderInit],
  data() {
    return {
      featuresAnimationIsSet: false,
      sectionName: 'features',
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
      return this.sections && this.sections[1] ? this.sections[1] : null;
    },
    services() {
      return this.section?.services ? this.section.services : [];
    },
  },
  mounted() {
    this.setFeaturesAnimation();
  },
  updated() {
    this.setFeaturesAnimation();
  },
  beforeUnmount() {
    featuresAnimation.reset();
  },
  methods: {
    setFeaturesAnimation() {
      if (this.$refs.features && !this.featuresAnimationIsSet) {
        this.featuresAnimationIsSet = featuresAnimation.init(
          this.$refs.features
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/features';
</style>
