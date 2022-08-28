<template lang="pug">
ul(
  v-if='items.length > 0',
  :class='`services services--${this.modificatorArr[0]} ${this.sectionName}__services ${modificationClasses}`',
  ref='services'
)
  li.services__item(v-for='item in items', :key='item', :item='item')
    BaseService(:item='item', :modificator='modificator')

  li.services__item.services__item--worktime(v-if='additionalItem.worktime')
    BaseWorktime(
      sectionName='spa',
      modificator='tablet',
      :text='additionalItem.worktime'
    )
</template>

<script>
import { serviceAnimation } from '../../assets/js/gsap-animations';

import BaseService from './BaseService.vue';
import BaseWorktime from './BaseWorktime.vue';

export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    //modificator1,modificator2
    modificator: {
      type: String,
      required: true,
    },
    additionalItem: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      serviceAnimationIsSet: false,
    };
  },
  components: {
    BaseService,
    BaseWorktime,
  },
  computed: {
    modificatorArr() {
      return this.modificator.split(',');
    },
    modificationClasses() {
      const modificationClasses = this.modificatorArr
        .map((mod) => {
          return `${this.sectionName}__services--${mod}`;
        })
        .join(' ');

      return modificationClasses;
    },
  },
  mounted() {
    if (this.$refs.services && !this.serviceAnimationIsSet) {
      this.serviceAnimationIsSet = serviceAnimation.init(this.$refs.services);

      // console.log('Services Activated - mounted');
    }
  },
  updated() {
    if (this.$refs.services && !this.serviceAnimationIsSet) {
      this.serviceAnimationIsSet = serviceAnimation.init(this.$refs.services);

      // console.log('Services Activated - updated');
    }
  },
  unmounted() {
    serviceAnimation.reset();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/services';
</style>