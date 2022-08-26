<template lang="pug">
TheMain
  ThePromo
  InfoSection(sectionName='conference-info')
  SeatingSection
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import InfoSection from '@/components/sections/InfoSection.vue';
import SeatingSection from './conference-hall/SeatingSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    InfoSection,
    SeatingSection,
  },
  mixins: [footerGsapAnimations],
};
</script>

