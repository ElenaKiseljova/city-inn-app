import { imageBgAnimation } from '@/assets/js/modules/gsap-animations';

export default {
  data() {
    return {
      imageBgAnimationIsSet: false,
    };
  },
  mounted() {
    this.setImageBgAnimation();
  },
  updated() {
    this.setImageBgAnimation();
  },
  methods: {
    setImageBgAnimation() {
      if (
        this.$refs.section &&
        !this.imageBgAnimationIsSet
      ) {
        this.imageBgAnimationIsSet = imageBgAnimation(
          this.$refs.section
        );
      }
    },
  },
};