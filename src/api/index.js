// 所有configs目录下导出的function加api前缀
const apiModulesFils = require.context('./configs', true, /\.js$/)
const apiConfs = apiModulesFils.keys().reduce((confs, modulePath) => {
  const value = apiModulesFils(modulePath)
  const exps = value.default
  Object.keys(exps).forEach((key) => {
    const apiKey = key.replace(key[0], key[0].toUpperCase())
    confs['api']['api' + apiKey] = function(param) {
      return apiPostData(param, key)
    }
    confs['conf'][key] = exps[key]
  })
  return confs
}, {
  api: {},
  conf: {},
})

const isOnline = process.env.NODE_ENV === 'production'
let mockDatas
async function apiPostData(param, apiName, debugName) {
  if (isOnline) {
    const apiFn = apiConfs['conf'][apiName]
    const res = await apiFn(param)
    return res
  }
  if (mockDatas) {
    return { ret: true, data: debugName ? mockDatas[debugName] : mockDatas[apiName] }
  }
  const res = await import('./mock')
  mockDatas = res.Mock
  return { ret: true, data: debugName ? mockDatas[debugName] : mockDatas[apiName] }
}

export const {
  apiDoLogin,
  apiGetAuthMenus,
  apiDoModuleAdd,
  apiDoActionAdd,
  apiDoRoleAdd,
  apiDoUserAdd,
} = apiConfs['api']
export default apiConfs['conf']
