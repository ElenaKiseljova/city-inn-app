import { sectionAnimation } from "@/assets/js/gsap-animations";

export default {
  data() {
    return {
      sectionAnimationIsSet: false,
    };
  },
  mounted() {
    this.setAnimations();
  },
  updated() {
    this.setAnimations();
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
};