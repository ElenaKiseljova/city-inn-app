import meta from "@/assets/js/modules/meta";

export default {
  async setMeta(context, payload) {
    context.commit('setMeta', payload);

    await meta(context.getters.meta);
  },
};