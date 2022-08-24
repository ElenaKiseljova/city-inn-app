<template lang="pug">
section#contacts(:class='`contacts contacts--${pageName}`')
  div(
    :class='`container contacts__container contacts__container--${pageName}`'
  )
    .contacts__left
      h2.contacts__title.contacts__title--mobile.title.title--light-green
        | {{ title }}
      TheMap

    div(:class='`contacts__content contacts__content--${pageName}`')
      h2.contacts__title.contacts__title--desktop.title.title--light-green
        | {{ title }}

      address(:class='`contacts__address contacts__address--${pageName}`')
        ul(:class='`contacts__list contacts__list--${pageName}`')
          li(
            :class='`contacts__item contacts__item--${pageName}`',
            v-for='(column, index) in columns'
          )
            h4(:class='`contacts__subtitle contacts__subtitle--${pageName}`')
              | {{ column.title }}

            template(v-for='item in column.items')
              p(
                :class='`contacts__text contacts__text--${pageName}`',
                v-if='item.type === "text"'
              )
                | {{ item.text }}

              a(
                :class='`contacts__link contacts__link--${pageName}`',
                v-else-if='item.type === "link"',
                :href='item.link'
              )
                | {{ item.text }}

              router-link(
                :class='`contacts__link contacts__link--${pageName}`',
                v-else-if='item.type === "route"',
                :to='item.link'
              )
                | {{ item.text }}

      a(
        v-if='book && book.type === "link"',
        :class='`contacts__button button contacts__button--${pageName}`',
        :href='book.link'
      )
        span {{ book.title }}

      router-link(
        v-if='book && book.type === "route"',
        :class='`contacts__button button contacts__button--${pageName}`',
        :to='book.link'
      )
        span {{ book.title }}
</template>

<script>
import checkUrlType from '../../mixins/checkUrlType';

import TheMap from './TheMap.vue';

export default {
  mixins: [checkUrlType],
  components: {
    TheMap,
  },
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    contacts() {
      return this.$store.getters.contacts || {};
    },
    title() {
      if (this.contacts.content && this.contacts.content.title) {
        return this.contacts.content.title;
      }

      return 'Contacts';
    },
    columns() {
      if (this.contacts.content && this.contacts.content.columns) {
        const columnsWithType = this.contacts.content.columns.map((column) => {
          const items = column.items || [];

          items.forEach((item) => {
            item.type = this.checkUrlType(item.link);
          });

          return column;
        });

        return columnsWithType;
      }

      return [];
    },
    book() {
      const bookButton =
        this.contacts.content && this.contacts.content.book
          ? this.contacts.content.book
          : {};

      if (
        bookButton &&
        bookButton.link &&
        bookButton.link !== '' &&
        bookButton.title &&
        bookButton.title !== ''
      ) {
        return { ...bookButton, type: this.checkUrlType(bookButton.link) };
      }

      return null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/contacts';
</style>