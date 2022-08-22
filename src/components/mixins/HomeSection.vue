<template lang="pug">
//- - const sectionName = attr.sectionName ?? 'smart';

//- - const title = attr.title ?? '';
//- - const contentTop = attr.contentTop ?? '';
//- - const contentBottom = attr.contentBottom ?? '';

//- - const more = attr.more ?? {};
//- - const book = attr.book ?? {};

//- - const imageName = attr.image ?? 'smart';//в проде тут будет объект
//-   //- image: {
//-   //-     webp: {
//-   //-       mobile: '',
//-   //- tablet: '',
//-   //- desktop: '',
//-   //-     },
//-   //-     jpg: {
//-   //-       mobile: '',
//-   //- tablet: '',
//-   //- desktop: '',
//-   //-     },
//-   //-   },
//- - const worktime = attr.worktime ?? '';

section(
  v-if='section',
  :class='`home home--${sectionName}`',
  :id='sectionName'
)
  div(:class='`home__container container home__container--${sectionName}`')
    div(:class='`home__top home__top--${sectionName}`')
      h2(
        v-html='title',
        :class='`home__title home__title--mobile title home__title--${sectionName}`'
      )

      div(:class='`home__img-wrapper home__img-wrapper--${sectionName}`')
        BaseImage(
          sectionName='home',
          :modificator='sectionName',
          :image='section.image'
        )

    div(:class='`home__bottom home__bottom--${sectionName}`')
      h2(
        v-html='title',
        :class='` home__title home__title--desktop title home__title--${sectionName}`'
      )

      div(:class='`home__content home__content--${sectionName}`')
        p(:class='`home__text home__text--top home__text--${sectionName}`')
          | {{ section.contentTop }}

        p(:class='`home__text home__text--bottom home__text--${sectionName}`')
          | {{ section.contentBottom }}

      div(:class='`home__buttons home__buttons--${sectionName}`')
        WorktimeInfo(
          v-if='section.worktime && section.worktime !== ""',
          sectionName='home',
          :modificator='sectionName',
          :text='section.worktime'
        )

        a(
          v-if='more && more.link !== "" && more.link.includes("http") && more.link.includes("tel:") && more.link.includes("mailto:")',
          :class='`button home__button home__button--more home__button--${sectionName}`',
          :href='more.link'
        )
          span {{ more.title }}

        router-link(
          v-else-if='more',
          :class='`button home__button home__button--more home__button--${sectionName}`',
          :to='more.link'
        )
          span {{ more.title }}

        a(
          v-if='book',
          :class='`button home__button home__button--book-now home__button--${sectionName}`',
          :href='book.link'
        )
          span {{ book.title }}
</template>

<script>
import BaseImage from './BaseImage.vue';
import WorktimeInfo from './WorktimeInfo.vue';

export default {
  props: {
    sectionName: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseImage,
    WorktimeInfo,
  },
  computed: {
    pageName() {
      return this.$store.getters.pageName;
    },
    page() {
      return this.$store.getters.page || {};
    },
    sections() {
      return this.page.content.sections;
    },
    section() {
      return this.sections.find(
        (section) => section.sectionName === this.sectionName
      );
    },
    title() {
      return this.section.title.replace(/\r\n/g, '<br />');
    },
    more() {
      const moreButton = this.section.more;

      if (
        moreButton &&
        moreButton.link &&
        moreButton.link !== '' &&
        moreButton.title &&
        moreButton.title !== ''
      ) {
        return moreButton;
      }

      return null;
    },
    book() {
      const bookButton = this.section.book;

      if (
        bookButton &&
        bookButton.link &&
        bookButton.link !== '' &&
        bookButton.title &&
        bookButton.title !== ''
      ) {
        return bookButton;
      }

      return null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/home';
</style>