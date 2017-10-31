const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.info.avatar,
  name: state => state.user.info.name,
  roles: state => state.user.info.roles
}
export default getters
