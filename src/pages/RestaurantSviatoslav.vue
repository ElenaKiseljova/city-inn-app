<template lang="pug">
TheMain
  ThePromo
  TheContacts
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import TheContacts from '../components/sections/TheContacts.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    TheContacts,
  },
  mixins: [footerGsapAnimations],
};
</script>

