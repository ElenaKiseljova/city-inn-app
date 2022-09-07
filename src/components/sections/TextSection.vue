<template lang="pug">
.text-page(v-if='page && content && items')
  .text-page__container.container 
    nav.text-page__nav(v-if='items?.length > 0')
      ul.text-page__nav-list 
        li.text-page__nav-item(
          v-for='(item, index) in items',
          :key='item.title'
        ) 
          h2.text-page__title
            | {{ item.title }}

    ul.text-page__list(v-if='items?.length > 0', ref='list')
      li.text-page__item(v-for='(item, index) in items', :key='item.title')
        h2.text-page__title.text-page__title--mobile
          | {{ item.title }}

        .text-page__content(v-html='item.content')
</template>
  
<script>
import { mapGetters } from 'vuex';

import accordion from '@/assets/js/accordion';

export default {
  data() {
    return {
      scriptsIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['page']),
    content() {
      return this.page?.content && this.page.content?.content
        ? this.page.content.content
        : null;
    },
    items() {
      return this.content && this.content?.items ? this.content.items : null;
    },
  },
  mounted() {
    this.setScripts();
  },
  updated() {
    this.setScripts();
  },
  methods: {
    setScripts() {
      if (this.$refs.list && !this.scriptsIsSet) {
        this.scriptsIsSet = accordion(this.$refs.list);
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/text-page';
</style>