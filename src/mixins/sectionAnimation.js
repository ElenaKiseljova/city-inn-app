import { sectionAnimation } from "@/assets/js/gsap-animations";

export default {
  data() {
    return {
      sectionAnimationIsSet: false,
    };
  },
  methods: {
    setAnimations() {
      if (this.$refs.section) {
        if (!this.sectionAnimationIsSet) {
          this.sectionAnimationIsSet = sectionAnimation(
            this.$refs.section,
            this.$refs.section
          );
        }
      }
    },
  },
  mounted() {
    this.setAnimations();
  },
  updated() {
    this.setAnimations();
  },
};