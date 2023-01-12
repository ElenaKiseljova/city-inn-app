<template lang="pug">
a#map.contacts__map(:href="mapLink", target="_blank" ref="mapEl")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { mapInit } from '@/assets/js/modules/map';

export default {
  data() {
    return {
      mapIsReady: false,
      mapLink:
        'https://www.google.com/maps/place/%D0%A1%D0%B2%D1%8F%D1%82%D0%BE%D1%81%D0%BB%D0%B0%D0%B2+%D0%9E%D1%82%D0%B5%D0%BB%D1%8C/@49.8107658,24.1392699,18.92z/data=!4m8!3m7!1s0x473ac26fe22c7d89:0x8525bf2f39e5844f!5m2!4m1!1i2!8m2!3d49.8109073!4d24.1393622',
    };
  },
  computed: {
    ...mapGetters(['lang', 'google', 'contacts']),
    map() {
      return this.contacts?.content.map ? this.contacts.content.map : {};
    },
  },
  mounted() {
    this.setMap();
  },
  updated() {
    this.setMap();
  },
  methods: {
    ...mapActions(['setGoogle']),
    mapInit(mapEl) {
      if (this.map.center && this.map.zoom && mapEl) {
        const options = {
          center: this.map.center,
          zoom: this.map.zoom,
        };

        return mapInit(this.google, options, mapEl);
      }

      return false;
    },
    async setMap() {
      if (this.$refs.mapEl && !this.mapIsReady) {
        if (this.google) {
          this.mapIsReady = this.mapInit(this.$refs.mapEl);
        } else if (this.map && !this.google) {
          await this.setGoogle({
            key: this.map.key,
            lang: this.lang,
          });

          this.mapIsReady = this.mapInit(this.$refs.mapEl);
        }
      }
    },
  },
};
</script>
