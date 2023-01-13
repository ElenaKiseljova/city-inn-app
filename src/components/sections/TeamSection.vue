<template lang="pug">
section.team.dooble(
  v-if='page && pageName && sections && section && slides',
  ref='section'
)
  .team__container.container
    header.team__header
      p(
        :class='`team__subtitle team__subtitle--${pageName}`',
        v-if='subTitle',
        v-html='subTitle'
      )

      h2.title-inner.team__title(v-if='title', v-html='title', ref='title')

      BaseNavigation(:swiperIndex="swiperIndex", sectionName='team', :modificator='pageName')
      BasePagination(:swiperIndex="swiperIndex", sectionName='team', :modificator='pageName')

    .team__slider-container(v-if='slides.length > 0')
      SwiperSlider(
        :class="`team__slider team__slider--images team__slider--${pageName} dooble__slider dooble__slider--images`"
        :modules="modules"
        :slides-per-view="swiperOptions.slidesPerView",
        :space-between="swiperOptions.spaceBetween",
        :resize-observer="swiperOptions.resizeObserver",
        :speed="swiperOptions.speed",
        :navigation="swiperNavigation",
        :pagination="swiperPagination",
        :controller="{ control: textSwiper }",
        :loop="swiperOptions.loop",
        @swiper="setSwiper"
        @beforeTransitionStart="onBeforeTransitionStart"
      )
        SwiperSlide(
          v-for='slide in slides',
          :key='slide.title',
          :class="`team__slide team__slide--images team__slide--${pageName} ${slideClass}`",
          @click="slideChange"
        )
          .team__top
            BaseImage(
              sectionName='team',
              :modificator='pageName',
              :image='slide.image',
              alt='img'
            ) 

          .team__bottom.team__bottom--desktop
            h3.team__name(v-if='slide.title && slide.title !== ""')
              | {{ slide.title }}

            p.team__position(
              v-if='slide.description && slide.description !== ""'
            )
              | {{ slide.description }}

            template(v-if='slide.contacts && slide.contacts.length > 0')
              a.team__mail(
                v-for='contact in slide.contacts',
                :key='contact.link',
                :href='contact.link'
              )
                | {{ contact.text }}

      SwiperSlider(
        v-if='slides?.length > 0', 
        :class="`team__slider team__slider--text team__slider--${pageName} dooble__slider dooble__slider--text`"
        :modules="modules"
        :slides-per-view="swiperTextOptions.slidesPerView",
        :space-between="swiperTextOptions.spaceBetween",
        :resize-observer="swiperTextOptions.resizeObserver",
        :speed="swiperTextOptions.speed",
        :controller="{ control: swiper }",
        :effect="swiperTextOptions.effect",
        :fadeEffect="{crossFade: true}",
        :loop="swiperTextOptions.loop",
        :parallax="swiperTextOptions.parallax",
        @swiper="setTextSwiper"
      )
        SwiperSlide(
          v-for='slide in slides',
          :key='slide.title',
          :class="`team__slide team__slide--text team__slide--${pageName}`"
        )

          .dooble__content(data-swiper-parallax-opacity="-1")
            .team__bottom.team__bottom--mobile
              h3.team__name(v-if='slide.title && slide.title !== ""')
                | {{ slide.title }}

              p.team__position(
                v-if='slide.description && slide.description !== ""'
              )
                | {{ slide.description }}

              template(v-if='slide.contacts && slide.contacts.length > 0')
                a.team__mail(
                  v-for='contact in slide.contacts',
                  :key='contact.link',
                  :href='contact.link'
                )
                  | {{ contact.text }}

</template>

<script>
import { mapGetters } from 'vuex';

import titleAnimation from '@/mixins/titleAnimation';
import converteSymbolsNewLineToBr from '@/mixins/converteSymbolsNewLineToBr';
import swiperSliderInit from '@/mixins/swiperSliderInit';

export default {
  mixins: [titleAnimation, converteSymbolsNewLineToBr, swiperSliderInit],
  data() {
    return {
      sectionName: 'team',
    };
  },
  computed: {
    ...mapGetters(['page', 'pageName']),
    sections() {
      return this.page?.content && this.page.content?.sections
        ? this.page.content.sections
        : [];
    },
    section() {
      if (this.pageName === 'conference') {
        return this.sections && this.sections[7] ? this.sections[7] : null;
      }

      if (this.pageName === 'group') {
        return this.sections && this.sections[5] ? this.sections[5] : null;
      }

      return null;
    },
    title() {
      return this.section?.title && this.section.title !== ''
        ? this.converteSymbolsNewLineToBr(this.section.title)
        : null;
    },
    subTitle() {
      return this.section?.subTitle && this.section.subTitle !== ''
        ? this.converteSymbolsNewLineToBr(this.section.subTitle)
        : null;
    },
    slides() {
      return this.section?.slides ? this.section.slides : null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/blocks/team';
</style>
