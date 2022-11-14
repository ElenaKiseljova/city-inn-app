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
      const uaPath =
        path === '/en' ? path.replace('/en', '/') : path.replace('/en', '');

      window.location.href =
        this.lang === 'uk'
          ? `${window.location.origin}/en${path}`
          : `${window.location.origin}${uaPath}`;
    },
  },
};
</script>
