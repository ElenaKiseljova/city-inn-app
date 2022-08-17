<template lang="pug">
section(:class='`promo promo--${sectionName}`') 
  h1.visually-hidden(v-if='title === ""')
    | {{ meta.title }}

  div(:class='`promo__img-wrapper promo__img-wrapper--${sectionName}`')
    .promo__container.promo__container--image.container 
      h1(
        v-if='title !== ""',
        v-html='title',
        :class='`promo__title promo__title--${sectionName}`'
      )

      div(
        v-if='social.length > 0',
        :class='`promo__social promo__social--${sectionName}`'
      ) 
        router-link.promo__lang.lang.button.button--circle(
          v-if='sectionName === "home"',
          :to='lang.path'
        )
          span {{ lang.text }}

        SocialList(:items='social')

      .promo__buttons(v-if='sectionName === "home" || sectionName === "smart"')
        router-link.promo__button.button(v-if='offer', :to='offer.link')
          span
            | {{ offer.title }}

        a.promo__button.button(v-if='book', target='_blank', :href='book.link')
          span 
            | {{ book.title }}

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
          v-if='contentBottomBook && !contentBottomBook.route',
          :class='`button promo__btn promo__btn--${sectionName}`',
          :href='contentBottomBook.link'
        )
          span
            | {{ contentBottomBook.text }}

        router-link(
          v-else-if='contentBottomBook && contentBottomBook.route',
          :class='`button promo__btn promo__btn--${sectionName}`',
          :to='contentBottomBook.link'
        )
          span
            | {{ contentBottomBook.text }}
</template>

<script>
import social from '../../mixins/social';

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
  mixins: [social],
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    header() {
      return this.$store.getters.header;
    },
    book() {
      return this.header.content.book;
    },
    offer() {
      return this.header.content.offer;
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
      return this.$store.getters.page;
    },
    title() {
      return this.page.content.title
        ? this.page.content.title.replace(/\r\n/g, '<br />')
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
        ? this.content.top.description.replace(/\r\n/g, '<br />')
        : null;
    },
    contentTopSubTitle() {
      return this.content.top &&
        this.content.top.subTitle &&
        this.content.top.subTitle.trim() !== ''
        ? this.content.top.subTitle.replace(/\r\n/g, '<br />')
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
      return this.content.bottom &&
        this.content.bottom.book &&
        this.content.bottom.book.text.trim() !== '' &&
        this.content.bottom.book.link.trim() !== ''
        ? this.content.bottom.book.link.includes('http') ||
          this.content.bottom.book.link.includes('tel:') ||
          this.content.bottom.book.link.includes('mailto:')
          ? this.content.bottom.book
          : { ...this.content.bottom.book, route: true }
        : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/promo';
</style>