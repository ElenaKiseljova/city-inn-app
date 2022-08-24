<template lang="pug">
li(:class='`cards__item cards__item--${oddEvenLast}`')
  .cards__top
    h3(
      v-html='titleHtml',
      :class='`cards__title cards__title--${index + 1} cards__title--${oddEvenLast}`'
    )

    div(:class='`cards__img-wrapper cards__img-wrapper--${oddEvenLast}`')
      BaseImage(sectionName='cards', alt='img', :image='card.image')

  div(:class='`cards__bottom cards__bottom--${oddEvenLast}`')
    BaseSlider(v-if='slides.length > 0', sectionName='cards')
      BaseSlide(v-for='slide in slides', sectionName='cards')
        CardsSlide(
          :oddEvenLast='oddEvenLast',
          :image='slide.image',
          :title='slide.title',
          :description='slide.description',
          :services='slide.services',
          :book='slide.book'
        )

    BasePagination(sectionName='cards')

    div(
      :class='`cards__content cards__content--${oddEvenLast} ${cardsContentClass}`'
    )
      h4(
        v-html='titleHtml',
        :class='`cards__subtitle cards__subtitle--${oddEvenLast}`'
      )

      div(
        v-html='descriptionHtml',
        :class='`cards__description cards__description--${oddEvenLast}`'
      )

      ServicesList(
        v-if='card.services.length > 0',
        sectionName='cards',
        modificator='cards',
        :items='card.services',
        :oddEvenLast='oddEvenLast'
      )

      a(
        v-if='card.book && card.book.text && card.book.text !== "" && card.book.link && card.book.link !== ""',
        :class='`cards__button button cards__button--${oddEvenLast}`',
        :href='card.book.link'
      )
        span {{ card.book.text }}
</template>

<script>
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../../components/mixins/BaseImage.vue';
import BaseSlider from '../../components/mixins/BaseSlider.vue';
import BaseSlide from '../../components/mixins/BaseSlide.vue';
import BasePagination from '../../components/mixins/BasePagination.vue';
import ServicesList from '../../components/mixins/ServicesList.vue';

import CardsSlide from './CardsSlide.vue';

export default {
  mixins: [converteSymbolsNewLineToBr],
  props: {
    card: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  components: {
    BaseImage,
    BaseSlider,
    BaseSlide,
    BasePagination,
    CardsSlide,
    ServicesList,
  },
  computed: {
    page() {
      return this.$store.getters.page || {};
    },
    cards() {
      return this.page.content.sections || [];
    },
    slides() {
      return this.card.slides || [];
    },
    oddEvenLast() {
      return (this.index + 1) % 2 === 0
        ? 'even'
        : this.index + 1 === this.cards.length
        ? 'last'
        : 'odd';
    },
    cardsBottomClass() {
      return this.slides.length > 0 ? 'cards__bottom--slider' : '';
    },
    cardsContentClass() {
      return this.slides.length > 0 ? 'cards__content--desktop' : '';
    },
    titleHtml() {
      return this.card.title
        ? this.converteSymbolsNewLineToBr(this.card.title)
        : '';
    },
    descriptionHtml() {
      return this.card.description
        ? this.converteSymbolsNewLineToBr(this.card.description)
        : '';
    },
  },
};
</script>