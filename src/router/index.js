import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

import { getToken } from '../utils/auth'
import Structure from '../views/home/Structure'

Vue.use(Router)

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will not redirct in the levelbar
* noDropdown : if `noDropdown:true` will not has submenu in the sidebar
* meta : `{ role: ['admin'] }`  will control the page role
**/
export const constantRouterMap = [
  { path: '/login', component: _import('common/login'), hidden: true },
  { path: '/404', component: _import('common/404'), hidden: true },
  { path: '/buy/:type', component: _import('common/buy'), hidden: true },
  // {
  //   path: '/dashboard',
  //   component: Structure,
  //   redirect: 'dashboard/',
  //   icon: 'fa fa-bar-chart icon',
  //   noDropdown: true,
  //   children: [{
  //     path: '',
  //     name: '数据统计',
  //     component: _import('dashboard/index')
  //   }]
  // },

  {
    path: '/users',
    component: Structure,
    redirect: '/users/',
    icon: 'fa fa-users icon',
    noDropdown: true,
    children: [{
      path: '',
      name: '用户管理',
      component: _import('user/index'),
      meta: { role: ['admin'] }
    }]
  },

  {
    path: '/servers',
    component: Structure,
    redirect: '/servers/',
    icon: 'fa fa-heart icon',
    noDropdown: true,
    children: [{
      path: '',
      name: '服务管理',
      component: _import('server/index'),
      meta: { role: ['admin'] }
    },{
      path: ':id',
      name: '服务账号',
      component: _import('server/item'),
      meta: { role: ['admin'] }
    }]
  },

  {
    path: '/products',
    component: Structure,
    redirect: '/products/',
    icon: 'fa fa-shopping-bag icon',
    noDropdown: true,
    children: [{
      path: '',
      name: '套餐管理',
      component: _import('product/index'),
      meta: { role: ['admin'] }
    }]
  },

  {
    path: '/orders',
    component: Structure,
    redirect: '/orders/',
    icon: 'fa fa-list-alt icon',
    noDropdown: true,
    children: [{
      path: '',
      name: '订单管理',
      component: _import('order/index'),
      meta: { role: ['admin'] }
    }]
  },

  { path: '/', redirect: '/users', hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const whiteList = ['/login'] //不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
