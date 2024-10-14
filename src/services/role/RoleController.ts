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
/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryUserList(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryUserList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 获取角色列表( table )
 * @param data
 * @param options
 */
export async function getRoleList(
  data: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
    platform_id?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getRoleList, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
/**
 * 获取菜单列表
 * @param params
 * @param options
 */
export async function getMenuList(
  params: {
    platform_id?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.MenuList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}
/**
 * 获取已选中的菜单列表
 * @param params
 * @param options
 */
export async function getRoleMenuList(
  params: {
    role_id?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getRoleMenuList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}
/**
 * 修改角色菜单
 * @param data
 * @param options
 */
export async function editRole(
  data: {
    role_id?: string;
    menu?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.editRole, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
/**
 * 修改角色菜单
 * @param data
 * @param options
 */
export async function addRole(
  data: {
    role_id?: string;
    menu?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.addRole, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}

/**
 * 删除角色
 * @param data
 * @param options
 */
export async function delRole(
  data: {
    platform_id?: string;
    role_id?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.delRole, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
