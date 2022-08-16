<template>
  <TheHeader />

  <TheMain>
    <router-view />
  </TheMain>

  <TheFooter />
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheMain from './components/layout/TheMain.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
};
</script>

<style lang="scss">
// app styles
</style>
