export default {
  methods: {
    checkUrlType(url) {
      if (url === '') {
        return 'text';
      }

      if (url.includes("http") || url.includes("tel:") || url.includes("mailto:")) {
        return 'link';
      }

      return 'route';
    },
  },
};