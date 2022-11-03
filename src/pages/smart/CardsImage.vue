<template lang="pug">
div(
  v-if='pageName',
  :class='`cards__img-wrapper cards__img-wrapper--${oddEvenLast}`'
)
  BaseImage(
    sectionName='cards',
    :modificator='pageName',
    alt='img',
    :image='image'
  )
</template>

<script>
import { mapGetters } from 'vuex';

import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';

export default {
  mixins: [converteSymbolsNewLineToBr],
  props: {
    oddEvenLast: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['pageName']),
  },
};
</script>
