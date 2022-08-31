<template lang="pug">
TheHeader 

router-view(v-slot='slotProps')
  transition(name='rout', mode='out-in')
    component(:is='slotProps.Component') 

TheFooter
</template>

<script>
import { mapGetters } from 'vuex';

import detect from 'detect.js';

import { reloader } from './assets/js/swipers';

import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  ...mapGetters(['browser']),
  async created() {
    const ua = detect.parse(navigator.userAgent);

    const browser = {
      name: ua.browser.family,
      version: ua.browser.version,
      type: ua.device.type,
      canUseWebp:
        !ua.browser.family.includes('Safari') ||
        (ua.browser.family.includes('Safari') &&
          ua.device.type === 'Desktop' &&
          parseInt(ua.browser.version, 10) >= 16) ||
        (ua.browser.family.includes('Safari') &&
          ua.device.type === 'Mobile' &&
          parseInt(ua.browser.version, 10) >= 14),
    };

    await this.$store.dispatch('setBrowser', browser);
  },
  mounted() {
    reloader();

    // alert('mounted');
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/general/fonts';
@import '~@/assets/scss/general/normalize';
@import '~@/assets/scss/general/global';
@import '~@/assets/scss/general/visually-hidden';

@import '~@/assets/scss/layout/container';

@import '~@/assets/scss/blocks/title';
@import '~@/assets/scss/blocks/title-inner';

/** Animations */
.rout-enter-from {
  opacity: 0.5;
  transform: translateY(-30px);
}

.rout-leave-to {
  opacity: 0.5;
  transform: translateY(-30px);
}

.rout-enter-active {
  transition: all 0.3s ease-out;
}

.rout-leave-active {
  transition: all 0.3s ease-in;
}

.rout-enter-to,
.rout-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
