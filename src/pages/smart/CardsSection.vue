<template lang="pug">
section.cards(v-if='page && cards')
  ul.cards__list
    CardsItem(v-for='(card, index) in cards', :index='index', :card='card')
</template>

<script>
import { mapGetters } from 'vuex';

import cards from '../../assets/js/cards';

import CardsItem from './CardsItem.vue';

export default {
  components: {
    CardsItem,
  },
  data() {
    return {
      cardsAnimationInited: false,

      cardsAnimationInterval: null,

      i: 0,
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    cards() {
      return this.page.content && this.page.content.sections
        ? this.page.content.sections
        : [];
    },
  },
  mounted() {
    if (!this.cardsAnimationInited) {
      this.cardsAnimationInterval = setInterval(() => {
        const cardsSection = document.querySelector('.cards');

        if (cardsSection) {
          clearInterval(this.cardsAnimationInterval);

          cards('cards', '.cards__item');

          this.cardsAnimationInited = true;
        }

        this.i += 1;

        if (this.i > 10) {
          clearInterval(this.cardsAnimationInterval);
        }

        console.log('search cards');
      }, 300);
    }
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/cards';
</style>