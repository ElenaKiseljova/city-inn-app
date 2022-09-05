<template lang="pug">
section(
  v-if='pageName && page && sections && section',
  :class='`home home--${sectionName}`',
  :id='sectionName',
  ref='section'
)
  div(:class='`home__container container home__container--${sectionName}`')
    div(:class='`home__top home__top--${sectionName}`')
      h2(
        v-html='title',
        :class='`home__title home__title--mobile title home__title--${sectionName}`',
        ref='title2'
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
        :class='` home__title home__title--desktop title home__title--${sectionName}`',
        ref='title1'
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

import {
  sectionAnimation,
  sectionTitleAnimation,
} from '../../assets/js/gsap-animations';

import checkUrlType from '../../mixins/checkUrlType';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../UI/BaseImage.vue';
import BaseButton from '../UI/BaseButton.vue';
import BaseWorktime from '../UI/BaseWorktime.vue';

export default {
  components: {
    BaseImage,
    BaseButton,
    BaseWorktime,
  },
  mixins: [converteSymbolsNewLineToBr, checkUrlType],
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sectionTitleAnimationIsSet: false,
      sectionAnimationIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['pageName', 'page']),
    sections() {
      return this.page.content?.sections ? this.page.content.sections : [];
    },
    section() {
      if (this.pageName === 'home') {
        return this.sections?.length > 0
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
      return this.section?.more ? this.section.more : null;
    },
    book() {
      return this.section?.book ? this.section.book : null;
    },
  },
  mounted() {
    this.setAnimations();
  },
  updated() {
    this.setAnimations();
  },
  methods: {
    setAnimations() {
      if (this.$refs.title1 && this.$refs.title2 && this.$refs.section) {
        if (!this.sectionTitleAnimationIsSet && this.sectionName !== 'why') {
          let title = this.$refs.title1;

          if (
            this.sectionName === 'lobby' ||
            this.sectionName === 'restaurant'
          ) {
            title = this.$refs.title2;
          }

          this.sectionTitleAnimationIsSet = sectionTitleAnimation(
            title,
            this.$refs.section
          );
        }

        if (!this.sectionAnimationIsSet && this.sectionName === 'why') {
          this.sectionAnimationIsSet = sectionAnimation(
            this.$refs.section,
            this.$refs.section
          );
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/home';
</style>