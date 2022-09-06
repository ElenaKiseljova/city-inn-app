<template lang="pug">
teleport(to='body')
  BaseSpinner.spinner--main(v-if='!appIsReady')

  TheHeader(v-show='appIsReady')

router-view(v-show='appIsReady', v-slot='slotProps')
  transition(name='rout', mode='out-in')
    component(:is='slotProps.Component') 

TheFooter(v-show='appIsReady')
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import detect from 'detect.js';

import { reloader } from './assets/js/swipers';

import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
    BaseSpinner,
  },
  computed: {
    ...mapGetters(['header', 'footer', 'page']),
    appIsReady() {
      return this.header && this.footer && this.page ? true : false;
    },
    langButton() {
      return document.querySelector('.menu__lang');
    },
  },
  watch: {
    appIsReady() {
      if (this.appIsReady) {
        reloader();
      }
    },
  },
  beforeCreate() {
    // Lang redirect
    const browserLang = window.navigator.language;
    const path = this.$route.path;

    if (browserLang === 'uk' && path.indexOf('/en') === 0) {
      window.location.href = `${window.location.origin}${path.replace(
        '/en',
        ''
      )}`;
    }

    if (browserLang !== 'uk' && path.indexOf('/en') === -1) {
      window.location.href = `${window.location.origin}/en${path}`;
    }
  },
  async created() {
    // Webp support detect
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

    await this.setBrowser(browser);
  },
  methods: {
    ...mapActions(['setBrowser']),
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

/** Animations Routs */
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
