<template lang="pug">
section.rooms.dooble(v-if='page && items')
  SwiperSlider(
    :class="`rooms__slider rooms__slider--images rooms__slider--${pageName} dooble__slider dooble__slider--images`"
    :modules="modules"
    :slides-per-view="swiperOptions.slidesPerView",
    :space-between="swiperOptions.spaceBetween",
    :resize-observer="swiperOptions.resizeObserver",
    :speed="swiperOptions.speed",
    :navigation="swiperNavigation",
    :pagination="swiperPagination",
    :controller="{ control: textSwiper }",
    :enabled="swiperEnabled",
    :loop="swiperOptions.loop",
    @swiper="setSwiper"
    @beforeTransitionStart="onBeforeTransitionStart"
  )
    SwiperSlide(
      v-for='(item, index) in items',
      :key='item.title',
      :class="`rooms__slide rooms__slide--images rooms__slide--${pageName} ${slideClass}`",
      @click="slideChange"
    )  
      .room(ref='section')
        .room__container.container(:class='`room__container--${mode(index)}`')
          .room__top(:class='`room__top--${mode(index)}`')
            h2(
              v-if='item.title && item.title !== ""',
              v-html='converteSymbolsNewLineToBr(item.title)',
              :class='`title-inner room__title room__title--mobile room__title--${mode(index)}`',
              ref='titleMobile'
            )

            .room__img-wrapper(
              v-if='item.image || item.previewImage',
              :class='`room__img-wrapper--${mode(index)}`'
            )
              BaseImage(
                sectionName='room',
                :modificator='mode(index)',
                :image='item.image || item.previewImage'
              )

          .room__bottom(:class='`room__bottom--${mode(index)} room__bottom--desktop`')
            h2(
              v-if='item.title && item.title !== ""',
              v-html='converteSymbolsNewLineToBr(item.title)',
              :class='`title-inner room__title room__title--desktop room__title--${mode(index)}`',
              ref='title'
            )

            .room__services-wrapper(
              v-if='item.services && item.services.length > 0',
              :class='`room__services-wrapper--${mode(index)}`'
            )
              BaseServices(
                sectionName='room',
                :modificator='pageName',
                :items='item.services'
              )

            .room__buttons(:class='`room__buttons--${mode(index)}`')
              BasePrice(
                v-if='item.priceFor && item.price',
                sectionName='room',
                :modificator='mode(index)',
                :price='{ text: item.priceFor, number: item.price }'
              )

              BaseButton(
                v-if='item.book',
                sectionName='room',
                :modificator='pageName',
                :button='item.book'
              )

              BaseButton(
                v-if='item.more',
                sectionName='room',
                :modificator='pageName',
                :button='item.more'
              )

  SwiperSlider(
    :class="`rooms__slider rooms__slider--text rooms__slider--${pageName} dooble__slider dooble__slider--text`"
    :modules="modules"
    :slides-per-view="swiperTextOptions.slidesPerView",
    :space-between="swiperTextOptions.spaceBetween",
    :resize-observer="swiperTextOptions.resizeObserver",
    :speed="swiperTextOptions.speed",
    :controller="{ control: swiper }",
    :effect="swiperTextOptions.effect",
    :fadeEffect="{crossFade: true}",
    :loop="swiperOptions.loop",
    @swiper="setTextSwiper"
  )
    SwiperSlide(
      v-for='(item, index) in items',
      :key='item.title',
      :class="`rooms__slide rooms__slide--text rooms__slide--${pageName}`"
    )
      .room(ref='section')
        .room__container.container(:class='`room__container--${mode(index)}`')
          .room__bottom(:class='`room__bottom--${mode(index)} room__bottom--mobile`')
            h2(
              v-if='item.title && item.title !== ""',
              v-html='converteSymbolsNewLineToBr(item.title)',
              :class='`title-inner room__title room__title--desktop room__title--${mode(index)}`',
              ref='title'
            )

            .room__services-wrapper(
              v-if='item.services && item.services.length > 0',
              :class='`room__services-wrapper--${mode(index)}`'
            )
              BaseServices(
                sectionName='room',
                :modificator='pageName',
                :items='item.services'
              )

            .room__buttons(:class='`room__buttons--${mode(index)}`')
              BasePrice(
                v-if='item.priceFor && item.price',
                sectionName='room',
                :modificator='mode(index)',
                :price='{ text: item.priceFor, number: item.price }'
              )

              BaseButton(
                v-if='item.book',
                sectionName='room',
                :modificator='pageName',
                :button='item.book'
              )

              BaseButton(
                v-if='item.more',
                sectionName='room',
                :modificator='pageName',
                :button='item.more'
              )

  BasePagination(:swiperIndex="swiperIndex", sectionName='rooms', :modificator='pageName')
</template>

<script>
import { mapGetters } from 'vuex';

import titleAnimation from '@/mixins/titleAnimation';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import swiperSliderInit from '@/mixins/swiperSliderInit';

export default {
  mixins: [titleAnimation, converteSymbolsNewLineToBr, swiperSliderInit],
  data() {
    return {
      sectionName: 'rooms',
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    items() {
      return this.page?.content && this.page.content.items
        ? this.page.content.items
        : [];
    },
  },
  methods: {
    mode(index) {
      return (index + 1) % 2 === 0 ? 'even' : 'odd';
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/rooms';
@import '~@/assets/scss/blocks/room';
</style>
