<template lang="pug">
TheMain
  ThePromo
  HomeSection(sectionName='smart')
  HomeSection(sectionName='lobby')
  HomeSection(sectionName='conference')
  HomeSection(sectionName='group')
  HomeSection(sectionName='restaurant')
  HomeSection(sectionName='starfit')
  HomeSection(sectionName='about')
  TheContacts
</template>

<script>
import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/mixins/ThePromo.vue';
import HomeSection from '../components/mixins/HomeSection.vue';
import TheContacts from '../components/blocks/TheContacts.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    HomeSection,
    TheContacts,
  },
};
</script>

