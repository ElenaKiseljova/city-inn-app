<template lang="pug">
section(v-if='section', :class='`home home--${sectionName}`', :id='sectionName')
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
        WorktimeInfo(
          v-if='section.worktime && section.worktime !== ""',
          sectionName='home',
          :modificator='sectionName',
          :text='section.worktime'
        )

        template(v-for='button in buttons')
          a(
            v-if='button && button.type === "link"',
            :class='`button home__button home__button--${button.name} home__button--${sectionName}`',
            :href='button.link'
          )
            span {{ button.title }}

          router-link(
            v-else-if='button && button.type === "route"',
            :class='`button home__button home__button--${button.name} home__button--${sectionName}`',
            :to='button.link'
          )
            span {{ button.title }}
</template>

<script>
import checkUrlType from '../../mixins/checkUrlType';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from './BaseImage.vue';
import WorktimeInfo from './WorktimeInfo.vue';

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
    WorktimeInfo,
  },
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    page() {
      return this.$store.getters.page || {};
    },
    sections() {
      return this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      if (this.pageName === 'home') {
        return this.sections.length > 0
          ? this.sections.find(
              (section) => section.sectionName === this.sectionName
            )
          : {};
      }

      if (this.pageName === 'about') {
        return this.sections ? this.sections[1] : {};
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
      const moreButton = this.section.more ? this.section.more : {};

      if (
        moreButton &&
        moreButton.link &&
        moreButton.link !== '' &&
        moreButton.title &&
        moreButton.title !== ''
      ) {
        return { ...moreButton, type: this.checkUrlType(moreButton.link) };
      }

      return null;
    },
    book() {
      const bookButton = this.section.book ? this.section.book : {};

      if (
        bookButton &&
        bookButton.link &&
        bookButton.link !== '' &&
        bookButton.title &&
        bookButton.title !== ''
      ) {
        return { ...bookButton, type: this.checkUrlType(bookButton.link) };
      }

      return null;
    },
    buttons() {
      const buttons = [];

      if (this.more) {
        buttons.push({
          ...this.more,
          name: 'more',
        });
      }

      if (this.book) {
        buttons.push({
          ...this.book,
          name: 'book',
        });
      }
      return buttons;
    },
  },
  // beforeMount() {
  //   console.log(this.page);
  // },
  // mounted() {
  //   // console.log(this.page);
  // },
  // updated() {
  //   // console.log(this.page);
  // },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/home';
</style>