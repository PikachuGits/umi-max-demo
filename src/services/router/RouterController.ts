import { request } from '@umijs/max';

export function getRoutesList(
  params: {
    keyword?: string;
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetRouterMenu>('/mock/router/getRoutesList', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
