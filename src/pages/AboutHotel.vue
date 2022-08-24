<template lang="pug">
TheMain
  ThePromo
  MissionSection
  HomeSection(sectionName='why')
</template>

<script>
import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/mixins/ThePromo.vue';
import MissionSection from '../pages/about/MissionSection.vue';
import HomeSection from '../components/mixins/HomeSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    MissionSection,
    HomeSection,
  },
  computed: {
    // page() {
    //   return this.$store.getters.page || {};
    // },
    // sections() {
    //   return this.page.content.sections || [];
    // },
    // section() {
    //   return this.sections[1] || {};
    // },
  },
};
</script>

