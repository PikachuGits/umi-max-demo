// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import LazyLoadable from '@/components/LazyLoadable';
import { getRoutesList } from '@/services/router/RouterController';
import React from 'react';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    router: false,
    menu: {
      locale: false,
      request: async (params: object, defaultMenuData: object[]) => {
        console.log('params', params, defaultMenuData);
        // // const { data } = await getRoutesList(params);
        return defaultMenuData;
      },
    },
    // menuRender: () => {},
  };
};

/**
 * 创建一个临时储存api返回路由的变量
 */
let extraRoutes: Routes.RoutesMenuItem[] = [];
/**
 * 处理动态路由赋值问题
 * @param routes
 */
export function patchClientRoutes({ routes }: { routes: any[] }) {
  // 检查 extraRoutes 是否为空
  if (extraRoutes.length === 0) {
    console.warn('No extra routes to add');
    return;
  }

  const router = routes.find((item) => item.id === 'ant-design-pro-layout');

  // 检查是否找到了指定的 router
  if (!router) {
    console.warn('Router with id "ant-design-pro-layout" not found');
    return;
  }

  // 检查 router.routes 是否存在并且是数组
  if (!Array.isArray(router.routes)) {
    console.warn('Router does not have a valid routes array');
    router.routes = []; // 初始化 routes 为数组
  }

  let routes_id = router.routes.length;
  // 直接使用 map 和 push 修改 router.routes
  extraRoutes.forEach((item) => {
    console.log(item);
    routes_id++;
    router.routes.push({
      ...item,
      id: `${routes_id}`,
      path: item.path,
      element: LazyLoadable(
        React.lazy(() => import(`@/${item.component}`)), // 动态导入组件
      ),
    });
  });
}

/**
 * 获取动态路由
 * @param oldRender
 */
export async function render(oldRender: () => void) {
  // const data = '';
  const { data } = await getRoutesList({});
  extraRoutes = data;
  oldRender();
}
