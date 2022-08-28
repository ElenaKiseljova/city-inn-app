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
        :class='`info__text info__more info__more--${pageName}`'
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

import readMore from '../../assets/js/read-more';

import checkUrlType from '../../mixins/checkUrlType';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseServices from '../UI/BaseServices.vue';
import BaseImage from '../UI/BaseImage.vue';
import BasePrice from '../UI/BasePrice.vue';
import BaseButton from '../UI/BaseButton.vue';

export default {
  components: {
    BaseServices,
    BaseImage,
    BasePrice,
    BaseButton,
  },
  mixins: [checkUrlType, converteSymbolsNewLineToBr],
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['page', 'pageName', 'lang']),
    sections() {
      return this.page && this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections[0] ?? null;
    },
    description() {
      return this.section &&
        this.section.description &&
        this.section.description !== ''
        ? this.converteSymbolsNewLineToBr(this.section.description)
        : null;
    },
    services() {
      return this.section && this.section.services
        ? this.section.services
        : null;
    },
    image() {
      return this.section && this.section.image ? this.section.image : {};
    },
    price() {
      return this.section && this.section.priceText && this.section.priceNumber
        ? {
            text: this.section.priceText,
            number: this.section.priceNumber,
          }
        : null;
    },
    button() {
      return this.section && this.section.button ? this.section.button : null;
    },
  },
  mounted() {
    readMore();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/info';
</style>