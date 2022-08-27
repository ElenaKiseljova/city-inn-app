<template lang="pug">
section.experience(v-if='page && sections && section && items')
  .experience__container.container
    h2.title-inner.experience__title(v-if='title', v-html='title')

    ul.experience__list(v-if='items.length > 0')
      li.experience__item(v-for='item in items')
        p.experience__text.experience__text--top
          | {{ item.textTop }}

        p.experience__number
          | {{ item.number }}

        p.experience__text.experience__text--bottom
          | {{ item.textBottom }}
</template>

<script>
import { experience } from '../../assets/js/gsap-animations';

import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '../../mixins/converteSymbolsNewLineToBr';

export default {
  mixins: [converteSymbolsNewLineToBr],
  computed: {
    ...mapGetters(['page']),
    sections() {
      return this.page.content && this.page.content.sections
        ? this.page.content.sections
        : null;
    },
    section() {
      return this.sections && this.sections[6] ? this.sections[6] : null;
    },
    title() {
      return this.section.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    items() {
      return this.section.items ? this.section.items : [];
    },
  },
  mounted() {
    experience();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/experience';
</style>