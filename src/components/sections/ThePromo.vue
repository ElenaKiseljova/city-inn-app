<template lang="pug">
section#promo(
  v-if='lang && meta && pageName && header && page',
  :class='`promo promo--${sectionName}`',
  ref='promo'
) 
  h1.visually-hidden(v-if='title === ""')
    | {{ meta.title }}

  div(:class='`promo__img-wrapper promo__img-wrapper--${sectionName}`')
    div(
      :class='`promo__container promo__container--image container promo__container--${sectionName}`'
    ) 
      .promo__title-wrapper(:class='`promo__title-wrapper--${sectionName}`')
        h1.promo__title(
          v-if='title !== ""',
          v-html='title',
          :class='`promo__title--${sectionName}`'
        )

      div(:class='`promo__social promo__social--${sectionName}`') 
        router-link.promo__lang.lang.button.button--circle(
          v-if='sectionName === "home"',
          :to='langToggle.path'
        )
          span {{ langToggle.text }}

        BaseSocial(v-if='social.length > 0', :items='social')

      .promo__buttons(v-if='sectionName === "home" || sectionName === "smart"')
        BaseButton(
          v-if='book',
          sectionName='promo',
          :modificator='`${pageName}`',
          :button='book'
        )

        BaseButton(
          v-if='offer',
          sectionName='promo',
          :modificator='`${sectionName}`',
          :button='offer'
        )

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
        BaseWorktime(
          v-if='contentBottomWorktime',
          sectionName='promo',
          :modificator='sectionName',
          :text='contentBottomWorktime'
        )

        BaseButton(
          v-if='contentBottomBook',
          sectionName='promo',
          :modificator='`${sectionName}`',
          :button='contentBottomBook',
          sectionElementName='btn'
        )
</template>

<script>
import { mapGetters } from 'vuex';

import {
  promoTitleAndTextAnimation,
  promoSocialAnimation,
  animationTwoElements,
} from '../../assets/js/gsap-animations';

import social from '../../mixins/social';
import checkUrlType from '../../mixins/checkUrlType';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../UI/BaseImage.vue';
import BaseButton from '../UI/BaseButton.vue';
import BaseWorktime from '../UI/BaseWorktime.vue';
import BaseSocial from '../UI/BaseSocial.vue';

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
    BaseButton,
    BaseWorktime,
    BaseSocial,
  },
  mixins: [social, checkUrlType, converteSymbolsNewLineToBr],
  data() {
    return {
      promoTitleAnimationIsSet: false,
      promoSocialAnimationIsSet: false,
      twoElementsAnimationIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['lang', 'meta', 'pageName', 'header', 'page']),
    book() {
      return this.header.content && this.header.content.book
        ? this.header.content.book
        : null;
    },
    offer() {
      return this.header.content && this.header.content.offer
        ? this.header.content.offer
        : null;
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
      return this.content && this.content.bottom && this.content.bottom.book
        ? this.content.bottom.book
        : null;
    },
    pageIsReady() {
      return this.lang && this.meta && this.pageName && this.header && this.page
        ? true
        : false;
    },
  },
  methods: {
    setPromoAnimation() {
      if (this.$refs.promo) {
        if (!this.promoSocialAnimationIsSet) {
          this.promoSocialAnimationIsSet = promoSocialAnimation.init(
            this.$refs.promo
          );
        }

        if (
          !this.twoElementsAnimationIsSet &&
          (this.pageName === 'home' || this.pageName === 'smart')
        ) {
          this.twoElementsAnimationIsSet = animationTwoElements(
            this.$refs.promo
          );
        }

        if (!this.promoTitleAnimationIsSet) {
          this.promoTitleAnimationIsSet = promoTitleAndTextAnimation(
            this.$refs.promo
          );
        }
      }
    },
  },
  mounted() {
    this.setPromoAnimation();
  },
  updated() {
    this.setPromoAnimation();
  },
  unmounted() {
    promoSocialAnimation.reset();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/promo';
</style>