// path: '/welcome',
// component: 'IndexPage',
// name: '欢迎', // 兼容此写法
// icon: 'testicon',
// // 更多功能查看
// // https://beta-pro.ant.design/docs/advanced-menu
// // ---
// // 新页面打开
// target: '_blank',
// // 不展示顶栏
// headerRender: false,
// // 不展示页脚
// footerRender: false,
// // 不展示菜单
// menuRender: false,
// // 不展示菜单顶栏
// menuHeaderRender: false,
// // 权限配置，需要与 plugin-access 插件配合使用
// access: 'canRead',
// // 隐藏子菜单
// hideChildrenInMenu: true,
// // 隐藏自己和子菜单
// hideInMenu: true,
// // 在面包屑中隐藏
// hideInBreadcrumb: true,
// // 子项往上提，仍旧展示,
// flatMenu: true,

export const routes = [
  // {
  //   path: '/',
  //   redirect: '/home',
  // },
  {
    name: '登录',
    path: '/login',
    layout: false,
    hideInMenu: true,
    component: '@/pages/System/Login/index',
  },

  {
    name: '404',
    path: '/404',
    layout: false,
    hideInMenu: true,
    component: '@/pages/System/Login/index',
  },
  {
    path: '/dashboard',
    name: '仪表板',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/workplace',
      },
      {
        name: '工作台',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: '@/pages/Dashboard/Workplace',
      },
    ],
  },
  // {
  //   path: '/dashboard',
  //   name: '授权管理',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       path: '/dashboard',
  //       redirect: '/dashboard/workplace',
  //     },
  //     {
  //       name: '授权管理',
  //       icon: 'smile',
  //       path: '/dashboard/workplace',
  //       component: '@/pages/Dashboard/Workplace',
  //     },
  //   ],
  // },
  // {
  //   path: '/main/company',
  //   name: '公司管理',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       path: '/main/company',
  //       redirect: '/main/company/list',
  //     },
  //     {
  //       name: '公司列表',
  //       icon: 'smile',
  //       path: '/main/company/list',
  //       component: '@/pages/MainPlatform/Company/List',
  //     },
  //   ],
  // },
  // {
  //   path: '/main/user',
  //   name: '用户管理',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       path: '/main/user',
  //       redirect: '/main/user/group',
  //     },
  //     {
  //       name: '用户组列表',
  //       icon: 'smile',
  //       path: '/main/user/group',
  //       component: '@/pages/MainPlatform/User/Group',
  //     },
  //     {
  //       name: '用户列表',
  //       icon: 'smile',
  //       path: '/main/user/list',
  //       component: '@/pages/MainPlatform/User/List',
  //     },
  //   ],
  // },
  // {
  //   path: '/main/system',
  //   name: '系统管理',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       path: '/main/system',
  //       redirect: '/main/system/configuration',
  //     },
  //     {
  //       name: '系统配置',
  //       icon: 'smile',
  //       path: '/main/system/configuration',
  //       component: '@/pages/MainPlatform/System/Configuration',
  //     },
  //     {
  //       name: '字典配置',
  //       icon: 'smile',
  //       path: '/main/system/dictionary',
  //       component: '@/pages/MainPlatform/System/Dictionary',
  //     },
  //     {
  //       name: '菜单管理',
  //       icon: 'smile',
  //       path: '/main/system/menu',
  //       component: '@/pages/MainPlatform/System/Menu',
  //     },
  //   ],
  // },
  // {
  //   path: '/main/company',
  //   name: '权限管理',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       path: '/main/company',
  //       redirect: '/main/company/list',
  //     },
  //     {
  //       name: '角色权限管理',
  //       icon: 'smile',
  //       path: '/main/company/list',
  //       component: '@/pages/MainPlatform/Company/List',
  //     },
  //     {
  //       name: '角色权限管理',
  //       icon: 'smile',
  //       path: '/main/company/list',
  //       component: '@/pages/MainPlatform/Company/List',
  //     },
  //   ],
  // },
];
