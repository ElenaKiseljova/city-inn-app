<template lang="pug">
TheMain
  ThePromo
  MissionSection
  HomeSection(sectionName='why')
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import MissionSection from '../pages/about/MissionSection.vue';
import HomeSection from '../components/sections/HomeSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    MissionSection,
    HomeSection,
  },
  mixins: [footerGsapAnimations],
};
</script>

