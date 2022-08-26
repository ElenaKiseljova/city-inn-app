<template lang="pug">
TheMain
  ThePromo
  InfoSection(sectionName='standart-info')
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import InfoSection from '@/components/sections/InfoSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    InfoSection,
  },
  mixins: [footerGsapAnimations],
};
</script>

