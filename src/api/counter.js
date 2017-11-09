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

export function orders(params) {
  return fetch({
    url: '/counter/orders',
    method: 'get',
    params: params
  })
}

export function updateOrderPrice(id, order) {
  return fetch({
    url: '/order/'+id,
    method: 'put',
    data: order
  })
}
