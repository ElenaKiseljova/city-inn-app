<template lang="pug">
ul(v-if='items.length > 0', :class='listClasses')
  ServicesItem(v-for='item in items', :item='item', :modificator='modificator')

  li.services__item.services__item--worktime(v-if='additionalItem.worktime')
    WorktimeInfo(
      sectionName='spa',
      modificator='tablet',
      :text='additionalItem.worktime'
    )
</template>

<script>
import ServicesItem from './ServicesItem.vue';
import WorktimeInfo from './WorktimeInfo.vue';

export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    oddEvenLast: {
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
    modificator: {
      type: String,
      required: true,
    },
    additionalModificator: {
      type: String,
      required: false,
      default: null,
    },
    additionalItem: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  components: {
    ServicesItem,
    WorktimeInfo,
  },
  computed: {
    additionalListModificator() {
      return this.additionalModificator
        ? `${this.sectionName}__services--${this.additionalModificator}`
        : '';
    },
    listClasses() {
      return `${this.sectionName}__services ${this.sectionName}__services--${this.modificator} ${this.additionalListModificator} services services--${this.modificator}`;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/services';
</style>