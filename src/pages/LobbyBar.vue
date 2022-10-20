<template lang="pug">
TheMain
  ThePromo
  DoingsSection
  BarSection
  EventSection(sectionName='kitchen')
  FoodSections(sectionName='breakfast')
  TheContacts
</template>

<script>
import TheMain from '@/components/layout/TheMain.vue';
import ThePromo from '@/components/sections/ThePromo.vue';
import DoingsSection from './lobby-bar/DoingsSection.vue';
import BarSection from './lobby-bar/BarSection.vue';
import EventSection from '@/components/sections/EventSection.vue';
import FoodSections from '@/components/sections/FoodSections.vue';
import TheContacts from '@/components/sections/TheContacts.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    DoingsSection,
    BarSection,
    EventSection,
    FoodSections,
    TheContacts,
  },
};
</script>

