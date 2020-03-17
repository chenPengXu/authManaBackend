import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultPages from './configs'

Vue.use(VueRouter)

const routes = DefaultPages

const createRouter = () => new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes,
})

const router = createRouter()

function resetRouter(r) {
  const newRouter = createRouter()
  r.matcher = newRouter.matcher // reset router
}
const LoginPath = '/login' // 没有用户登录的情况下，页面权限流程会定向到该路径
const AuthRedirectPath = '/authRedirect'
// 用户登录后，接口调用权限配置后动态增加路由时，先重定向该路由，再由该路由回到需要去的页面；
// （第一次时，由于正在动态增加，所以没法跳过去，需要增加后做一次中间跳转再跳转）
const WhitePageList = '#Login#' // 路由权限检查白名单，该白名单需要存在./configs.js里的定义的路由
export default router
export {
  LoginPath,
  AuthRedirectPath,
  WhitePageList,
  resetRouter,
}
