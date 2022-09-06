<template lang="pug">
TheMain
  ThePromo 
  TextSection
</template>

<script>
import TheMain from '@/components/layout/TheMain.vue';
import ThePromo from '@/components/sections/ThePromo.vue';
import TextSection from '@/components/sections/TextSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    TextSection,
  },
};
</script>