import fetch from '@/utils/fetch'

export function users(params) {
  return fetch({
    url: '/users',
    method: 'get',
    params: params
  })
}

export function addUser(user) {
  return fetch({
    url: '/users',
    method: 'post',
    data: user
  })
}

export function user(id) {
  return fetch({
    url: '/user/'+id,
    method: 'get'
  })
}

export function updateUser(id, user) {
  return fetch({
    url: '/user/'+id,
    method: 'put',
    data: user
  })
}

export function removeUser(id) {
  return fetch({
    url: '/user/'+id,
    method: 'delete'
  })
}

export function batchRemoveUser(ids) {
  return fetch({
    url: '/users',
    method: 'delete',
    data: {
      ids: ids
    }
  })
}

export function updateMember(uid, days) {
  return fetch({
    url: '/user/'+uid+'/member',
    method: 'put',
    data: {
      days: days
    }
  })
}

export function updatePassword(uid, password) {
  return fetch({
    url: '/user/'+uid+'/password',
    method: 'put',
    data: {
      password: password
    }
  })
}
