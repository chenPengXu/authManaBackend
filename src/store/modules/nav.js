import { getRouteLayout, RouteConfigObj } from '@/config/router'
import { saveToLocal, getFromLocal } from '@/utils/store'
import { apiGetAuthMenus } from '@/api'
import types from './types'
const sortDefault = {
  min: 0,
  max: 1000
}

export default {
  namespaced: true,
  state: {
    menuStatus: parseInt(getFromLocal(types.C_NAV_MENUSTATUS), 0) || 0,
    menuAuthed: [],
  },
  mutations: {
    [types.C_NAV_MENUSTATUS](state, status) {
      state.menuStatus = status
      saveToLocal(types.C_NAV_MENUSTATUS, status)
    },
    [types.C_NAV_MENU_AUTHED](state, arr) {
      state.menuAuthed = arr
    },
  },
  actions: {
    [types.A_NAV_GETMENUAUTH]({ commit }, token) {
      // 拿用户的token 去服务器获取用户的角色然后再获取权限信息
      /**
       基于页面、按钮等的权限可基于下面的逻辑处理
       基于请求的 Referer 信息，服务端检查用户是否有该页面权限
       如果是表单提交操作， 基于 Referer + 提交路径 + 提交类型(GET, POST...) 的检查
       **/
      return new Promise((resolve) => {
        apiGetAuthMenus({ token }).then((res) => {
          let infoArr = res['data']
          if (!infoArr) {
            return resolve([])
          }
          const authConfigs = []
          let menuConfigs = []
          const routeRoot = getRouteLayout()
          infoArr = infoArr.sort((a, b) => {
            return a.Path >= b.Path ? 1 : -1 // 先按路径做一次排序
          })

          let pre = null
          const len = infoArr.length
          for (let i = 0; i < len; i++) {
            const item = infoArr[i]
            const obj = RouteConfigObj[item.Name]
            if (!obj) continue
            if (obj.meta && obj.meta.pType) { // 菜单目录的判断
              pre = obj
              pre.children = []
              if (!obj.meta.sort) {
                obj.meta.sort = sortDefault[1] // 加上默认的sort值
              }
              if (item.Disable) { // 目录被终止的情况下，其下所有路径的子菜单不再加入到路由中
                pre.disabled = 1
                continue
              }
              const { path, meta, children } = pre
              menuConfigs.push({ path, meta, children })
              continue
            }
            if (obj.path === item.Path && obj.component) { // 有路径有component就认为是一个合法的页面
              if (item.Disable) continue // 页面如果被禁用了，不加入路由
              if (pre && obj.path.indexOf(pre.path) === 0 && pre.disabled) continue // 如果路径的父目录被禁用了，其下页面不加入路由
              authConfigs.push({
                name: item.Name,
                ...obj
              })
              if (item.Disable) continue // 页面被禁或者为普通页面不加入
              if (!obj.meta || (obj.meta && !obj.meta.menu)) continue
              const { path, meta } = obj
              if (!meta.sort) {
                meta.sort = sortDefault[1] // 加上默认的sort值
              }
              if (pre && obj.path.indexOf(pre.path) === 0) {
                pre.children.push({ path, meta })
              } else {
                menuConfigs.push({ path, meta })
              }
            }
          }

          menuConfigs = menuConfigs.filter((item) => {
            if (item.meta && item.meta.pType) {
              if (item.children.length === 0) return false
              item.children.sort(menuSortFn)
              return true
            }
            return true
          })
          // 过滤children没元素的菜单， 有则做一次排序
          menuConfigs.sort(menuSortFn)

          commit(types.C_NAV_MENU_AUTHED, menuConfigs)
          if (authConfigs.length !== 0) {
            routeRoot.children = authConfigs
          }
          const routeConf = []
          routeConf.push(routeRoot)
          return resolve(routeConf)
        })
      })
    }
  }
}

function menuSortFn(a, b) { // 按定义的菜单顺序做排序
  return a.meta.sort >= b.meta.sort ? 1 : -1
}
