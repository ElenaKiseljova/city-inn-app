<template lang="pug">
section(:class='`event event--${sectionName}`')
  div(:class='`event__container container event__container--${sectionName}`')
    h2(
      v-if='isSmallTitle',
      :class='`event__title-small event__title-small--${sectionName}`'
    )
      template(v-if='titleSmall', v-html='titleSmall')
      template(v-if='subTitle', v-html='subTitle')

  div(:class='`event__container container event__container--${sectionName}`')
    div(:class='`event__top event__top--${sectionName}`')
      h2(
        v-if='title && title !== ""',
        v-html='title',
        :class='`title-inner event__title event__title--mobile event__title--${sectionName}`'
      )

      div(
        v-if='slides.length > 0',
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
              :image='slide.image',
              alt='img'
            )

            h3(
              v-if='slide.titleImage && slide.titleImage !== ""',
              v-html='slide.titleImage',
              :class='`title-inner event__title-image event__title-image--mobile event__title-image--${sectionName}`'
            )

        BasePagination(sectionName='event', :modificator='sectionName')

    div(:class='`event__bottom event__bottom--${sectionName}`')
      h2(
        v-if='title && title !== ""',
        v-html='title',
        :class='`title-inner event__title event__title--desktop event__title--${sectionName}`'
      )

      BaseNavigation(sectionName='event', :modificator='sectionName')

      BaseSlider(
        v-if='slides.length > 0 && !content',
        sectionName='event',
        type='text'
      )
      if slides.length > 0 && !content
        +slider('event', 'text')
          each slide in slides
            +slide('event', sectionName, 'text')
              if (slide.title && slide.title !== '') || subTitle
                h3(:class='`event__subtitle event__subtitle--${sectionName}`')
                  | !{ slide.title || subTitle }

              if slide.titleImage && slide.titleImage !== ''
                h3(
                  :class='`title-inner event__title-image event__title-image--tablet event__title-image--${sectionName}`'
                )
                  | !{ slide.titleImage }

              if slide.topText || slide.bottomText || slide.text || slide.list
                div(:class='`event__content event__content--${sectionName}`')
                  if slide.topText && slide.topText !== ''
                    p.event__text.event__text--top
                      | !{ slide.topText }

                  if slide.bottomText && slide.bottomText !== ''
                    p.event__text.event__text--bottom
                      | !{ slide.bottomText }

                  if slide.text && slide.text !== ''
                    p(:class='`event__text event__text--${sectionName}`')
                      | !{ slide.text }

                  if slide.list
                    - const list = slide.list.split("\r\n");
                    if list.length > 0
                      ul.event__list
                        each item in list
                          li.event__item
                            | !{ item }

              if slide.worktime && slide.worktime !== ''
                +worktime('event', sectionName, worktime)

              if slide.services && slide.services.length > 0
                +services('event', sectionName, slide.services)

              if slide.priceTitle && slide.priceNumber
                .event__price.price
                  h4(:class='`price__title price__title--${sectionName}`')
                    | #{ slide.priceTitle }
                  p.price__number
                    | #{ slide.priceNumber } ₴

              if slide.button && slide.button.text && slide.button.text !== '' && slide.button.link && slide.button.link !== ''
                div(:class='`event__buttons event__buttons--${sectionName}`')
                  a(
                    :class='`button event__button event__button--${sectionName}`',
                    href="" + slide.button.link
                  )
                    span
                      | !{ slide.button.text }

                  div(
                    :class='`event__arrow-top arrow-top event__arrow-top--${sectionName}`'
                  )
                    svg(width='48', height='48')
                      use(
                        xlink:href='img/sprites/sprite-mono.svg#icon-arrow-top'
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

        a(
          v-if='contentButton && contentButton.type === "link"',
          :class='`button event__button event__button--${sectionName}`',
          :href='contentButton.link'
        )
          span
            | {{ contentButton.text }}

        router-link(
          v-if='contentButton && contentButton.type === "route"',
          :class='`button event__button event__button--${sectionName}`',
          :href='contentButton.link'
        )
          span
            | {{ contentButton.text }}
</template>

<script>
import checkUrlType from '../../mixins/checkUrlType';
import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';
import BaseNavigation from './BaseNavigation.vue';

export default {
  mixins: [checkUrlType, converteSymbolsNewLineToBr],
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    titleSmall: {
      type: String,
      required: false,
      default: null,
    },
    subTitle: {
      type: String,
      required: false,
      default: null,
    },
    slides: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    content: {
      type: Object,
      required: false,
      default: null,
    },
  },
  computed: {
    contentTitle() {
      const title =
        this.content && this.content.title ? this.content.title : null;
      return title ? this.converteSymbolsNewLineToBr(title) : title;
    },
    contentTopText() {
      const topText =
        this.content && this.content.topText ? this.content.topText : null;
      return topText ? this.converteSymbolsNewLineToBr(topText) : topText;
    },
    contentBottomText() {
      const bottomText =
        this.content && this.content.bottomText
          ? this.content.bottomText
          : null;
      return bottomText
        ? this.converteSymbolsNewLineToBr(bottomText)
        : bottomText;
    },
    contentButton() {
      const button = this.content && this.content.button;
      if (
        button &&
        button.link &&
        button.link !== '' &&
        button.text &&
        button.text !== ''
      ) {
        return {
          ...button,
          type: this.checkUrlType(button.link),
        };
      }
      return null;
    },
    isSmallTitle() {
      return (
        (this.titleSmall && this.titleSmall !== '') ||
        (this.subTitle && this.subTitle !== '')
      );
    },
  },
  components: { BaseNavigation },
};
</script>