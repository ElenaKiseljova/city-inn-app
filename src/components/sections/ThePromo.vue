<template lang="pug">
section#promo(
  v-if='meta && pageName && header && page',
  :class='`promo promo--${sectionName}`',
  ref='section'
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
        BaseLang(sectionName='promo')

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
  animationHeaderSocialAndPromoButtons,
} from '@/assets/js/modules/gsap-animations';

import social from '@/mixins/social';
import imageBgAnimation from '@/mixins/imageBgAnimation';
import checkUrlType from '@/mixins/checkUrlType';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';

export default {
  components: {},
  mixins: [imageBgAnimation, social, checkUrlType, converteSymbolsNewLineToBr],
  props: {
    name: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      promoTitleAndTextAnimationIsSet: false,
      promoSocialAnimationIsSet: false,
      animationHeaderSocialAndPromoButtonsIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['meta', 'pageName', 'header', 'page', 'images']),
    book() {
      return this.header.content?.book ? this.header.content.book : null;
    },
    offer() {
      return this.header?.content.offer ? this.header.content.offer : null;
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
      return this.content?.top &&
        this.content.top.description &&
        this.content.top.description.trim() !== ''
        ? this.converteSymbolsNewLineToBr(this.content.top.description)
        : null;
    },
    contentTopSubTitle() {
      return this.content?.top &&
        this.content.top.subTitle &&
        this.content.top.subTitle.trim() !== ''
        ? this.converteSymbolsNewLineToBr(this.content.top.subTitle)
        : null;
    },
    contentBottomWorktime() {
      return this.content?.bottom &&
        this.content.bottom.worktime &&
        this.content.bottom.worktime.trim() !== ''
        ? this.content.bottom.worktime
        : null;
    },
    contentBottomBook() {
      return this.content?.bottom && this.content.bottom.book
        ? this.content.bottom.book
        : null;
    },
    pageIsReady() {
      return this.meta && this.pageName && this.header && this.page
        ? true
        : false;
    },
  },
  watch: {
    images(cur, prev) {
      if (cur === 0 && prev > 0) {
        this.setPromoAnimation();
      }
    },
  },
  mounted() {
    this.setPromoAnimation();
  },
  updated() {
    this.setPromoAnimation();
  },
  beforeUnmount() {
    promoSocialAnimation.reset();

    animationHeaderSocialAndPromoButtons.reset();
  },
  methods: {
    setPromoAnimation() {
      if (this.$refs.section) {
        if (!this.promoSocialAnimationIsSet && this.images === 0) {
          this.promoSocialAnimationIsSet = promoSocialAnimation.init(
            this.$refs.section
          );
        }

        if (!this.animationHeaderSocialAndPromoButtonsIsSet) {
          this.animationHeaderSocialAndPromoButtonsIsSet =
            animationHeaderSocialAndPromoButtons.init(this.$refs.section);
        }

        if (!this.promoTitleAndTextAnimationIsSet && this.images === 0) {
          this.promoTitleAndTextAnimationIsSet = promoTitleAndTextAnimation(
            this.$refs.section
          );
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/promo';
</style>
