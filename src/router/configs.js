// NO Auth need Pages
const DefaultPages = [
  // {
  //   path: '/user/module',
  //   component: () => import(/* webpackChunkName: "user" */ '../views/user/Module.vue'),
  // },
  // {
  //   path: '/user/action',
  //   component: () => import(/* webpackChunkName: "user" */ '../views/user/Action.vue'),
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "index" */ '../views/user/Login.vue'),
  },
  {
    path: '/authRedirect',
    name: 'AuthRedirect',
    component: () => import(/* webpackChunkName: "index" */ '../views/AuthRedirect.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/error/NotFound.vue'),
  },
]

export default DefaultPages
