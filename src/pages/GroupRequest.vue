<template lang="pug">
TheMain
  ThePromo
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';

export default {
  components: {
    TheMain,
    ThePromo,
  },
  mixins: [footerGsapAnimations],
};
</script>

