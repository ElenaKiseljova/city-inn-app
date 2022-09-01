<template lang="pug">
TheMain
  ThePromo
  SpaSection
  EventSection(sectionName='saunas')
  GymSection
</template>

<script>
import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import GymSection from '@/components/sections/GymSection.vue';
import EventSection from '@/components/sections/EventSection.vue';
import SpaSection from './starfit/SpaSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    GymSection,
    EventSection,
    SpaSection,
  },
};
</script>

