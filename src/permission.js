import router, { LoginPath, AuthRedirectPath, WhitePageList, resetRouter } from '@/router'
import { getToken } from '@/store/session'
import store, { getName } from '@/store'
import actions from '@/store/modules/types'

router.isPageAuthed = false
router.beforeEach(async (to, from, next) => {
  if (WhitePageList.indexOf(to.name) > 0) {
    next()
    return
  }
  const token = getToken()
  if (!token) {
    next(LoginPath)
    return
  }
  if (!router.isPageAuthed) {
    router.isPageAuthed = true
    const routeInfo = await store.dispatch(getName(['nav', actions.A_NAV_GETMENUAUTH]), token)
    resetRouter(router)
    router.addRoutes(routeInfo)
    const redirect = {
      path: AuthRedirectPath,
      query: { ...to.query, ...{ sysRedirectPath: encodeURIComponent(to.path) } },
      params: { ...to.params },
    }
    next({ ...redirect, replace: true })
    return
  }
  next()
})
