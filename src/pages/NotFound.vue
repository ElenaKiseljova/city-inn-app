<template lang="pug">
TheMain
  h1 Page not found
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';

export default {
  components: {
    TheMain,
  },
  mixins: [footerGsapAnimations],
};
</script>




