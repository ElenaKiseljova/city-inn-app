<template lang="pug">
div(:class='imgClasses')
  picture(:class='pictureClasses')
    source(
      v-if='canUseWebp && image.webp?.desktop',
      media='(min-width: 1025px)',
      type='image/webp',
      :srcset='image.webp.desktop'
    )
    source(
      v-if='canUseWebp && image.webp?.tablet',
      media='(min-width: 500px)',
      :srcset='image.webp.tablet'
    )
    source(
      v-if='canUseWebp && image.webp?.mobile',
      media='(min-width: 100px)',
      type='image/webp',
      :srcset='image.webp.mobile'
    )

    source(
      v-if='image.jpg?.desktop',
      media='(min-width: 1025px)',
      :srcset='image.jpg.desktop'
    )
    source(
      v-if='image.jpg?.tablet',
      media='(min-width: 500px)',
      :srcset='image.jpg.tablet'
    )

    img(v-if='image.jpg?.mobile', :src='image.jpg.mobile', :alt='imageAlt')
    img(
      v-else-if='image.jpg?.tablet',
      :src='image.jpg.tablet',
      :alt='imageAlt'
    )
    img(
      v-else-if='image.jpg?.desktop',
      :src='image.jpg.desktop',
      :alt='imageAlt'
    )
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    modificator: {
      type: String,
      required: false,
      default: '',
    },
    alt: {
      type: String,
      required: false,
      default: '',
    },
    image: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['pageName', 'meta', 'browser']),
    canUseWebp() {
      return this.browser ? this.browser.canUseWebp : false;
    },
    imageAlt() {
      return this.alt !== '' ? this.alt : this.meta.title || 'img';
    },
    imgClasses() {
      const imageModificator =
        this.modificator !== ''
          ? `${this.sectionName}__img--${this.modificator}`
          : `${this.sectionName}__img--${this.pageName}`;

      return `${this.sectionName}__img ${imageModificator}`;
    },
    pictureClasses() {
      const pictureModificator =
        this.modificator !== ''
          ? `${this.sectionName}__picture--${this.modificator}`
          : `${this.sectionName}__picture--${this.pageName}`;

      return `${this.sectionName}__picture ${pictureModificator}`;
    },
  },
};
</script>