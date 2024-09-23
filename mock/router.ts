import routes from './static/routes.json';
const router: object[] = routes;

const routes_2 = [
  {
    name: ' CRUD 示例',
    path: '/table',
    component: 'pages/Table',
  },
];
export default {
  //
  'GET /mock/router/getRoutesList': (reg: any, res: any) => {
    console.log('getRoutesList', reg.query.id);
    const data = reg.query.id == 2 ? routes_2 : router;
    res.json({
      code: 10000,
      message: '操作成功',
      data,
      url: '',
      operate: 'admin/Admin/login',
    });
  },
};
// // 不展示顶栏
// "headerRender": false,
//   // 不展示页脚
//   "footerRender": false,
//   // 不展示菜单
//   "menuRender": false,
//   // 不展示菜单顶栏
//   "menuHeaderRender": false
//  // 隐藏菜单
// "hideInMenu": true
//  {
//    "name": "CURD 示例"
//  },
//  {
//    "name": "table 示例"
//  },
//  {
//    "name": "form 示例"
//  },
//  {
//    "name": "drawer-form 示例"
//  },
//  {
//    "name": "drawer-table 示例"
//  },
//  {
//    "name": "modal弹窗 示例"
//  }
