<template>
  <div>
    <TheHeader />

    <router-view v-slot="slotProps">
      <transition name="rout" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>

    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/general/fonts';
@import '~@/assets/scss/general/normalize';
@import '~@/assets/scss/general/global';
@import '~@/assets/scss/general/visually-hidden';

@import '~@/assets/scss/layout/container';

@import '~@/assets/scss/blocks/title';
@import '~@/assets/scss/blocks/title-inner';

.rout-enter-from {
  opacity: 0.5;
  transform: translateY(-30px);
}

.rout-leave-to {
  opacity: 0.5;
  transform: translateY(-30px);
}

.rout-enter-active {
  transition: all 0.3s ease-out;
}

.rout-leave-active {
  transition: all 0.3s ease-in;
}

.rout-enter-to,
.rout-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
