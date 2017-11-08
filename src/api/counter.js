import fetch from '@/utils/fetch'

export function buy(type) {
  return fetch({
    url: '/counter/buy',
    method: 'post',
    data: {
      package: type
    }
  })
}
