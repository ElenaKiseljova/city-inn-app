<template lang="pug">
TheMain
  ThePromo
  FoodSections(sectionName='approach-group')
  EventSection(sectionName='smart-rooms')
  SupplySection
  EventSection(sectionName='halls')
  GymSection
  TeamSection
  TheContacts
</template>

<script>
import TheMain from '@/components/layout/TheMain.vue';
import ThePromo from '@/components/sections/ThePromo.vue';
import FoodSections from '@/components/sections/FoodSections.vue';
import EventSection from '@/components/sections/EventSection.vue';
import GymSection from '@/components/sections/GymSection.vue';
import TeamSection from '@/components/sections/TeamSection.vue';
import TheContacts from '@/components/sections/TheContacts.vue';
import SupplySection from './group-request/SupplySection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    FoodSections,
    EventSection,
    GymSection,
    TeamSection,
    TheContacts,
    SupplySection,
  },
};
</script>
