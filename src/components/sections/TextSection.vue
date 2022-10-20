<template lang="pug">
.text-page(v-if='page && content && items')
  .text-page__container.container(ref='container')
    nav.text-page__nav(v-if='items?.length > 0', ref='navBar')
      ul.text-page__nav-list 
        li.text-page__nav-item(
          v-for='(item, index) in items',
          :key='item.title',
          ref='navItem'
        ) 
          h2.text-page__title
            | {{ item.title }}

    ul.text-page__list(v-if='items?.length > 0', ref='list')
      li.text-page__item(
        v-for='(item, index) in items',
        :key='item.title',
        ref='listItem'
      )
        h2.text-page__title.text-page__title--mobile
          | {{ item.title }}

        .text-page__content(v-html='item.content')
</template>
  
<script>
import { mapGetters } from 'vuex';

import changeActiveClass from '@/assets/js/modules/changeActiveClass';
import accordion from '@/assets/js/modules/accordion';
import {
  textItemsAnimation,
  textNavPin,
  DEVICE_WIDTH,
  DESKTOP_WIDTH,
} from '@/assets/js/modules/gsap-animations';

export default {
  data() {
    return {
      scriptsIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['page', 'routeChanged']),
    content() {
      return this.page?.content && this.page.content?.content
        ? this.page.content.content
        : null;
    },
    items() {
      return this.content && this.content?.items ? this.content.items : null;
    },
  },
  watch: {
    async routeChanged(cur, prev) {
      if (cur === false && prev === true) {
        await this.resetScripts();
      }
    },
  },
  mounted() {
    this.setScripts();
  },
  updated() {
    this.setScripts();
  },
  async beforeUnmount() {
    await this.resetScripts();
  },
  methods: {
    setScripts() {
      if (!this.scriptsIsSet) {
        if (
          DEVICE_WIDTH >= DESKTOP_WIDTH &&
          this.$refs.container &&
          this.$refs.navBar &&
          this.$refs.listItem
        ) {
          textNavPin.init(this.$refs.container, this.$refs.navBar);

          this.$refs.listItem.forEach((listItem, index) => {
            const listItemToggleActive = () => {
              if (listItem.classList.contains('active')) {
                this.$refs.listItem[index + 1]?.classList.remove('active');
              } else {
                listItem.classList.add('active');
              }

              changeActiveClass(this.$refs.navItem);

              this.$refs.navItem[index]?.classList.add('active');
            };

            textItemsAnimation.init(listItem, listItemToggleActive);
          });

          this.scriptsIsSet = true;
        } else if (DEVICE_WIDTH < DESKTOP_WIDTH && this.$refs.list) {
          this.scriptsIsSet = accordion(this.$refs.list);
        }
      }
    },
    async resetScripts() {
      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        await textItemsAnimation.reset();
        await textNavPin.reset();

        this.scriptsIsSet = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/text-page';
</style>