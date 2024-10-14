import store from '@/store';
import { isEmpty } from '@/utils/format';

interface Route {
  path: string;
  id?: string;
  children?: Route[]; // children 是可选属性
}

interface RouterGuardProps {
  location: { pathname: string };
  clientRoutes: Route[];
  routes: Route[];
  action: 'PUSH' | 'REPLACE' | 'POP';
  basename?: string;
  isFirst: boolean;
}

// 判断路径是否存在
const findPath = (routes: Route[], targetPath: string): boolean => {
  return routes.some((route) => {
    if (route.path === targetPath) {
      return true; // 匹配到目标路径
    }
    if (route.children && route.children.length > 0) {
      return findPath(route.children, targetPath); // 递归检查子项
    }
    return false;
  });
};

/**
 * 路由守卫
 */
export const RouterGuards = ({ location, clientRoutes, routes, isFirst }: RouterGuardProps) => {
  // 获取用户的 token
  const token = store.getState().user.token;
  // 没有 token 且访问路径不是 login 时，重定向到 login 页面
  if (isEmpty(token) && location.pathname !== '/login') {
    console.log(clientRoutes);
    // 检查当前路径是否存在于 routes 中
    const isRouteExist = findPath(clientRoutes, location.pathname);
    // 重定向到 login，并传递重定向路径
    window.location.href = `/login?redirect=${isRouteExist ? location.pathname : '/'}`;
    return;
  }

  if (location.pathname === '/login') {
    document.title = '登录 - 建业管理平台';
  }

  // 有 token 且访问路径为 login 时，重定向到主页
  if (!isEmpty(token) && location.pathname === '/login') {
    window.location.href = '/';
    return;
  }

  // 页面首次加载，且当前路径不存在时，跳转到默认路径 Todo 加载问题,会导致阿跳转到undefined 暂时注释
  // if ((!findPath(clientRoutes, location.pathname) || location.pathname === '/') && isFirst) {
  //   const layoutRoute = clientRoutes.find((item) => item.id === 'ant-design-pro-layout');
  //
  //   if (layoutRoute && layoutRoute.children && layoutRoute.children.length > 0) {
  //     // 跳转到 layout 的第一个子路由
  //     history.push(layoutRoute.children[0].path);
  //   }
  // }
};
