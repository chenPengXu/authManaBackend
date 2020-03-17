const saveToLocal = function(key, val) {
  localStorage.setItem(key, val)
}
const getFromLocal = function(key) {
  return localStorage.getItem(key)
}
const saveSession = function(key, val) {
  sessionStorage.setItem(key, val)
}
const getSession = function(key) {
  return sessionStorage.getItem(key)
}

export {
  saveToLocal,
  getFromLocal,
  saveSession,
  getSession,
}
