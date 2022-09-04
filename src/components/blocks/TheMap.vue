<template lang="pug">
#map.contacts__map(v-if='contacts && map && google')
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { mapInit } from '../../assets/js/map';

export default {
  data() {
    return {
      mapIsReady: false,
    };
  },
  methods: {
    ...mapActions(['setGoogle']),
    mapInit() {
      if (this.map.center && this.map.zoom) {
        const options = {
          center: this.map.center,
          zoom: this.map.zoom,
        };

        mapInit(this.google, options);
      }
    },
  },
  computed: {
    ...mapGetters(['lang', 'google', 'contacts']),
    map() {
      return this.contacts && this.contacts.content.map
        ? this.contacts.content.map
        : {};
    },
  },
  async mounted() {
    if (this.google) {
      this.mapInit();
    } else if (this.map && !this.google) {
      /*Уже используется вспомагательная функция mapGetters, которая позволяет удобно доставать геттеры со стора. Точно также можно сделать с actions с помощью
      ...mapActions. было бы просто. Удобнее как по мне, не нужно писать this.$store.dispatch.
        await this.setGoogle({
          key: this.map.key,
          lang: this.lang,
        })
      */
      await this.$store.dispatch('setGoogle', {
        key: this.map.key,
        lang: this.lang,
      });

      this.mapInit();
    }
  },
};
</script>