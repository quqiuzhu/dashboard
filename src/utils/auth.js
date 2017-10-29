import Cookies from 'js-cookie'

const TokenKey = 'token-for-ticks'
const UserKey = 'user-for-ticks'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  return Cookies.getJSON(UserKey)
}

export function setUser(token) {
  return Cookies.set(UserKey, token)
}

export function removeUser() {
  return Cookies.remove(UserKey)
}
