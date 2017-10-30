import fetch from '@/utils/fetch'

export function captcha(phone) {
  return fetch({
    url: '/user/captcha',
    method: 'post',
    data: {
      phone
    }
  })
}

export function login(phone, password) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      phone,
      password
    }
  })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}
