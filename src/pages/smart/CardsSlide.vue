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
    v-if='title',
    v-html='titleHtml',
    :class='`cards__subtitle cards__subtitle--${oddEvenLast}`'
  )

  div(
    v-if='description !== ""',
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

  a(
    v-if='book.title && book.title !== "" && book.link && book.link !== ""',
    :class='`cards__button button cards__button--${oddEvenLast}`',
    :href='book.link',
    target='_blank'
  )
    span {{ book.title }}
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../../components/UI/BaseImage.vue';
import ServicesList from '../../components/blocks/ServicesList.vue';

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
      default() {
        return {};
      },
    },
  },
  components: {
    BaseImage,
    ServicesList,
  },
  computed: {
    ...mapGetters(['pageName']),
    titleHtml() {
      return this.title ? this.converteSymbolsNewLineToBr(this.title) : '';
    },
    descriptionHtml() {
      return this.description
        ? this.converteSymbolsNewLineToBr(this.description)
        : '';
    },
  },
};
</script>