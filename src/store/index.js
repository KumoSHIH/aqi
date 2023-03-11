import { createStore } from 'vuex';

export default createStore({
  state: {
    num: 0,
    focusNum: 0,
  },
  // 發送事件給 mutations
  action: {
    selectNumHand(context) {
      context.commit("SELECT_ACTIVE_NUM");
    },
    focusNumHand(context) {
      context.commit("FOCUS_ACTIVE_NUM");
    },
  },
  // mutations 才可以修改資料
  mutations: {
    INIT_NUM(state) {
      state.num = 0;
    },
    SELECT_ACTIVE_NUM(state, payload) {
      state.num = payload;
    },
    FOCUS_ACTIVE_NUM(state, payload) {
      state.focusNum = payload;
    },
  },
  getters: {
    num(state) {
      return state.num;
    },
    focusNum(state) {
      return state.focusNum;
    },
  },
});
