<template lang="pug">
router-link.lang.button.button--circle(
  :class='`${sectionName}__lang`',
  :to='langToggle.path'
)
  span {{ langToggle.text }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['lang']),
    langToggle() {
      const path = this.$route.path;
      const uaPath =
        path === '/en' ? path.replace('/en', '/') : path.replace('/en', '');

      return {
        path: this.lang === 'uk' ? `/en${path}` : uaPath,
        text: this.lang === 'uk' ? 'en' : 'ua',
      };
    },
  },
};
</script>