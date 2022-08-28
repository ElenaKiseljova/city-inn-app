<template lang="pug">
TheMain
  ThePromo
  InfoSection(sectionName='standart-info')
  FeaturesSection
  GallerySection
  WarmSection
</template>

<script>
import footerGsapAnimations from '../mixins/footerGsapAnimations';

import TheMain from '../components/layout/TheMain.vue';
import ThePromo from '../components/sections/ThePromo.vue';
import InfoSection from '@/components/sections/InfoSection.vue';
import FeaturesSection from './rooms-item/FeaturesSection.vue';
import GallerySection from './rooms-item/GallerySection.vue';
import WarmSection from './rooms-item/WarmSection.vue';

export default {
  components: {
    TheMain,
    ThePromo,
    InfoSection,
    FeaturesSection,
    GallerySection,
    WarmSection,
  },
  mixins: [footerGsapAnimations],
};
</script>

