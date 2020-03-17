import apiRequest from '../util'
function doLogin(params) {
  return apiRequest('/in/touch/user/login', params, true)
}
function getAuthMenus(params) {
  return apiRequest('/in/touch/user/authMenus', params)
}
function doModuleAdd(params) {
  return apiRequest('/in/touch/module/add', params)
}
function doRoldAdd(params) {
  return apiRequest('/in/touch/role/add', params)
}
function doActionAdd(params) {
  return apiRequest('/in/touch/action/add', params)
}
function doUserAdd(params) {
  return apiRequest('/in/touch/user/add', params)
}
const apis = {
  getAuthMenus,
  doLogin,
  doModuleAdd,
  doRoldAdd,
  doActionAdd,
  doUserAdd,
}

export default apis
