<template lang="pug">
div(:class='imgClasses')
  picture(:class='pictureClasses')
    source(
      v-if='image.webp.desktop',
      media='(min-width: 1025px)',
      type='image/webp',
      :srcset='image.webp.desktop'
    )
    source(
      v-if='image.webp.tablet',
      media='(min-width: 500px)',
      :srcset='image.webp.tablet'
    )
    source(
      v-if='image.webp.mobile',
      media='(min-width: 100px)',
      type='image/webp',
      :srcset='image.webp.mobile'
    )

    source(
      v-if='image.jpg.desktop',
      media='(min-width: 1025px)',
      :srcset='image.jpg.desktop'
    )
    source(
      v-if='image.jpg.tablet',
      media='(min-width: 500px)',
      :srcset='image.jpg.tablet'
    )

    img(v-if='image.jpg.mobile', :src='image.jpg.mobile', :alt='imageAlt')
    img(v-else-if='image.jpg.tablet', :src='image.jpg.tablet', :alt='imageAlt')
    img(
      v-else-if='image.jpg.desktop',
      :src='image.jpg.desktop',
      :alt='imageAlt'
    )
</template>

<script>
export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    modificator: {
      type: String,
      required: false,
      default: null,
    },
    alt: {
      type: String,
      required: false,
      default: null,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    meta() {
      return this.$store.getters.meta;
    },
    imageModificator() {
      return this.modificator || this.pageName;
    },
    imageAlt() {
      return this.alt || this.meta.title;
    },
    imgClasses() {
      return `${this.sectionName}__img ${this.sectionName}__img--${this.imageModificator}`;
    },
    pictureClasses() {
      return `${this.sectionName}__picture ${this.sectionName}__picture--${this.imageModificator}`;
    },
  },
};
</script>