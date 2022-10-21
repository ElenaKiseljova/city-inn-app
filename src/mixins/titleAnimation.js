import { mapGetters } from 'vuex';

import { sectionTitleAnimation } from '@/assets/js/modules/gsap-animations';

export default {
  data() {
    return {
      sectionTitleAnimationIsSet: false,
    };
  },
  computed: {
    ...mapGetters(['images']),
  },
  watch: {
    images() {
      this.setTitleAnimation();
    },
  },
  mounted() {
    this.setTitleAnimation();
  },
  updated() {
    this.setTitleAnimation();
  },
  methods: {
    setTitleAnimation() {
      if (
        this.images === 0 &&
        (this.$refs.title || this.$refs.titleMobile) &&
        this.$refs.section &&
        !this.sectionTitleAnimationIsSet
      ) {
        const titles = [];
        if (this.$refs.title) {
          titles.push(this.$refs.title);
        }
        if (this.$refs.titleMobile) {
          titles.push(this.$refs.titleMobile);
        }
        sectionTitleAnimation(
          titles,
          this.$refs.section
        );

        this.sectionTitleAnimationIsSet = true;
      }
    },
  },
};