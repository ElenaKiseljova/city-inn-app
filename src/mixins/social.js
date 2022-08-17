export default {
  computed: {
    social() {
      if (
        this.header.content &&
        this.header.content.social &&
        this.header.content.address
      ) {
        const address = this.header.content.address;

        const social = [address, ...this.header.content.social];

        return social;
      }

      return [];
    },
  },
};