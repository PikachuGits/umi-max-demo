import { API } from '@/services/config';
import { request } from '@@/exports';

/**
 * 获取存在绑定关系的用户列表( table )
 * @param params
 * @param options
 */
export async function getUserPlatformRelationsByUser(
  params: {
    page?: number;
    pageSize?: number;
    id: number | string;
    platform_id: number | string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getUserPlatformRelationsByUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}

/**
 * 获取公司列表( table )
 * @param params
 * @param options
 */
export async function getRoleList(
  params: {
    page?: number;
    pageSize?: number;
    query_all?: number;
    platform_id: number | string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getRoleList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}
