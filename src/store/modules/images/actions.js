export default {
  incrementImages(context, payload) {
    context.commit('incrementImages', payload);
  },
  decrementImages(context, payload) {
    context.commit('decrementImages', payload);
  },
};