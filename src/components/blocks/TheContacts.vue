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
                v-if='item.link === ""'
              )
                | {{ item.text }}

              a(
                :class='`contacts__link contacts__link--${pageName}`',
                v-else-if='item.link !== "" && item.link.includes("http") && item.link.includes("tel:") && item.link.includes("mailto:")',
                :href='item.link'
              )
                | {{ item.text }}

              router-link(
                :class='`contacts__link contacts__link--${pageName}`',
                v-else,
                :to='item.link'
              )
                | {{ item.text }}

      a(
        v-if='book',
        :class='`contacts__button button contacts__button--${pageName}`',
        :href='book.link'
      )
        span {{ book.title }}
</template>

<script>
import TheMap from './TheMap.vue';

export default {
  components: {
    TheMap,
  },
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    contacts() {
      return this.$store.getters.contacts;
    },
    title() {
      if (this.contacts.content && this.contacts.content.title) {
        return this.contacts.content.title;
      }

      return 'Contacts';
    },
    columns() {
      if (this.contacts.content && this.contacts.content.columns) {
        return this.contacts.content.columns;
      }

      return [];
    },
    book() {
      if (this.contacts.content && this.contacts.content.book) {
        return this.contacts.content.book;
      }

      return null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/contacts';
</style>