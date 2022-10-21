<template lang="pug">
section.rooms(v-if='page && items')
  BaseSlider(
    v-if='items.length > 0',
    sectionName='rooms',
    :modificator='pageName'
  )
    BaseSlide(
      v-for='(item, index) in items',
      :key='item.title',
      sectionName='rooms',
      :modificator='pageName'
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

          .room__bottom(:class='`room__bottom--${mode(index)}`')
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

  BasePagination(sectionName='rooms', :modificator='pageName')
</template>

<script>
import { mapGetters } from 'vuex';

import titleAnimation from '@/mixins/titleAnimation';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';

export default {
  mixins: [titleAnimation, converteSymbolsNewLineToBr],
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