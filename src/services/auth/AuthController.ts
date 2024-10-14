import { API } from '@/services/config';
import { request } from '@@/exports';

/**
 * 获取存在绑定关系的用户列表( 授权 )
 * @param params
 * @param options
 */
export async function getUserPlatformRelationsByUser(
  params: {
    page?: number;
    pageSize?: number;
    query_all?: number;
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
 * 获取绑定关系的平台列表 ( 公司或项目 )( 授权 )
 * @param params
 * @param options
 */
export async function getUserPlatformRelationsByPlatform(
  params: {
    page?: number;
    pageSize?: number;
    query_all?: number;
    admin_id?: number | string;
    platform_id: number | string;
    company_id?: number | string; // 存在则查询公司下项目,否则查询全部项目
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getUserPlatformRelationsByPlatform, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}

/**
 * 获取角色列表( table )
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

/**
 * 写入绑定关系 ( 权限 )
 * @param data
 * @param options
 */
export async function setRelations(
  data: {
    relations: {
      admin_id?: number;
      platform_id?: number;
      platform_entity_id?: number;
    };
    ids: number[];
    type: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.setRelations, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
/**
 * 将绑定关系与角色关联 (用户与 [公司/项目]的绑定关系)
 * @param data
 * @param options
 */
export async function setRoleRelations(
  data: {
    relation_id: number;
    roles: number[];
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.setRoleRelations, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
/**
 * 批量 将绑定关系与角色关联 (用户与 [公司/项目]的绑定关系)
 * @param data
 * @param options
 */
export async function setRoleRelationAll(
  data: {
    admin_id?: number;
    platform_id?: number;
    platform_entity_id?: number;
    relation_id: number;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.setRoleRelationAll, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
