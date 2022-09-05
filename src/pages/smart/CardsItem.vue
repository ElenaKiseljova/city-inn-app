<template lang="pug">
li(v-if='page', :class='`cards__item cards__item--${oddEvenLast}`')
  .cards__top
    h3(
      v-html='titleHtml',
      :class='`cards__title cards__title--${index + 1} cards__title--${oddEvenLast}`'
    )

    div(:class='`cards__img-wrapper cards__img-wrapper--${oddEvenLast}`')
      BaseImage(sectionName='cards', alt='img', :image='card.image')

  div(:class='`cards__bottom cards__bottom--${oddEvenLast}`')
    BaseSlider(v-if='slides && slides.length > 0', sectionName='cards')
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

      BaseServices(
        v-if='card.services && card.services.length > 0',
        sectionName='cards',
        modificator='cards',
        :items='card.services',
        :oddEvenLast='oddEvenLast'
      )

      BaseButton(
        v-if='book',
        sectionName='cards',
        :modificator='`${oddEvenLast}`',
        :button='book'
      ) 
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseImage from '../../components/UI/BaseImage.vue';
import BaseSlider from '../../components/UI/BaseSlider.vue';
import BaseSlide from '../../components/UI/BaseSlide.vue';
import BasePagination from '../../components/UI/BasePagination.vue';

import CardsSlide from './CardsSlide.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseServices from '@/components/UI/BaseServices.vue';

export default {
  components: {
    BaseImage,
    BaseSlider,
    BaseSlide,
    BasePagination,
    CardsSlide,
    BaseButton,
    BaseServices,
  },
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
  computed: {
    ...mapGetters(['page']),
    cards() {
      return this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    slides() {
      return this.card.slides || [];
    },
    oddEvenLast() {
      return (this.index + 1) % 2 === 0
        ? 'even'
        : this.index + 1 === (this.cards ? this.cards.length : null)
        ? 'last'
        : 'odd';
    },
    cardsBottomClass() {
      return this.slides && this.slides.length > 0
        ? 'cards__bottom--slider'
        : '';
    },
    cardsContentClass() {
      return this.slides && this.slides.length > 0
        ? 'cards__content--desktop'
        : '';
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
    book() {
      return this.card && this.card.book ? this.card.book : null;
    },
  },
};
</script>