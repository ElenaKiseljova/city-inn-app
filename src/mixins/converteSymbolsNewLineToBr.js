export default {
  methods: {
    converteSymbolsNewLineToBr(text) {
      return text ? text.replace(/\r\n/g, '<br />') : '';
    },
  },
};