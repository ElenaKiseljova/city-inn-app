<template lang="pug">
section#promo(
  v-if='lang && meta && pageName && header && page',
  :class='`promo promo--${sectionName}`'
) 
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
          :to='langToggle.path'
        )
          span {{ langToggle.text }}

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
import { mapGetters } from 'vuex';

import { promoSocialAnimation } from '../../assets/js/gsap-animations';
// import {
//   promoTitleAnimation,
//   animationPromoAndHeaderButtonsBookAndOffer,
//   promoSocialAnimation,
// } from '../../assets/js/gsap-animations';

import social from '../../mixins/social';
import checkUrlType from '../../mixins/checkUrlType';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../UI/BaseImage.vue';
import WorktimeInfo from '../blocks/WorktimeInfo.vue';
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
  data() {
    return {
      //     promoTitleAnimationInited: false,
      //     promoAndHeaderAnimationInited: false,
      promoSocialAnimationInited: false,

      //     promoTitleAnimationInterval: null,
      //     promoAndHeaderAnimationInterval: null,
      promoSocialAnimationInterval: null,

      i: 0,
      //     i1: 0,
      //     i2: 0,
    };
  },
  computed: {
    ...mapGetters(['lang', 'meta', 'pageName', 'header', 'page']),
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
    langToggle() {
      const path = this.$route.path;

      return {
        path: this.lang === 'uk' ? `/en${path}` : path.replace('/en', ''),
        text: this.lang === 'uk' ? 'en' : 'ua',
      };
    },
    sectionName() {
      return this.name || this.pageName;
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
      return this.content &&
        this.content.top &&
        this.content.top.description &&
        this.content.top.description.trim() !== ''
        ? this.converteSymbolsNewLineToBr(this.content.top.description)
        : null;
    },
    contentTopSubTitle() {
      return this.content &&
        this.content.top &&
        this.content.top.subTitle &&
        this.content.top.subTitle.trim() !== ''
        ? this.converteSymbolsNewLineToBr(this.content.top.subTitle)
        : null;
    },
    contentBottomWorktime() {
      return this.content &&
        this.content.bottom &&
        this.content.bottom.worktime &&
        this.content.bottom.worktime.trim() !== ''
        ? this.content.bottom.worktime
        : null;
    },
    contentBottomBook() {
      const bookButton =
        this.content && this.content.bottom ? this.content.bottom.book : {};

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
  mounted() {
    //   if (!this.promoTitleAnimationInited) {
    //     this.promoTitleAnimationInterval = setInterval(() => {
    //       const promo = document.querySelector('.promo');
    //       const promoTitle = document.querySelector(
    //         '.promo__container:not(.promo__container--home)'
    //       );

    //       if (promo && promoTitle) {
    //         clearInterval(this.promoTitleAnimationInterval);

    //         promoTitleAnimation.init(promoTitle, promo);

    //         this.promoTitleAnimationInited = true;
    //       }

    //       this.i1 += 1;

    //       if (this.i1 > 10) {
    //         clearInterval(this.promoTitleAnimationInterval);
    //       }
    //     }, 300);
    //   }

    //   if (
    //     !this.promoAndHeaderAnimationInited &&
    //     (this.pageName === 'home' || this.pageName === 'smart')
    //   ) {
    //     this.promoAndHeaderAnimationInterval = setInterval(() => {
    //       const promo = document.querySelector('.promo');
    //       const promoButtons = document.querySelector('.promo__buttons');
    //       const pageHeaderButtonsContainer = document.querySelector(
    //         '.page-header__social'
    //       );

    //       if (promo && promoButtons && pageHeaderButtonsContainer) {
    //         clearInterval(this.promoAndHeaderAnimationInterval);

    //         this.promoAndHeaderAnimationInited =
    //           animationPromoAndHeaderButtonsBookAndOffer(
    //             pageHeaderButtonsContainer,
    //             promoButtons,
    //             promo
    //           );
    //       }

    //       this.i2 += 1;

    //       if (this.i2 > 10) {
    //         clearInterval(this.promoAndHeaderAnimationInterval);
    //       }
    //     }, 300);
    //   }

    if (
      !this.promoSocialAnimationInited &&
      (this.pageName === 'home' || this.pageName === 'about')
    ) {
      this.promoSocialAnimationInterval = setInterval(() => {
        const promo = document.querySelector('.promo');

        if (promo) {
          clearInterval(this.promoSocialAnimationInterval);

          this.promoSocialAnimationInited = promoSocialAnimation.init(promo);
        }

        this.i += 1;

        if (this.i > 10) {
          clearInterval(this.promoSocialAnimationInterval);
        }
      }, 300);
    }
  },
  unmounted() {
    promoSocialAnimation.reset();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/promo';
</style>