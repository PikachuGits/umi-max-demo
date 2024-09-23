import { request } from '@umijs/max';

export function getRoutesList(
  params: {
    id?: number;
    keyword?: string;
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
): Promise<Routes.RoutesMenuItem[]> {
  return request<Routes.RoutesMenuItem[]>('/mock/router/getRoutesList', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
