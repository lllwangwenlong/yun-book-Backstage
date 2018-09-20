import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userInfo: {
      username: '',
      nickname: '',
      email: '',
      avatar: '',
      desc: ''
    }
  },
  mutations: {
    CHANGE_USERINFO (state, userInfo) {
      state.userInfo= userInfo
    }
  },
  actions: {},
  plugins: [createPersistedState({
    storage: {
      getItem: key => sessionStorage.getItem(key),
      setItem: (key, value) =>
        sessionStorage.setItem(key, value),
      removeItem: key => sessionStorage.removeItem(key),
    },
  })]
})

export default store
