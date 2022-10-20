<template lang="pug">
section#contacts(
  v-if='pageName && contacts',
  :class='`contacts contacts--${pageName}`',
  ref='section'
)
  div(
    :class='`container contacts__container contacts__container--${pageName}`'
  )
    .contacts__left
      h2.contacts__title.contacts__title--mobile(
        :class='`contacts__title--${pageName} ${pageName === "home" ? "title" : "title-inner"}`',
        ref='title1'
      )
        | {{ title }}
      TheMap

    div(:class='`contacts__content contacts__content--${pageName}`')
      h2.contacts__title.contacts__title--desktop(
        :class='`contacts__title--${pageName} ${pageName === "home" ? "title" : "title-inner"}`',
        ref='title2'
      )
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

      BaseButton(
        v-if='book',
        sectionName='contacts',
        :modificator='`${pageName}`',
        :button='book'
      )
</template>

<script>
import { mapGetters } from 'vuex';

import {
  contactsAnimation,
  sectionTitleAnimation,
  DEVICE_WIDTH,
  TABLET_WIDTH,
  DESKTOP_WIDTH,
} from '@/assets/js/modules/gsap-animations';

import checkUrlType from '@/mixins/checkUrlType';

import TheMap from '@/components/blocks/TheMap.vue';

export default {
  components: {
    TheMap,
  },
  mixins: [checkUrlType],
  data() {
    return {
      sectionTitleAnimationIsSet: false,
      contactsAnimationInited: false,
    };
  },
  computed: {
    ...mapGetters(['pageName', 'contacts', 'routeChanged']),
    title() {
      if (this.contacts.content?.title) {
        return this.contacts.content.title;
      }

      return 'Contacts';
    },
    columns() {
      if (this.contacts.content?.columns) {
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
      return this.contacts.content?.book ? this.contacts.content.book : null;
    },
  },
  watch: {
    async routeChanged() {
      await this.setContactsAnimation();
    },
  },
  async mounted() {
    await this.setContactsAnimation();
  },
  async updated() {
    await this.setContactsAnimation();
  },
  async beforeUnmount() {
    await contactsAnimation.reset();
  },
  methods: {
    async setContactsAnimation() {
      if (this.routeChanged && this.$refs.section) {
        if (!this.contactsAnimationInited) {
          this.contactsAnimationInited = await contactsAnimation.init(
            this.$refs.section
          );
        }

        if (
          this.$refs.title1 &&
          this.$refs.title2 &&
          !this.sectionTitleAnimationIsSet
        ) {
          if (DEVICE_WIDTH >= TABLET_WIDTH && DEVICE_WIDTH < DESKTOP_WIDTH) {
            this.sectionTitleAnimationIsSet = await sectionTitleAnimation(
              this.$refs.title1,
              this.$refs.section
            );
          } else if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
            this.sectionTitleAnimationIsSet = await sectionTitleAnimation(
              this.$refs.title2,
              this.$refs.section
            );
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/contacts';
</style>