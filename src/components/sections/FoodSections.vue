<template lang="pug">
section(
  v-if='page && sectionName && section && images && tabs',
  :class='`food food--${sectionName}`'
)
  .food__container.container
    div(:class='`food__top food__top--${sectionName}`')
      h2(
        v-if='title',
        v-html='title',
        :class='`title-inner food__title food__title--mobile food__title--${sectionName}`'
      )

      div(
        v-if='images.length > 0',
        :class='`food__slider-container food__slider-container--${sectionName}`'
      )
        BaseSlider(sectionName='food', :modificator='sectionName')
          BaseSlide(
            v-for='image in images',
            sectionName='food',
            :modificator='sectionName'
          )
            BaseImage(
              sectionName='food',
              :modificator='sectionName',
              :image='image',
              alt='img'
            )

        BaseNavigation(sectionName='food', :modificator='sectionName')

        BasePagination(sectionName='food', :modificator='sectionName')

    div(:class='`food__bottom food__bottom--${sectionName}`')
      h2(
        v-if='title',
        v-html='title',
        :class='`title-inner food__title food__title--desktop food__title--${sectionName}`'
      )

      p.food__subtitle(v-if='subtitle', v-html='subtitle')

      div(:class='`food__content food__content--${sectionName}`')
        p.food__text.food__text--top(v-if='textTop', v-html='textTop')

        p.food__text.food__text--bottom(v-if='textBottom', v-html='textBottom')

        ul(
          v-if='tabs.length > 0',
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
          v-if='more',
          sectionName='food',
          :modificator='sectionName',
          :button='more'
        )

      div(
        v-if='worktime || menu',
        :class='`food__buttons food__buttons--${sectionName}`'
      )
        WorktimeInfo(
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

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseSlider from '../UI/BaseSlider.vue';
import BaseSlide from '../UI/BaseSlide.vue';
import BasePagination from '../UI/BasePagination.vue';
import BaseNavigation from '../UI/BaseNavigation.vue';
import BaseImage from '../UI/BaseImage.vue';
import WorktimeInfo from '../blocks/WorktimeInfo.vue';
import BaseButton from '../UI/BaseButton.vue';

export default {
  mixins: [converteSymbolsNewLineToBr],
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseSlider,
    BaseSlide,
    BasePagination,
    BaseNavigation,
    BaseImage,
    WorktimeInfo,
    BaseButton,
  },
  computed: {
    ...mapGetters(['page']),
    sections() {
      return this.page && this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      if (this.sectionName === 'advantages') {
        return this.sections[2] ?? {};
      }

      return null;
    },
    title() {
      return this.section && this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    subtitle() {
      return this.section &&
        this.section.subtitle &&
        this.section.subtitle !== ''
        ? this.converteSymbolsNewLineToBr(this.section.subtitle)
        : null;
    },
    textTop() {
      if (this.section) {
        if (this.section.textTop && this.section.textTop !== '') {
          return this.converteSymbolsNewLineToBr(this.section.textTop);
        } else if (this.section.text && this.section.text !== '') {
          return this.converteSymbolsNewLineToBr(this.section.text);
        }
      }

      return null;
    },
    textBottom() {
      return this.section &&
        this.section.textBottom &&
        this.section.textBottom !== ''
        ? this.converteSymbolsNewLineToBr(this.section.textBottom)
        : null;
    },
    more() {
      return this.section && this.section.more ? this.section.more : null;
    },
    worktime() {
      return this.section &&
        this.section.worktime &&
        this.section.worktime !== ''
        ? this.section.worktime
        : null;
    },
    menu() {
      return this.section && this.section.menu ? this.section.menu : null;
    },
    images() {
      return this.section && this.section.images ? this.section.images : null;
    },
    tabs() {
      return this.section && this.section.tabs ? this.section.tabs : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/food';
</style>