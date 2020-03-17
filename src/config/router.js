import Layout from '@/views/layout/common.vue'
// AuthPages
// 服务器端对目录的定义, Name和路径，对应下面HomeIndex和path两个参数
// 所有页面都需要定义，并将名称与路径配置在服务器上授予角色权限
// 菜单的生成基于接口返回的菜单(permission.js里查询)与该配置生成，
// 显示相关有meta里定义，数据结果在 /api/router.js里生成， 渲染在/views/nav/index.vue中生成
// 菜单的显示，以目录层级来组织
// meta.pType = 1 为菜单目录
// meta.menu = 为二级菜单，否则为普通页面定义
import UserRouterConf from './router_user'
const RouteConfigObj = {
  Home: {
    path: '/home',
    meta: {
      pType: '1', // 目录类型
      menu: '平台概况', // 有menu则显示为菜单
      sort: 1
    }
  },
  HomeIndex: {
    path: '/home/index',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      menu: '数据统计',
      sort: 1
    }
  },
  ...UserRouterConf
}

function getRouteLayout() {
  return {
    path: '/',
    component: Layout,
    children: [],
  }
}

export {
  getRouteLayout,
  RouteConfigObj,
}
