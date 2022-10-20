<template lang="pug">
section(
  v-if='page && pageName && section && lang',
  :class='`info info--${pageName}`'
)
  div(:class='`info__container container info__container--${pageName}`')
    BaseServices(
      v-if='services && services.length > 0',
      sectionName='info',
      :modificator='sectionName',
      :items='services'
    )

    div(:class='`info__content info__content--${pageName}`')
      p(
        v-if='description',
        v-html='description',
        :class='`info__text info__text--${pageName}`'
      )

      button(
        v-if='pageName === "standart"',
        :class='`info__text info__more info__more--${pageName}`',
        ref='readMore'
      )
        span(v-if='lang === "en"') Read more
        span(v-else) Детальніше

    BasePrice(v-if='price', sectionName='info', :price='price')

    BaseButton(
      v-if='button',
      sectionName='info',
      :modificator='pageName',
      :button='button'
    )

    BaseImage(sectionName='info', :modificator='pageName', :image='image')
</template>

<script>
import { mapGetters } from 'vuex';

import readMore from '@/assets/js/read-more';

import checkUrlType from '@/mixins/checkUrlType';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';

export default {
  mixins: [checkUrlType, converteSymbolsNewLineToBr],
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      readMoreIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName', 'lang']),
    sections() {
      return this.page?.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections[0] ?? null;
    },
    description() {
      return this.section?.description && this.section.description !== ''
        ? this.converteSymbolsNewLineToBr(this.section.description)
        : null;
    },
    services() {
      return this.section?.services ? this.section.services : null;
    },
    image() {
      return this.section?.image ? this.section.image : {};
    },
    price() {
      return this.section?.priceText && this.section?.priceNumber
        ? {
            text: this.section.priceText,
            number: this.section.priceNumber,
          }
        : null;
    },
    button() {
      return this.section?.button ? this.section.button : null;
    },
  },
  mounted() {
    if (this.$refs.readMore && !this.readMoreIsSet) {
      readMore();

      this.readMoreIsSet = true;
    }
  },
  updated() {
    if (this.$refs.readMore && !this.readMoreIsSet) {
      readMore();

      this.readMoreIsSet = true;
    }
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/info';
</style>