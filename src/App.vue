<template lang="pug">
//- teleport(to='body')
BaseSpinner.spinner--main(v-if='!appIsReady')

BaseScrollTopButton

TheHeader(:class='{ hidden: !appIsReady }')

.wrapper 
  router-view(:class='{ hidden: !appIsReady }', v-slot='slotProps')
    transition(name='rout', mode='out-in')
      component(:is='slotProps.Component') 

  TheFooter(:class='{ hidden: !appIsReady }')
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import detect from 'detect.js';

import { reloader } from './assets/js/modules/gsap-animations';
import { scrollbarInit } from '@/assets/js/modules/bodyScrollbar';

import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  computed: {
    ...mapGetters(['header', 'footer', 'page', 'images', 'isSetLang', 'lang']),
    appIsReady() {
      return this.header && this.footer && this.page && this.images === 0
        ? true
        : false;
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
  async created() {
    // Page redirect if lang is not changed previously by click lang button
    if (!this.isSetLang) {
      const path = this.$route.path;

      if (this.lang === 'uk' && path.indexOf('/en') === 0) {
        window.location.href = `${window.location.origin}${path.replace(
          '/en',
          ''
        )}`;
      }

      if (this.lang !== 'uk' && path.indexOf('/en') !== 0) {
        window.location.href = `${window.location.origin}/en${path}`;
      }
    }

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
  mounted() {
    scrollbarInit();
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
@import '~@/assets/scss/blocks/dooble';

#app {
  width: 100%;

  overflow: hidden;
}

.hidden {
  visibility: hidden;
}

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
