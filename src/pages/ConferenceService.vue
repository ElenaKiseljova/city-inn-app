<template lang="pug">
TheMain
  ThePromo
  FoodSections(sectionName='approach-conference')
  EventSection(sectionName='locations')
  TypesSection
  TheContacts
</template>

<script>
import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import FoodSections from '@/components/sections/FoodSections.vue';
import EventSection from '@/components/sections/EventSection.vue';
import TypesSection from './conference-services/TypesSection.vue';
import TheContacts from '@/components/sections/TheContacts.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    FoodSections,
    EventSection,
    TypesSection,
    TheContacts,
  },
};
</script>

