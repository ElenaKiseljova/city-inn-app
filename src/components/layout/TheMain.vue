<template lang="pug">
main(:class='`page-main page-main--${pageName}`')
  slot
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['pageName']),
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/layout/page-main';
</style>