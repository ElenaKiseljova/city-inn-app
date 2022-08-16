<template>
  <div>
    <TheHeader />

    <TheMain>
      <router-view v-slot="slotProps">
        <transition name="rout" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
      <router-link class="test-link" to="/en">English version</router-link>
    </TheMain>

    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheMain from './components/layout/TheMain.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
};
</script>

<style lang="scss">
.test-link {
  position: fixed;

  top: 50%;
  left: 50%;

  z-index: 100;

  height: 50vw;
}

.rout-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.rout-leave-to {
  opacity: 0;
  transform: translateY(30px);
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
