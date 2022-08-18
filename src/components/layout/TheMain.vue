<template lang="pug">
main(:class='`page-main page-main--${pageName}`')
  slot
</template>

<script>
export default {
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/layout/page-main';
</style>