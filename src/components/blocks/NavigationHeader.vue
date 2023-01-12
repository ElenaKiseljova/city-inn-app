<template lang="pug">
nav.nav
  ul.nav__list
    li.nav__item(v-for='navItemHeader in navItemsHeader', :data-text="navItemHeader.title")
      router-link.nav__link(:to='navItemHeader.link') {{ navItemHeader.title }}
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  computed: {
    navItemsHeader() {
      const shiftedItems = [...this.items];
      shiftedItems.shift();

      return shiftedItems;
    },
  },
};
</script>
