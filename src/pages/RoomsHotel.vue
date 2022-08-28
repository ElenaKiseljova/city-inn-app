<template lang="pug">
TheMain
  ThePromo
  RoomsSection
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import RoomsSection from './rooms-hotel/RoomsSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    RoomsSection,
  },
  mixins: [footerGsapAnimations],
};
</script>

