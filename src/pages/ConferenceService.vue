<template lang="pug">
TheMain
  ThePromo
  FoodSections(sectionName='approach-conference')
  EventSection(sectionName='locations')
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import FoodSections from '@/components/sections/FoodSections.vue';
import EventSection from '@/components/sections/EventSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    FoodSections,
    EventSection,
  },
  mixins: [footerGsapAnimations],
};
</script>

