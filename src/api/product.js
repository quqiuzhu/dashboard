import fetch from '@/utils/fetch'

export function products(params) {
  return fetch({
    url: '/products',
    method: 'get',
    params: params
  })
}

export function addProduct(product) {
  return fetch({
    url: '/products',
    method: 'post',
    data: product
  })
}

export function updateProduct(id, product) {
  return fetch({
    url: '/product/'+id,
    method: 'put',
    data: product
  })
}

export function removeProduct(id) {
  return fetch({
    url: '/product/'+id,
    method: 'delete'
  })
}
