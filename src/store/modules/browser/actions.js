export default {
  async setBrowser(context, payload) {
    await context.commit('setBrowser', payload);
  },
};