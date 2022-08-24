<template lang="pug">
section#promo(:class='`promo promo--${sectionName}`') 
  h1.visually-hidden(v-if='title === ""')
    | {{ meta.title }}

  div(:class='`promo__img-wrapper promo__img-wrapper--${sectionName}`')
    div(
      :class='`promo__container promo__container--image container promo__container--${sectionName}`'
    )
      h1(
        v-if='title !== ""',
        v-html='title',
        :class='`promo__title promo__title--${sectionName}`'
      )

      div(:class='`promo__social promo__social--${sectionName}`') 
        router-link.promo__lang.lang.button.button--circle(
          v-if='sectionName === "home"',
          :to='lang.path'
        )
          span {{ lang.text }}

        SocialList(v-if='social.length > 0', :items='social')

      .promo__buttons(v-if='sectionName === "home" || sectionName === "smart"')
        template(v-for='button in buttons')
          a.promo__button.button(
            v-if='button && button.type === "link"',
            :href='button.link'
          )
            span
              | {{ button.title }}

          router-link.promo__button.button(
            v-if='button && button.type === "route"',
            :to='button.link'
          )
            span
              | {{ button.title }}

    BaseImage(sectionName='promo', :image='image')

  .promo__container.promo__container--content.container(
    v-if='content',
    :class='`promo__container--${sectionName}`'
  )
    div(:class='`promo__content promo__content--${sectionName}`')
      div(:class='`promo__top promo__top--${sectionName}`')
        h3(
          v-if='contentTopSubTitle',
          v-html='contentTopSubTitle',
          :class='`promo__subtitle promo__subtitle--${sectionName}`'
        )

        p(
          v-if='contentTopDescription',
          v-html='contentTopDescription',
          :class='`promo__text promo__text--${sectionName}`'
        )

      div(:class='`promo__bottom promo__bottom--${sectionName}`')
        WorktimeInfo(
          v-if='contentBottomWorktime',
          sectionName='promo',
          :modificator='sectionName',
          :text='contentBottomWorktime'
        )

        a(
          v-if='contentBottomBook && contentBottomBook.type === "link"',
          :class='`button promo__btn promo__btn--${sectionName}`',
          :href='contentBottomBook.link'
        )
          span
            | {{ contentBottomBook.text }}

        router-link(
          v-else-if='contentBottomBook && contentBottomBook.type === "route"',
          :class='`button promo__btn promo__btn--${sectionName}`',
          :to='contentBottomBook.link'
        )
          span
            | {{ contentBottomBook.text }}
</template>

<script>
import social from '../../mixins/social';
import checkUrlType from '../../mixins/checkUrlType';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../mixins/BaseImage.vue';
import WorktimeInfo from '../mixins/WorktimeInfo.vue';
import SocialList from '../blocks/SocialList.vue';

export default {
  props: {
    name: {
      type: String,
      required: false,
      default: null,
    },
  },
  components: {
    BaseImage,
    WorktimeInfo,
    SocialList,
  },
  mixins: [social, checkUrlType, converteSymbolsNewLineToBr],
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    header() {
      return this.$store.getters.header || {};
    },
    book() {
      const bookButton =
        this.header.content && this.header.content.book
          ? this.header.content.book
          : null;

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
    offer() {
      const offerButton =
        this.header.content && this.header.content.offer
          ? this.header.content.offer
          : null;

      if (
        offerButton &&
        offerButton.link &&
        offerButton.link !== '' &&
        offerButton.title &&
        offerButton.title !== ''
      ) {
        return { ...offerButton, type: this.checkUrlType(offerButton.link) };
      }

      return null;
    },
    buttons() {
      const buttons = [];

      if (this.book) {
        buttons.push({
          ...this.book,
          icon: 'icon-phone',
        });
      }

      if (this.offer) {
        buttons.push({
          ...this.offer,
          icon: 'icon-offer',
        });
      }

      return buttons;
    },
    meta() {
      return this.$store.getters.meta;
    },
    lang() {
      const curLang = this.$store.getters.lang;
      const path = this.$route.path;

      return {
        path: curLang === 'uk' ? `/en${path}` : path.replace('/en', ''),
        text: curLang === 'uk' ? 'en' : 'ua',
      };
    },
    sectionName() {
      return this.name || this.pageName;
    },
    page() {
      return this.$store.getters.page || {};
    },
    title() {
      return this.page.content.title
        ? this.converteSymbolsNewLineToBr(this.page.content.title)
        : '';
    },
    image() {
      return this.page.content.image || { webp: {}, jpg: {} };
    },
    content() {
      return this.page.content.content || null;
    },
    contentTopDescription() {
      return this.content.top &&
        this.content.top.description &&
        this.content.top.description.trim() !== ''
        ? this.converteSymbolsNewLineToBr(this.content.top.description)
        : null;
    },
    contentTopSubTitle() {
      return this.content.top &&
        this.content.top.subTitle &&
        this.content.top.subTitle.trim() !== ''
        ? this.converteSymbolsNewLineToBr(this.content.top.subTitle)
        : null;
    },
    contentBottomWorktime() {
      return this.content.bottom &&
        this.content.bottom.worktime &&
        this.content.bottom.worktime.trim() !== ''
        ? this.content.bottom.worktime
        : null;
    },
    contentBottomBook() {
      const bookButton = this.content.bottom.book;

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
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/promo';
</style>