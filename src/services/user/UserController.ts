// 该文件由 OneAPI 自动生成，请勿手动修改！
import { API } from '@/services/config';
import { request } from '@umijs/max';

export async function login(body: { username: string; password: string }, options?: { [key: string]: any }) {
  // 延时函数，返回一个 Promise，在指定时间后 resolve
  // const delay = (ms: number) =>
  //   new Promise((resolve) => {
  //     setTimeout(() => resolve(true), ms);
  //   });
  //
  // // 模拟延时，比如延时 2 秒（2000 毫秒）
  // await delay(2000);

  // 执行实际的 API 请求
  return request(API.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 获取用户组列表( table )
 * @param params
 * @param options
 */
export async function getAdminGroupList(
  params: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getAdminGroupList, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}
/**
 * 添加用户组
 * @param data
 * @param options
 */
export async function addAdminGroup(
  data: {
    page?: number;
    pageSize?: number;
    field_name: string;
    ids: number[];
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.addAdminGroup, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
/**
 * 获取用户列表( table )
 * @param params
 * @param options
 */
export async function getAdminList(
  params: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getAdminList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}
/**
 * 删除用户组
 * @param params
 * @param options
 */
export async function delAdminGroup(
  params: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.delAdminGroup, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}
/**
 * 获取已经在组中的用户回显
 * @param data
 * @param options
 */
export async function listGroupUsers(
  data: {
    filed_name?: string;
    id?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.listGroupUsers, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
