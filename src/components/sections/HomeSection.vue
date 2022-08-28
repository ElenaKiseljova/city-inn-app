<template lang="pug">
section(
  v-if='pageName && page && sections && section',
  :class='`home home--${sectionName}`',
  :id='sectionName'
)
  div(:class='`home__container container home__container--${sectionName}`')
    div(:class='`home__top home__top--${sectionName}`')
      h2(
        v-html='title',
        :class='`home__title home__title--mobile title home__title--${sectionName}`'
      )

      div(:class='`home__img-wrapper home__img-wrapper--${sectionName}`')
        BaseImage(
          sectionName='home',
          :modificator='sectionName',
          :image='image'
        )

    div(:class='`home__bottom home__bottom--${sectionName}`')
      h2(
        v-html='title',
        :class='` home__title home__title--desktop title home__title--${sectionName}`'
      )

      div(:class='`home__content home__content--${sectionName}`')
        p(:class='`home__text home__text--top home__text--${sectionName}`')
          | {{ contentTop }}

        p(:class='`home__text home__text--bottom home__text--${sectionName}`')
          | {{ contentBottom }}

      div(:class='`home__buttons home__buttons--${sectionName}`')
        BaseWorktime(
          v-if='section.worktime && section.worktime !== ""',
          sectionName='home',
          :modificator='sectionName',
          :text='section.worktime'
        )

        BaseButton(
          v-if='book',
          sectionName='home',
          :modificator='`${sectionName},book-now`',
          :button='book'
        )

        BaseButton(
          v-if='more',
          sectionName='home',
          :modificator='`${sectionName},more`',
          :button='more'
        )
</template>

<script>
import { mapGetters } from 'vuex';

import checkUrlType from '../../mixins/checkUrlType';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../UI/BaseImage.vue';
import BaseButton from '../UI/BaseButton.vue';
import BaseWorktime from '../UI/BaseWorktime.vue';

export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  mixins: [converteSymbolsNewLineToBr, checkUrlType],
  components: {
    BaseImage,
    BaseButton,
    BaseWorktime,
  },
  computed: {
    ...mapGetters(['pageName', 'page']),
    sections() {
      return this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      if (this.pageName === 'home') {
        return this.sections && this.sections.length > 0
          ? this.sections.find(
              (section) => section.sectionName === this.sectionName
            )
          : {};
      }

      if (this.pageName === 'about') {
        return this.sections && this.sections[1] ? this.sections[1] : null;
      }

      return {};
    },
    title() {
      return this.section.title
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : '';
    },
    contentTop() {
      return this.section.contentTop
        ? this.converteSymbolsNewLineToBr(this.section.contentTop)
        : this.section.text
        ? this.converteSymbolsNewLineToBr(this.section.text)
        : '';
    },
    contentBottom() {
      return this.section.contentBottom
        ? this.converteSymbolsNewLineToBr(this.section.contentBottom)
        : '';
    },
    image() {
      return this.section.image
        ? this.section.image
        : this.section.images
        ? this.section.images[0]
        : {};
    },
    more() {
      return this.section && this.section.more ? this.section.more : null;
    },
    book() {
      return this.section && this.section.book ? this.section.book : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/home';
</style>