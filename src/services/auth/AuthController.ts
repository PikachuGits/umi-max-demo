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
  // // 延时函数，返回一个 Promise，在指定时间后 resolve
  // const delay = (ms: number) =>
  //   new Promise((resolve) => {
  //     setTimeout(() => resolve(true), ms);
  //   });
  //
  // // 模拟延时，比如延时 2 秒（2000 毫秒）
  // await delay(10000);
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
      admin_id: number;
      platform_id: number;
      platform_entity_id: number;
    }[];
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
