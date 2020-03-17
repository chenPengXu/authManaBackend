import { saveSession, getSession } from '@/utils/store'

const SKEY_G_TOKEN = 'chosdpxd232dsblue'
function getToken() {
  return getSession(SKEY_G_TOKEN)
}

function saveToken(token) {
  saveSession(SKEY_G_TOKEN, token)
}

function clearSession(router) {
  // saveSession(SKEY_G_TOKEN, '')
  sessionStorage.removeItem(SKEY_G_TOKEN)
  if (router) {
    try {
      router.isPageAuthed = false // 将permission.js中router.isPageAuthed 置回false， 该标志用vuex处理也行
    } catch (e) {
      console.log('router may not router when clearSession:', e)
    }
  }
}

export {
  getToken,
  saveToken,
  clearSession,
}
