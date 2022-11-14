<template lang="pug">
#map.contacts__map(ref="mapEl")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { mapInit } from '@/assets/js/modules/map';

export default {
  data() {
    return {
      mapIsReady: false,
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
