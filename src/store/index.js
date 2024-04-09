import { createStore } from 'vuex'
import { getinfo, login } from '~/api/manager'
import { removeToken, setToken } from '~/utils/auth'

const store = createStore({
  state() {
    return {
      // 用户信息
      user: {},
      // 侧边宽度
      asideWidth: '250px',
      menus: [],
      ruleNames: []
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      state.user = user
    },
    // 展开/缩起侧边
    HANDLE_ASIDE_WIDTH(state) {
      state.asideWidth = state.asideWidth == '250px' ? '64px' : '250px'
    },
    SET_MENUS(state, menus) {
      state.menus = menus
    },
    SET_RULE_NAMES(state, ruleNames) {
      state.ruleNames = ruleNames
    }
  },
  actions: {
    // 登录
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res) => {
            setToken(res.token)
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    // 获取当前用户信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo()
          .then((res) => {
            commit('SET_USERINFO', res)
            commit('SET_MENUS', res.menus)
            commit('SET_RULE_NAMES', res.ruleNames)
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    // 退出登录
    logout({ commit }) {
      // 移除token
      removeToken()
      // 清楚当前用户状态
      commit('SET_USERINFO', {})
    }
  }
})

export default store
