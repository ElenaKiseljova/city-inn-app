<template lang="pug">
TheMain
  ThePromo
  MissionSection
  HomeSection(sectionName='why')
  FoodSections(sectionName='advantages')
  EventSection(sectionName='around')
  EventSection(sectionName='attraction')
  TheContacts
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import MissionSection from '../pages/about/MissionSection.vue';
import HomeSection from '../components/sections/HomeSection.vue';
import EventSection from '../components/sections/EventSection.vue';
import FoodSections from '../components/sections/FoodSections.vue';
import TheContacts from '../components/sections/TheContacts.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    MissionSection,
    HomeSection,
    EventSection,
    FoodSections,
    TheContacts,
  },
  mixins: [footerGsapAnimations],
};
</script>

