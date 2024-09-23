import React from 'react';

// 路由数据类型
interface Route {
  path: string;
  name?: string;
  icon?: React.ReactNode;
  component?: string; // 组件的路径
  children?: Route[];
}

//
// // 模拟的路由数据
// const routesData: Route[] = [
//   {
//     path: '/main/company',
//     name: '公司管理',
//     icon: 'dashboard',
//     children: [
//       {
//         path: '/main/company',
//         redirect: '/main/company/list',
//       },
//       {
//         name: '公司列表',
//         icon: 'smile',
//         path: '/main/company/list',
//         component: 'pages/MainPlatform/Company/List', // 动态加载的组件路径
//       },
//     ],
//   },
// ];
//
// // 在 React 中使用路由
// const AppRoutes = () => {
//   // 生成的路由对象数组
//   const routes = generateRoutes(routesData);
//
//   // 使用 react-router 的 useRoutes hook 来渲染路由
//   return useRoutes(routes);
// };
//
// export default AppRoutes;
