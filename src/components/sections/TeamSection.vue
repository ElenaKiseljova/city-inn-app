<template lang="pug">
section.team(v-if='page && pageName && sections && section && slides')
  .team__container.container
    header.team__header
      p(
        :class='`team__subtitle team__subtitle--${pageName}`',
        v-if='subTitle',
        v-html='subTitle'
      )

      h2.title-inner.team__title(v-if='title', v-html='title')

      BaseNavigation(sectionName='team', :modificator='pageName')
      BasePagination(sectionName='team', :modificator='pageName')

    .team__slider-container(v-if='slides.length > 0')
      BaseSlider(sectionName='team', :modificator='pageName')
        BaseSlide(
          v-for='slide in slides',
          sectionName='team',
          :modificator='pageName'
        )
          .team__top
            BaseImage(
              sectionName='team',
              :modificator='pageName',
              :image='slide.image',
              alt='img'
            ) 

          .team__bottom
            h3.team__name(v-if='slide.title && slide.title !== ""')
              | {{ slide.title }}

            p.team__position(
              v-if='slide.description && slide.description !== ""'
            )
              | {{ slide.description }}

            template(v-if='slide.contacts && slide.contacts.length > 0')
              a.team__mail(
                v-for='contact in slide.contacts',
                :key='contact.link',
                :href='contact.link'
              )
                | {{ contact.text }}
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseSlider from '../UI/BaseSlider.vue';
import BaseSlide from '../UI/BaseSlide.vue';
import BasePagination from '../UI/BasePagination.vue';
import BaseNavigation from '../UI/BaseNavigation.vue';
import BaseImage from '../UI/BaseImage.vue';

export default {
  components: {
    BaseSlider,
    BaseSlide,
    BasePagination,
    BaseNavigation,
    BaseImage,
  },
  mixins: [converteSymbolsNewLineToBr],
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page && this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      if (this.pageName === 'conference') {
        return this.sections && this.sections[7] ? this.sections[7] : null;
      }

      if (this.pageName === 'group') {
        return this.sections && this.sections[5] ? this.sections[5] : null;
      }

      return null;
    },
    title() {
      return this.section && this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    subTitle() {
      return this.section &&
        this.section.subTitle &&
        this.section.subTitle !== ''
        ? this.converteSymbolsNewLineToBr(this.section.subTitle)
        : null;
    },
    slides() {
      return this.section && this.section.slides ? this.section.slides : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/team';
</style>