<template lang="pug">
a(
  v-if='buttonWithType?.type === "link"',
  :class='`${sectionName}__${sectionElementName} button ${modificationClasses}`',
  :href='buttonWithType.link',
  target='_blank'
)
  span
    | {{ buttonWithType.text || buttonWithType.title }}

router-link(
  v-else-if='buttonWithType?.type === "route"',
  :class='`${sectionName}__${sectionElementName} button ${modificationClasses}`',
  :to='buttonWithType.link'
)
  span
    | {{ buttonWithType.text || buttonWithType.title }}
</template>

<script>
import checkUrlType from '../../mixins/checkUrlType';

export default {
  mixins: [checkUrlType],
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    sectionElementName: {
      type: String,
      required: false,
      default: 'button',
    },
    //modificator1,modificator2
    modificator: {
      type: String,
      required: true,
    },
    button: {
      type: Object,
      required: true,
    },
  },
  computed: {
    buttonWithType() {
      const button = this.button ?? null;

      if (
        button?.link &&
        button.link !== '' &&
        ((button?.text && button.text !== '') ||
          (button?.title && button.title !== ''))
      ) {
        return { ...button, type: this.checkUrlType(button.link) };
      }

      return null;
    },
    modificationClasses() {
      const modificatorArr = this.modificator
        .split(',')
        .map((mod) => {
          return `${this.sectionName}__${this.sectionElementName}--${mod}`;
        })
        .join(' ');

      return modificatorArr;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/button';
</style>