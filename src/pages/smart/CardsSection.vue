<template lang="pug">
section.cards(v-if='page && cards', ref='cards')
  ul.cards__list
    CardsItem(v-for='(card, index) in cards', :index='index', :card='card')
</template>

<script>
import { mapGetters } from 'vuex';

import { cardsAnimation } from '@/assets/js/gsap-animations';
import cards from '@/assets/js/cards';

import CardsItem from './CardsItem.vue';

export default {
  components: {
    CardsItem,
  },
  data() {
    return {
      cardsAnimationInited: false,
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    cards() {
      return this.page?.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
  },
  mounted() {
    this.setCardsAnimation();
  },
  updated() {
    this.setCardsAnimation();
  },
  // async beforeUnmount() {
  //   await cardsItemsAnimation.reset();
  // },
  methods: {
    setCardsAnimation() {
      if (this.$refs.cards && !this.cardsAnimationInited) {
        cards('cards', '.cards__item');

        cardsAnimation(this.$refs.cards);

        this.cardsAnimationInited = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/cards';
</style>