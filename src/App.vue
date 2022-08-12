<template>
  <div>
    <TheHeader />

    <router-view />

    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
  metaInfo: {
    title: 'My Example App',
    titleTemplate: '%s - Yay!',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
  },
};
</script>

<style lang="scss">
</style>
