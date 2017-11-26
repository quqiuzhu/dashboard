import fetch from '@/utils/fetch'

export function servers(params) {
  return fetch({
    url: '/servers',
    method: 'get',
    params: params
  })
}

export function addServer(server) {
  return fetch({
    url: '/servers',
    method: 'post',
    data: server
  })
}

export function updateServer(id, server) {
  return fetch({
    url: '/server/' + id,
    method: 'put',
    data: server
  })
}

export function onlineServer(id) {
  return fetch({
    url: '/server/' + id + '/online',
    method: 'post',
    data: {
      'id': id
    }
  })
}

export function batchOnlineServers(ids) {
  return fetch({
    url: '/servers/online',
    method: 'post',
    data: {
      'ids': ids
    }
  })
}

export function offlineServer(id) {
  return fetch({
    url: '/server/' + id + '/offline',
    method: 'post',
    data: {
      'id': id
    }
  })
}

export function batchOfflineServers(ids) {
  return fetch({
    url: '/servers/offline',
    method: 'post',
    data: {
      'ids': ids
    }
  })
}

export function removeServer(id) {
  return fetch({
    url: '/server/' + id,
    method: 'delete',
    data: {
      'id': id
    }
  })
}

export function batchRemoveServers(ids) {
  return fetch({
    url: '/servers',
    method: 'delete',
    data: {
      'ids': ids
    }
  })
}

export function assginServer(id, uid) {
  return fetch({
    url: '/server/' + id + '/assgin',
    method: 'post',
    data: {
      'uid': uid
    }
  })
}
