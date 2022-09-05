<template lang="pug">
section.spa(v-if='page && sections && section', ref='section')
  .spa__left
    h2.title-inner.spa__title.spa__title--mobile(v-if='title', v-html='title')

    BaseSlider(
      v-if='slides && slides.length > 0',
      sectionName='spa',
      :modificator='pageName'
    )
      BaseSlide(
        v-for='slide in slides',
        sectionName='spa',
        :modificator='pageName'
      )
        .spa__top
          BaseImage(
            sectionName='spa',
            :modificator='pageName',
            :image='slide.image'
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
    BasePagination(sectionName='spa', :modificator='pageName')

  .spa__right
    h2.title-inner.spa__title.spa__title--desktop(v-if='title', v-html='title')

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

import sectionAnimation from '../../mixins/sectionAnimation';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BasePagination from '@/components/UI/BasePagination.vue';
import BaseSlider from '@/components/UI/BaseSlider.vue';
import BaseSlide from '@/components/UI/BaseSlide.vue';
import BaseImage from '@/components/UI/BaseImage.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseServices from '@/components/UI/BaseServices.vue';
import BaseWorktime from '../../components/UI/BaseWorktime.vue';

export default {
  components: {
    BasePagination,
    BaseSlider,
    BaseSlide,
    BaseImage,
    BaseButton,
    BaseServices,
    BaseWorktime,
  },
  mixins: [sectionAnimation, converteSymbolsNewLineToBr],
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