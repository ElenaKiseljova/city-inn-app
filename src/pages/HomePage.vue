<template lang="pug">
TheMain
  ThePromo
  HomeSection(sectionName='smart', :section='getSection("smart")')
  HomeSection(sectionName='lobby', :section='getSection("lobby")')
  HomeSection(sectionName='conference', :section='getSection("conference")')
  HomeSection(sectionName='group', :section='getSection("group")')
  HomeSection(sectionName='restaurant', :section='getSection("restaurant")')
  HomeSection(sectionName='starfit', :section='getSection("starfit")')
  HomeSection(sectionName='about', :section='getSection("about")')
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
  methods: {
    getSection(name) {
      return this.sections.find((section) => section.sectionName === name);
    },
  },
  computed: {
    page() {
      return this.$store.getters.page || {};
    },
    sections() {
      return this.page.content.sections || [];
    },
  },
};
</script>

