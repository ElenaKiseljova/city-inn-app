import { mapGetters } from 'vuex';

import { sectionTitleAnimation } from '@/assets/js/modules/gsap-animations';

export default {
  data() {
    return {
      sectionTitleAnimationIsSet: false,
    };
  },
  computed: {
    ...mapGetters({
      pageAllImages: 'images',
    }),
  },
  watch: {
    pageAllImages() {
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
        this.pageAllImages === 0 &&
        (this.$refs.title || this.$refs.titleMobile) &&
        this.$refs.section &&
        !this.sectionTitleAnimationIsSet
      ) {
        console.log(this.$refs.title, this.$refs.title?.length);
        console.log(this.$refs.titleMobile, this.$refs.titleMobile?.length);
        console.log(this.$refs.section, this.$refs.section?.length);

        if (this.$refs.title?.length && this.$refs.titleMobile?.length && this.$refs.section?.length) {
          this.$refs.section.forEach((s, i) => {
            const titles = [];

            titles.push(this.$refs.title[i]);
            titles.push(this.$refs.titleMobile[i]);

            sectionTitleAnimation({ titles, trigger: s });
          });
        } else if (this.$refs.title?.length && this.$refs.section?.length) {
          this.$refs.section.forEach((s, i) => {
            sectionTitleAnimation({ title: this.$refs.title[i], trigger: s });
          });
        } else if (this.$refs.title && this.$refs.titleMobile) {
          const titles = [];

          titles.push(this.$refs.title);
          titles.push(this.$refs.titleMobile);

          sectionTitleAnimation({ titles, trigger: this.$refs.section });
        } else if (this.$refs.title) {
          sectionTitleAnimation({ title: this.$refs.title, trigger: this.$refs.section });
        }

        this.sectionTitleAnimationIsSet = true;
      }
    },
  },
};