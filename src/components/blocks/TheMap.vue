<template lang="pug">
#map.contacts__map(v-if='contacts && map && google')
</template>

<script>
import { mapGetters } from 'vuex';

import { mapInit } from '../../assets/js/map';

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
  async mounted() {
    if (this.google) {
      this.mapInit();
    } else if (this.map && !this.google) {
      await this.$store.dispatch('setGoogle', {
        key: this.map.key,
        lang: this.lang,
      });

      this.mapInit();
    }
  },
  methods: {
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
};
</script>