<template lang="pug">
TheMain
  ThePromo
  CardsSection
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import CardsSection from './smart/CardsSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    CardsSection,
  },
  mixins: [footerGsapAnimations],
};
</script>

