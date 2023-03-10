import { createStore } from 'vuex';

export default createStore({
  state: {
    num: 0,
    focusNum: 0,
  },
  // 發送事件給 mutations
  action: {
    handNum(context) {
      context.commit('activeNum')
    }
  },
  // mutations 才可以修改資料
  mutations: {
    initNum(state) {
      state.num = 0;
    },
    activeNum(state, payload) {
      state.num = payload;
    },
  },
  getters: {
    num(state) {
      return state.num
    },
    focusNum(state) {
      return state.focusNum
    }
  }
})