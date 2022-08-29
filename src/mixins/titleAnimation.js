import { sectionTitleAnimation } from "@/assets/js/gsap-animations";

export default {
  data() {
    return {
      sectionTitleAnimationIsSet: false,
    };
  },
  methods: {
    setTitleAnimation() {
      if (
        this.$refs.title &&
        this.$refs.section &&
        !this.sectionTitleAnimationIsSet
      ) {
        this.sectionTitleAnimationIsSet = sectionTitleAnimation(
          this.$refs.title,
          this.$refs.section
        );
      }
    },
  },
  mounted() {
    this.setTitleAnimation();
  },
  updated() {
    this.setTitleAnimation();
  },
};