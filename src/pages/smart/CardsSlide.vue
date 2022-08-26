<template lang="pug">
div(
  v-if='pageName',
  :class='`cards__img-wrapper cards__img-wrapper--${oddEvenLast}`'
)
  BaseImage(
    sectionName='cards',
    :modificator='pageName',
    alt='img',
    :image='image'
  )

.cards__content.cards__content--mobile
  h4(
    v-if='titleHtml',
    v-html='titleHtml',
    :class='`cards__subtitle cards__subtitle--${oddEvenLast}`'
  )

  div(
    v-if='descriptionHtml',
    v-html='descriptionHtml',
    :class='`cards__description cards__description--${oddEvenLast}`'
  )

  ServicesList(
    v-if='services && services.length > 0',
    sectionName='cards',
    modificator='cards',
    :items='services',
    :oddEvenLast='oddEvenLast'
  )

  BaseButton(
    v-if='slideBook',
    sectionName='cards',
    :modificator='`${oddEvenLast}`',
    :button='slideBook'
  )
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../../components/UI/BaseImage.vue';
import ServicesList from '../../components/blocks/ServicesList.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

export default {
  mixins: [converteSymbolsNewLineToBr],
  props: {
    oddEvenLast: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    services: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    book: {
      type: Object,
      required: false,
    },
  },
  components: {
    BaseImage,
    ServicesList,
    BaseButton,
  },
  computed: {
    ...mapGetters(['pageName']),
    titleHtml() {
      return this.title && this.title !== ''
        ? this.converteSymbolsNewLineToBr(this.title)
        : null;
    },
    descriptionHtml() {
      return this.description && this.description !== ''
        ? this.converteSymbolsNewLineToBr(this.description)
        : null;
    },
    slideBook() {
      return this.book ? this.book : null;
    },
  },
};
</script>