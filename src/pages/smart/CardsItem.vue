<template lang="pug">
li(v-if='page', :class='`cards__item cards__item--${oddEvenLast}`')
  .cards__top
    h3(
      v-html='titleHtml',
      :class='`cards__title cards__title--${index + 1} cards__title--${oddEvenLast}`'
    )

    div(:class='`cards__img-wrapper cards__img-wrapper--${oddEvenLast}`')
      BaseImage(sectionName='cards', alt='img', :image='card.image')

  div(:class='`cards__bottom cards__bottom--${oddEvenLast} dooble`')
    SwiperSlider(
      v-if='slides?.length > 0',
      :class="`cards__slider cards__slider--images dooble__slider dooble__slider--images`"
      :modules="modules"
      :slides-per-view="swiperOptions.slidesPerView",
      :space-between="swiperOptions.spaceBetween",
      :resize-observer="swiperOptions.resizeObserver",
      :speed="swiperOptions.speed",
      :navigation="swiperNavigation",
      :pagination="swiperPagination",
      :controller="{ control: textSwiper }",
      @swiper="setSwiper"
      @beforeTransitionStart="onBeforeTransitionStart"
    )
      SwiperSlide(
        v-for='slide in slides',
        :key='slide.title',
        :class="`cards__slide cards__slide--images ${slideClass}`",
        @click="slideChange"
      )
        CardsImage(
          :oddEvenLast='oddEvenLast',
          :image='slide.image',
          :title='slide.title',
          :description='slide.description',
          :services='slide.services',
          :book='slide.book'
        )

    SwiperSlider(
      v-if='slides?.length > 0', 
      :class="`cards__slider cards__slider--text dooble__slider dooble__slider--text`"
      :modules="modules"
      :slides-per-view="swiperTextOptions.slidesPerView",
      :space-between="swiperTextOptions.spaceBetween",
      :resize-observer="swiperTextOptions.resizeObserver",
      :speed="swiperTextOptions.speed",
      :controller="{ control: swiper }",
      :effect="swiperTextOptions.effect",
      :fadeEffect="{crossFade: true}",
      @swiper="setTextSwiper"
    )
      SwiperSlide(
        v-for='slide in slides',
        :key='slide.title',
        :class="`cards__slide cards__slide--text`"
      )
        CardsDesc(
          :oddEvenLast='oddEvenLast',
          :image='slide.image',
          :title='slide.title',
          :description='slide.description',
          :services='slide.services',
          :book='slide.book'
        )

    BasePagination(:swiperIndex="swiperIndex", sectionName='cards')

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

import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import swiperSliderInit from '@/mixins/swiperSliderInit';

import CardsImage from './CardsImage.vue';
import CardsDesc from './CardsDesc.vue';

export default {
  components: {
    CardsImage,
    CardsDesc,
  },
  mixins: [converteSymbolsNewLineToBr, swiperSliderInit],
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
      return this.page?.content && this.page.content.sections
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
      return this.slides?.length > 0 ? 'cards__bottom--slider' : '';
    },
    cardsContentClass() {
      return this.slides?.length > 0 ? 'cards__content--desktop' : '';
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
      return this.card?.book ? this.card.book : null;
    },
  },
};
</script>
