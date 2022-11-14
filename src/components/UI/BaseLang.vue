<template lang="pug">
button.lang.button.button--circle(
  :class='`${sectionName}__lang`',
  @click='changeLang'
)
  span {{ toLang }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['lang']),
    toLang() {
      return this.lang === 'uk' ? 'en' : 'ua';
    },
  },
  methods: {
    ...mapActions(['setLang', 'updateIsSetLang']),
    async changeLang() {
      const newLang = this.lang === 'uk' ? 'en' : 'uk';

      await this.setLang(newLang);
      await this.updateIsSetLang();

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
    },
  },
};
</script>
