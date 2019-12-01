import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nm: localStorage.getItem("nowNm") || "深圳",
    id: localStorage.getItem("nowId") || "30"
  },
  mutations: {
    CHANGE_CITY(state, payload) {
      state.nm = payload.nm;
      state.id = payload.id;
    }
  },
  actions: {
    changeCity({ commit }, payload) {
      console.log(payload);
      commit("CHANGE_CITY", payload);
    }
  },
  modules: {}
});
