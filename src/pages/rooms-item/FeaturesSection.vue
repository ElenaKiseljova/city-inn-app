<template lang="pug">
section.features(v-if='page && pageName && sections && section', ref='features')
  h2.visually-hidden Features

  .features__container.container
    BaseSlider(
      v-if='services && services.length > 0',
      sectionName='features',
      :modificator='pageName'
    )
      BaseSlide(
        v-for='service in services',
        sectionName='features',
        :modificator='pageName'
      )
        BaseService(modificator='features', :item='service')

    BasePagination(sectionName='features', :modificator='pageName')
</template>

<script>
import { mapGetters } from 'vuex';

import { serviceAnimation } from '../../assets/js/gsap-animations';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseSlider from '../../components/UI/BaseSlider.vue';
import BaseSlide from '../../components/UI/BaseSlide.vue';
import BasePagination from '../../components/UI/BasePagination.vue';
import BaseService from '@/components/UI/BaseService.vue';

export default {
  components: {
    BaseSlider,
    BaseSlide,
    BasePagination,
    BaseService,
  },
  mixins: [converteSymbolsNewLineToBr],
  data() {
    return {
      serviceAnimationIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page && this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections && this.sections[1] ? this.sections[1] : null;
    },
    services() {
      return this.section && this.section.services ? this.section.services : [];
    },
  },
  mounted() {
    if (this.$refs.features && !this.serviceAnimationIsSet) {
      this.serviceAnimationIsSet = serviceAnimation.init(this.$refs.features);

      // console.log('Services Activated - mounted');
    }
  },
  updated() {
    if (this.$refs.features && !this.serviceAnimationIsSet) {
      this.serviceAnimationIsSet = serviceAnimation.init(this.$refs.features);

      // console.log('Services Activated - updated');
    }
  },
  unmounted() {
    serviceAnimation.reset();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/features';
</style>