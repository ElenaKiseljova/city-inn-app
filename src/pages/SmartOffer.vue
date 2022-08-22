<template lang="pug">
TheMain
  ThePromo
  CardsSections
</template>

<script>
import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/mixins/ThePromo.vue';
import CardsSections from './smart/CardsSections.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    CardsSections,
  },
};
</script>

