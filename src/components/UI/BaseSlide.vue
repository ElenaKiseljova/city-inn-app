<template lang="pug">
div(
  :class='`swiper-slide ${this.sectionName}__slide ${slideType} ${slideModification}`'
)
  slot
    | Empty slide
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    modificator: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['pageName']),
    slideModification() {
      return this.modificator !== ''
        ? `${this.sectionName}__slide--${this.slideModificator}`
        : `${this.sectionName}__slide--${this.pageName}`;
    },
    slideType() {
      return this.type !== '' ? `${this.sectionName}__slide--${this.type}` : '';
    },
  },
};
</script>