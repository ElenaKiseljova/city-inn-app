export default {
  incrementImages(state) {
    state.images++;
  },
  decrementImages(state) {
    if (state.images > 0) state.images--;
  },
};