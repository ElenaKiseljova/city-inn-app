<template lang="pug">
TheMain
  ThePromo
  CosySection
  FoodSections(sectionName='menu')
  BanquetSection
  EventSection(sectionName='event')
  TheContacts
</template>

<script>
import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import TheContacts from '../components/sections/TheContacts.vue';
import CosySection from './restaurant-sviatoslav/CosySection.vue';
import FoodSections from '@/components/sections/FoodSections.vue';
import BanquetSection from './restaurant-sviatoslav/BanquetSection.vue';
import EventSection from '@/components/sections/EventSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    TheContacts,
    CosySection,
    FoodSections,
    BanquetSection,
    EventSection,
  },
};
</script>

