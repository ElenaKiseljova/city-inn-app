<template lang="pug">
#map.contacts__map
</template>

<script>
import { mapInit } from '../../assets/js/map';

export default {
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
  computed: {
    lang() {
      return this.$store.getters.lang;
    },
    google() {
      return this.$store.getters.google;
    },
    contacts() {
      return this.$store.getters.contacts;
    },
    map() {
      return this.contacts && this.contacts.content.map
        ? this.contacts.content.map
        : {};
    },
  },
  watch: {
    google() {
      if (this.google) {
        this.mapInit();
      }
    },
    map() {
      if (!this.google && this.map.key) {
        this.$store.dispatch('setGoogle', {
          key: this.map.key,
          lang: this.lang,
        });
      }
    },
  },
  mounted() {
    if (!this.google && this.map.key) {
      this.$store.dispatch('setGoogle', {
        key: this.map.key,
        lang: this.lang,
      });
    } else {
      this.mapInit();
    }
  },
};
</script>