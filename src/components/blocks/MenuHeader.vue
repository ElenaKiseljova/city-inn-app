<template lang="pug">
.menu(v-if='header')
  .menu__container.container
    .menu__nav
      NavigationHeader(:items='navigationList')

    .menu__bottom
      .menu__social
        SocialList(:items='social', direction='horizontal')

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

import { callUs } from '../../assets/js/call-us';
import menu from '../../assets/js/menu';

import social from '../../mixins/social';

import SocialList from './SocialList.vue';
import NavigationHeader from './NavigationHeader.vue';
import BaseImage from '../UI/BaseImage.vue';

export default {
  components: {
    NavigationHeader,
    SocialList,
    BaseImage,
  },
  mixins: [social],
  data() {
    return {
      headerIsReady: false,
    };
  },
  methods: {
    scriptsInit() {
      if (!this.headerIsReady) {
        const scriptsInited = callUs() && menu();

        this.headerIsReady = scriptsInited;
      }
    },
  },
  computed: {
    ...mapGetters(['header']),
    callUs() {
      return this.header.content && this.header.content.call
        ? this.header.content.call
        : {};
    },
    navigationList() {
      return this.header.content && this.header.content.menu
        ? this.header.content.menu
        : [];
    },
  },
  mounted() {
    this.scriptsInit();
  },
  updated() {
    this.scriptsInit();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/menu';
@import '~@/assets/scss/blocks/nav';
@import '~@/assets/scss/blocks/call';
</style>