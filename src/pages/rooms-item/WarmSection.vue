<template lang="pug">
section.warm(v-if='page && sections && section && infoSection', ref='section')
  .warm__container.container
    .warm__included
      h3.warm__subtitle(v-if='subTitle', v-html='subTitle')

      BaseServices(
        v-if='services && services.length > 0',
        sectionName='warm',
        modificator='warm',
        :items='services'
      )

    .warm__img-wrapper(v-if='image')
      BaseImage(sectionName='warm', :modificator='pageName', :image='image')

    .warm__content
      h2.title-inner.warm__title(v-if='title', v-html='title', ref='title')

      BasePrice(
        v-if='price',
        sectionName='warm',
        modificator='warm',
        :price='price'
      )

      BaseButton(
        v-if='button',
        sectionName='warm',
        :modificator='pageName',
        :button='button'
      )
</template>

<script>
import { mapGetters } from 'vuex';

import titleAnimation from '../../mixins/titleAnimation';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '@/components/UI/BaseImage.vue';
import BaseServices from '@/components/UI/BaseServices.vue';
import BasePrice from '@/components/UI/BasePrice.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

export default {
  mixins: [titleAnimation, converteSymbolsNewLineToBr],
  components: {
    BaseImage,
    BaseServices,
    BasePrice,
    BaseButton,
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page && this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      return this.sections && this.sections[3] ? this.sections[3] : null;
    },
    infoSection() {
      return this.sections && this.sections[0] ? this.sections[0] : null;
    },
    subTitle() {
      return this.section &&
        this.section.subTitle &&
        this.section.subTitle !== ''
        ? this.converteSymbolsNewLineToBr(this.section.subTitle)
        : null;
    },
    services() {
      return this.section && this.section.services ? this.section.services : [];
    },
    title() {
      return this.section && this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    image() {
      return this.section && this.section.image ? this.section.image : null;
    },
    price() {
      return this.infoSection &&
        this.infoSection.priceText &&
        this.infoSection.priceNumber
        ? {
            text: this.infoSection.priceText,
            number: this.infoSection.priceNumber,
          }
        : null;
    },
    button() {
      return this.infoSection && this.infoSection.button
        ? this.infoSection.button
        : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/warm';
</style>