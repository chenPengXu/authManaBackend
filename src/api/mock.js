// 本地测试的Mock数据
// getAuthMenus 为用户可访问的页面，以及菜单、后端可按此设计接口， Path, name需要与config里的配置一致

const TestData = {
  doLogin: 'xxc2019df',
  getAuthMenus: [
    {
      Path: '/home',
      Name: 'Home',
    },
    {
      Path: '/home/index',
      Name: 'HomeIndex',
    },
    {
      Path: '/home/about',
      Name: 'HomeAbout',
    },
    {
      Path: '/user',
      Name: 'User',
    },
    {
      Path: '/user/role',
      Name: 'UserRole',
      Disable: 1,
    },
    {
      Path: '/user/module',
      Name: 'UserModule',
    },
    {
      Path: '/user/action',
      Name: 'UserAction',
    },
  ],
}

exports.Mock = TestData
