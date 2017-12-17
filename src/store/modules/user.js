import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken, getUser, setUser} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    info: getUser()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const phone = userInfo.phone.trim()
      return new Promise((resolve, reject) => {
        login(phone, userInfo.password, userInfo.code).then(data => {
          setToken(data.token)
          let avatar = data.user.avatar
          let name = data.user.name
          let user = {
            roles: data.roles,
            name: name ? name.slice(-4) : data.user.phone.slice(-4),
            avatar: avatar ? avatar : 'static/avatar.png'
          }
          setUser(user)
          commit('SET_TOKEN', data.token)
          commit('SET_INFO', user)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
