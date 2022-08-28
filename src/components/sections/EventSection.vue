<template lang="pug">
section(
  v-if='page && sectionName && section && slides',
  :class='`event event--${sectionName}`'
)
  div(
    v-if='titleSmall || subTitle',
    :class='`event__container container event__container--${sectionName}`'
  )
    h2(
      v-if='titleSmall',
      v-html='titleSmall',
      :class='`event__title-small event__title-small--${sectionName}`'
    )

    h2(
      v-else-if='subTitle',
      v-html='subTitle',
      :class='`event__title-small event__title-small--${sectionName}`'
    )

  div(:class='`event__container container event__container--${sectionName}`')
    div(:class='`event__top event__top--${sectionName}`')
      h2(
        v-if='title',
        v-html='title',
        :class='`title-inner event__title event__title--mobile event__title--${sectionName}`'
      )

      div(
        v-if='slides && slides.length > 0',
        :class='`event__slider-container event__slider-container--${sectionName}`'
      )
        BaseSlider(
          sectionName='event',
          type='images',
          :modificator='sectionName'
        )
          BaseSlide(
            v-for='slide in slides',
            sectionName='event',
            type='images',
            :modificator='sectionName'
          )
            BaseImage(
              sectionName='event',
              :modificator='sectionName',
              :image='slide.image || slide.previewImage',
              alt='img'
            )

            h3(
              v-if='haveTitleImage && slide.title && slide.title !== ""',
              v-html='converteSymbolsNewLineToBr(slide.title)',
              :class='`title-inner event__title-image event__title-image--mobile event__title-image--${sectionName}`'
            )

        BasePagination(sectionName='event', :modificator='sectionName')

    div(:class='`event__bottom event__bottom--${sectionName}`')
      h2(
        v-if='title',
        v-html='title',
        :class='`title-inner event__title event__title--desktop event__title--${sectionName}`'
      )

      BaseNavigation(sectionName='event', :modificator='sectionName')

      BaseSlider(
        v-if='slides && slides.length > 0 && !content',
        sectionName='event',
        type='text',
        :modificator='sectionName'
      )
        BaseSlide(
          v-for='slide in slides',
          sectionName='event',
          :modificator='sectionName',
          type='text'
        )
          h3(
            v-if='sectionName !== "coffee" && slide.title && slide.title !== ""',
            v-html='converteSymbolsNewLineToBr(slide.title)',
            :class='`event__subtitle event__subtitle--${sectionName}`'
          )

          h3(
            v-else-if='subTitle',
            v-html='subTitle',
            :class='`event__subtitle event__subtitle--${sectionName}`'
          )

          h3(
            v-else-if='haveTitleImage && slide.title && slide.title !== ""',
            v-html='converteSymbolsNewLineToBr(slide.title)',
            :class='`title-inner event__title-image event__title-image--tablet event__title-image--${sectionName}`'
          )

          div(
            v-if='slide.topText || slide.bottomText || slide.text || slide.description',
            :class='`event__content event__content--${sectionName}`'
          )
            p.event__text.event__text--top(
              v-if='slide.topText && slide.topText !== ""',
              v-html='converteSymbolsNewLineToBr(slide.topText)'
            )

            p.event__text.event__text--top(
              v-else-if='slide.text && slide.text !== ""',
              v-html='converteSymbolsNewLineToBr(slide.text)'
            )

            p.event__text.event__text--bottom(
              v-if='slide.bottomText && slide.bottomText !== ""',
              v-html='converteSymbolsNewLineToBr(slide.bottomText)'
            )

            p(
              v-if='sectionName !== "coffee" && slide.description && slide.description !== ""',
              v-html='converteSymbolsNewLineToBr(slide.description)',
              :class='`event__text event__text--${sectionName}`'
            )

            ul.event__list(v-if='slideList(slide).length > 0')
              li.event__item(v-for='item in slideList(slide)', :key='item') {{ item }}

          BaseWorktime(
            v-if='slide.worktime && slide.worktime !== ""',
            sectionName='event',
            :modificator='sectionName',
            :text='slide.worktime'
          )

          BaseServices(
            v-if='slide.services && slide.services.length > 0',
            sectionName='event',
            :modificator='sectionName',
            :items='slide.services'
          )

          BasePrice(
            v-if='(slide.priceFor || slide.prePrice) && slide.price',
            sectionName='event',
            :modificator='sectionName',
            :price='{ text: slide.priceFor || slide.prePrice, number: slide.price }'
          )

          div(
            v-if='slide.button || slide.more',
            :class='`event__buttons event__buttons--${sectionName}`'
          )
            BaseButton(
              sectionName='event',
              :modificator='sectionName',
              :button='slide.button || slide.more'
            )

            div(
              :class='`event__arrow-top arrow-top event__arrow-top--${sectionName}`'
            )
              svg(width='48', height='48')
                use(
                  xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-arrow-top'
                )

      div(
        v-if='content',
        :class='`event__content event__content--${sectionName}`'
      )
        h3(
          v-if='contentTitle',
          v-html='contentTitle',
          :class='`event__subtitle event__subtitle--${sectionName}`'
        )

        p.event__text.event__text--top(
          v-if='contentTextTop',
          v-html='contentTextTop'
        )

        p.event__text.event__text--bottom(
          v-if='contentTextBottom',
          v-html='contentTextBottom'
        )

      BaseButton(
        v-if='contentButton',
        sectionName='event',
        :modificator='sectionName',
        :button='contentButton'
      )
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

import BaseSlider from '../UI/BaseSlider.vue';
import BaseSlide from '../UI/BaseSlide.vue';
import BasePagination from '../UI/BasePagination.vue';
import BaseNavigation from '../UI/BaseNavigation.vue';
import BaseImage from '../UI/BaseImage.vue';
import BaseServices from '../UI/BaseServices.vue';
import BaseButton from '../UI/BaseButton.vue';
import BasePrice from '../UI/BasePrice.vue';
import BaseWorktime from '../UI/BaseWorktime.vue';

export default {
  mixins: [converteSymbolsNewLineToBr],
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseSlider,
    BaseSlide,
    BasePagination,
    BaseNavigation,
    BaseImage,
    BaseWorktime,
    BaseServices,
    BaseButton,
    BasePrice,
  },
  methods: {
    slideList(slide) {
      if (this.haveDescriptionList) {
        return slide.description ? slide.description.split('\r\n') : [];
      }

      return [];
    },
  },
  computed: {
    ...mapGetters(['page']),
    sections() {
      return this.page && this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      if (
        this.sectionName === 'locations' ||
        this.sectionName === 'saunas' ||
        this.sectionName === 'smart-rooms'
      ) {
        return this.sections && this.sections[1] ? this.sections[1] : null;
      }

      if (this.sectionName === 'kitchen') {
        return this.sections && this.sections[2] ? this.sections[2] : null;
      }

      if (
        this.sectionName === 'around' ||
        this.sectionName === 'coffee' ||
        this.sectionName === 'event' ||
        this.sectionName === 'halls'
      ) {
        return this.sections && this.sections[3] ? this.sections[3] : null;
      }

      if (this.sectionName === 'attraction') {
        return this.sections && this.sections[4] ? this.sections[4] : null;
      }

      return null;
    },
    title() {
      return !this.haveTitleSmall &&
        this.section &&
        this.section.title &&
        this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    titleSmall() {
      if (this.section) {
        const titleSmall = this.section.titleSmall || this.section.title;

        return titleSmall !== '' && this.haveTitleSmall
          ? this.converteSymbolsNewLineToBr(titleSmall)
          : null;
      }

      return null;
    },
    subTitle() {
      return this.section &&
        this.section.subTitle &&
        this.section.subTitle !== ''
        ? this.converteSymbolsNewLineToBr(this.section.subTitle)
        : null;
    },
    slides() {
      return this.section && (this.section.slides || this.section.rooms)
        ? this.section.slides || this.section.rooms
        : [];
    },
    content() {
      return this.section &&
        (this.section.text ||
          this.section.more ||
          this.section.menu ||
          this.section.button)
        ? true
        : false;
    },
    contentTitle() {
      return this.content &&
        this.section.contentTitle &&
        this.section.contentTitle !== ''
        ? this.converteSymbolsNewLineToBr(this.section.contentTitle)
        : null;
    },
    contentTextTop() {
      return this.content &&
        (this.section.topText || this.section.text) &&
        (this.section.topText !== '' || this.section.text !== '')
        ? this.converteSymbolsNewLineToBr(
            this.section.topText || this.section.text
          )
        : null;
    },
    contentTextBottom() {
      return this.content &&
        this.section.bottomText &&
        this.section.bottomText !== ''
        ? this.converteSymbolsNewLineToBr(this.section.bottomText)
        : null;
    },
    contentButton() {
      return this.content &&
        (this.section.more || this.section.menu || this.section.button)
        ? this.section.more || this.section.menu || this.section.button
        : null;
    },
    haveTitleImage() {
      if (this.sectionName === 'coffee' || this.sectionName === 'halls') {
        return true;
      }

      return false;
    },
    haveDescriptionList() {
      if (this.sectionName === 'coffee') {
        return true;
      }

      return false;
    },
    haveTitleSmall() {
      if (this.sectionName === 'coffee') {
        return true;
      }

      return false;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/event';
</style>