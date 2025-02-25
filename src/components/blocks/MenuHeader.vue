<template lang="pug">
.menu(v-if='header', ref='menu')
  .menu__container.container
    .menu__nav
      NavigationHeader(:items='navigationList')

    .menu__bottom
      .menu__social 
        BaseLang(sectionName='menu')
        BaseSocial(:items='social', direction='horizontal')

      BaseButton(
        v-if='book',
        sectionName='menu',
        :modificator='pageName',
        :button='book'
      )

      .menu__call.call
        a.call__link(
          v-if='callUs.link && callUs.text',
          :href='callUs.link',
          :data-text='callUs.text',
          :data-phone='callUs.phone'
        )
          span.call__text
            | {{ callUs.text }}

          span.call__icon
            svg(width='48', height='48')
              use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-phone')

      a.menu__phone.phone(v-if='callUs.link', :href='callUs.link')
        svg(width='48', height='48')
          use(xlink:href='@/assets/img/sprites/sprite-mono.svg#icon-phone')
  BaseImage(
    v-if='navigationList.length > 0',
    v-for='(navItemHeader, index) in navigationList',
    :key='navItemHeader.title',
    sectionName='menu',
    :image='navItemHeader.image'
  )
</template>

<script>
import { mapGetters } from 'vuex';

import { callUs } from '@/assets/js/modules/callUs';
import menu from '@/assets/js/modules/menu';

import social from '@/mixins/social';

import NavigationHeader from './NavigationHeader.vue';

export default {
  components: {
    NavigationHeader,
  },
  mixins: [social],
  data() {
    return {
      menuScriptIsSet: false,
      menuScriptInterval: null,
      callUsScriptIsSet: false,
      callUsScriptInterval: null,
    };
  },
  computed: {
    ...mapGetters(['header', 'pageName']),
    book() {
      return this.header?.content?.book ? this.header.content.book : null;
    },
    callUs() {
      return this.header?.content?.call ? this.header.content.call : {};
    },
    navigationList() {
      return this.header?.content?.menu ? this.header.content.menu : [];
    },
  },
  mounted() {
    this.setHeaderScripts();
  },
  updated() {
    this.setHeaderScripts();
  },
  methods: {
    setHeaderScripts() {
      if (this.$refs.menu) {
        if (!this.menuScriptIsSet) {
          this.menuScriptIsSet = menu();

          if (!this.menuScriptIsSet && !this.menuScriptInterval) {
            this.menuScriptInterval = setInterval(() => {
              this.menuScriptIsSet = menu();

              if (this.menuScriptIsSet) {
                clearInterval(this.menuScriptInterval);
              }
            }, 100);
          } else if (this.menuScriptIsSet && this.menuScriptInterval) {
            clearInterval(this.menuScriptInterval);
          }
        }

        if (!this.callUsScriptIsSet) {
          this.callUsScriptIsSet = callUs(this.$refs.menu);

          if (!this.callUsScriptIsSet && !this.callUsScriptInterval) {
            this.callUsScriptInterval = setInterval(() => {
              this.callUsScriptIsSet = callUs(this.$refs.menu);

              if (this.callUsScriptIsSet) {
                clearInterval(this.callUsScriptInterval);
              }
            }, 100);
          } else if (this.callUsScriptIsSet && this.callUsScriptInterval) {
            clearInterval(this.callUsScriptInterval);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/menu';
@import '~@/assets/scss/blocks/nav';
@import '~@/assets/scss/blocks/call';
@import '~@/assets/scss/blocks/phone';
</style>
