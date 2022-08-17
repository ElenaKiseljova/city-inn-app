<template>
  <div :class="`page page--${pageName}`">
    <TheHeader />

    <TheMain>
      <router-view> </router-view>
    </TheMain>

    <TheFooter />
  </div>
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
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/layout/page';
</style>
