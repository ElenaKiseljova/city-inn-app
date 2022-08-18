<template lang="pug">
TheMain
  ThePromo
</template>

<script>
import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/mixins/ThePromo.vue';

export default {
  components: {
    TheMain,
    ThePromo,
  },
};
</script>

