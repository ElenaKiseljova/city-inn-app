<template lang="pug"> 
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

  BaseServices(
    v-if='services?.length > 0',
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
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';

export default {
  mixins: [converteSymbolsNewLineToBr],
  props: {
    oddEvenLast: {
      type: String,
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
  computed: {
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
