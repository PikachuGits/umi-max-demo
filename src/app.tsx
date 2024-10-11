// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import LazyLoadable from '@/components/LazyLoadable';
import { getRoutesList } from '@/services/router/RouterController';
import { initialStateDefault, RequestSetting, RouterGuards } from '@/settings';
import store from '@/store';
import { isEmpty } from '@/utils/format';
import { RequestConfig } from '@@/plugin-request/request';
import * as Icons from '@ant-design/icons';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

/**
 * 创建一个临时储存api返回路由的变量
 */
let extraRoutes: Routes.RoutesMenuItem[] = [];

/**
 * 修改交给 react-dom 渲染时的根组件。
 * @param container  JSX.Element
 * @param args
 *        routes，全量路由配置
 *        plugin，运行时插件机制
 *        history，history 实例
 */
export function rootContainer(container: any) {
  return (
    <Suspense>
      <Provider store={store}>{container}</Provider>
    </Suspense>
  );
}
// 定义 InitialStateType 类型
export type InitialStateType = {
  name?: string;
  collapsed?: boolean;
  layout?: string;
  fixSiderbar?: boolean;
  splitMenus?: boolean;
  [key: string]: any;
};

export async function getInitialState(): Promise<InitialStateType> {
  return initialStateDefault;
}

export const layout = ({ initialState, setInitialState }: any) => {
  const defaultCollapsed = document.documentElement.offsetWidth <= 1000;
  const isCollapsed = initialState?.collapsed !== undefined ? initialState.collapsed : defaultCollapsed;
  const contentDeviationX = document.documentElement.offsetWidth > 767 ? (isCollapsed ? '65px' : '256px') : '0px';

  return {
    ...initialState,
    collapsed: isCollapsed,
    onCollapse: (collapsed: boolean) => {
      setInitialState({ ...initialState, collapsed });
    },
    contentStyle: {
      width: `calc(100vw - ${contentDeviationX})`,
      height: 'calc(100vh - 56px)',
      // padding: '32px 40px',
      // paddingRight: `50px`,
    },
    // headerContentRender: () => <ProBreadcrumb />,
    breadcrumbRender: (routers = []) => {
      return [...routers];
    },
    menu: false,
  };
};

/**
 * 路由守卫
 */
export const onRouteChange = RouterGuards;

/**
 * axios api 请求配置
 */
export const request: RequestConfig = RequestSetting;

// 用来递归处理路由树的函数
const generateRoutes = (routes: Routes.RoutesMenuItem[], parentId: string = '') => {
  return routes.map((route) => {
    const { component, children, icon, ...rest } = route;

    const routeId = `${route['id']}`;
    const element = component ? LazyLoadable(React.lazy(() => import(`@/${component}`))) : undefined;
    const childRoutes = children ? generateRoutes(children, routeId) : undefined;

    // @ts-ignore
    const iconRoutes = Icons[icon] && LazyLoadable(Icons[icon] as any);

    const data: any = {
      ...rest,
      ...(!isEmpty(iconRoutes) && { icon: iconRoutes }),
      ...(!isEmpty(element) && { element }),
      ...(!isEmpty(childRoutes) && { children: childRoutes }),
      ...(!isEmpty(parentId) && { parentId }),
    };

    return data;
  });
};

/**
 * 处理动态路由赋值问题
 * @param routes
 */
export function patchClientRoutes({ routes }: { routes: any[] }) {
  // 检查 extraRoutes 是否为空
  if (extraRoutes !== undefined && extraRoutes.length === 0) {
    console.warn('没有extraRoutes数据,不添加动态路由');
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

  // 直接使用 map 和 push 修改 router.routes
  const AsyncRoutes = generateRoutes(extraRoutes, '');
  console.log(router.routes);
  AsyncRoutes?.forEach((item) => {
    router.routes.push({
      ...item,
    });
  });
}

/**
 * 获取动态路由
 * @param oldRender
 */
export async function render(oldRender: () => void) {
  const token = store.getState().user.token;
  if (!isEmpty(token)) {
    // 获取路由信息
    extraRoutes = await getRoutesList({ id: 1 });
  }
  oldRender();
}
