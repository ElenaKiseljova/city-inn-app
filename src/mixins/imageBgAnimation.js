import { imageBgAnimation } from '@/assets/js/modules/gsap-animations';

export default {
  data() {
    return {
      imageBgAnimationIsSet: false,
      imageBgAnimationInterval: null,
    };
  },
  computed: {
    section() {
      return this.$refs.section;
    },
  },
  whatch: {
    section() {
      console.log('section');
    },
  },
  mounted() {
    this.setImageBgAnimation();
  },
  updated() {
    this.setImageBgAnimation();
  },
  methods: {
    setImageBgAnimation() {
      if (this.$refs.section && !this.imageBgAnimationIsSet) {
        this.imageBgAnimationIsSet = imageBgAnimation(this.$refs.section);

        if (!this.imageBgAnimationIsSet && !this.imageBgAnimationInterval) {
          this.imageBgAnimationInterval = setInterval(() => {
            this.imageBgAnimationIsSet = imageBgAnimation(this.$refs.section);

            if (this.imageBgAnimationIsSet) {
              clearInterval(this.imageBgAnimationInterval);
            }
          }, 100);
        } else if (
          this.imageBgAnimationIsSet &&
          this.imageBgAnimationInterval
        ) {
          clearInterval(this.imageBgAnimationInterval);
        }
      }
    },
  },
};
