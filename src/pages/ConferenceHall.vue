<template lang="pug">
TheMain
  ThePromo
  InfoSection(sectionName='conference-info')
  SeatingSection
  PricesSection
  EventSection(sectionName='coffee')
  FoodSections(sectionName='why-conference')
  ParkingSection
  ExperienceSection
  TeamSection
  TheContacts
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import InfoSection from '@/components/sections/InfoSection.vue';
import SeatingSection from './conference-hall/SeatingSection.vue';
import PricesSection from './conference-hall/PricesSection.vue';
import EventSection from '@/components/sections/EventSection.vue';
import FoodSections from '../components/sections/FoodSections.vue';
import ParkingSection from './conference-hall/ParkingSection.vue';
import ExperienceSection from './conference-hall/ExperienceSection.vue';
import TeamSection from '@/components/sections/TeamSection.vue';
import TheContacts from '@/components/sections/TheContacts.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    InfoSection,
    SeatingSection,
    PricesSection,
    EventSection,
    FoodSections,
    ParkingSection,
    ExperienceSection,
    TeamSection,
    TheContacts,
  },
  mixins: [footerGsapAnimations],
};
</script>

