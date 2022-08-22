<template lang="pug">
section.cards
  ul.cards__list
    CardsItem(v-for='(card, index) in cards', :index='index', :card='card')
</template>

<script>
import cards from '../../assets/js/cards';

import CardsItem from './CardsItem.vue';

export default {
  components: {
    CardsItem,
  },
  computed: {
    page() {
      return this.$store.getters.page || {};
    },
    cards() {
      return this.page.content.sections || [];
    },
  },
  mounted() {
    cards();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/cards';
</style>