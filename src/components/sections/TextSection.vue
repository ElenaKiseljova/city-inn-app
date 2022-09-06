<template lang="pug">
.text 
  .text__container.container 
</template>
  
  <script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['page']),
    items() {
      return this.page?.content && this.page.content.items
        ? this.page.content.items
        : null;
    },
    titles() {
      if (this.items) {
        const titles = this.items.map((item) => {
          return item.title;
        });

        return titles;
      }

      return null;
    },
    contents() {
      if (this.items) {
        const contents = this.items.map((item) => {
          return item.content;
        });

        return contents;
      }

      return null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/text';
</style>