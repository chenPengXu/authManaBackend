const RouteConfigObj = {
  User: {
    path: '/user',
    meta: {
      pType: '1', // 目录类型
      menu: '权限管理', // 有menu则显示为菜单
      sort: 100
    }
  },
  UserList: {
    path: '/user/list',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/User.vue'),
    meta: {
      menu: '用户管理', // 有menu则显示为菜单
      sort: 1
    }
  },
  UserRole: {
    path: '/user/role',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/Role.vue'),
    meta: {
      menu: '角色管理',
      sort: 2
    }
  },
  UserAction: {
    path: '/user/action',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/Action.vue'),
    meta: {
      menu: '权限设置',
      sort: 3
    }
  },
  UserModule: {
    path: '/user/module',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/Module.vue'),
    meta: {
      menu: '模块管理',
      sort: 4
    }
  },
}
export default RouteConfigObj
