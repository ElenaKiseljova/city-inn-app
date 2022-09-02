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

      return {
        path: this.lang === 'uk' ? `/en${path}` : path.replace('/en', ''),
        text: this.lang === 'uk' ? 'en' : 'ua',
      };
    },
  },
};
</script>