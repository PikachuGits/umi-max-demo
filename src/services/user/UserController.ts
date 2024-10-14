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
    query_all?: string;
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
 * 添加用户组
 * @param data
 * @param options
 */
export async function editAdminGroup(
  data: {
    page?: number;
    pageSize?: number;
    field_name?: string;
    id?: number;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.editAdminGroup, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
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
    id?: string;
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
 * 修改用户信息
 * @param data
 * @param options
 */
export async function editAdmin(
  data: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
    admin_id?: number;
    field_name?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.editAdmin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
/**
 * 新增用户
 * @param params
 * @param options
 */
export async function addAdmin(
  params: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
    id?: number;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.addAdmin, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}
//获取角色列表为用户选择角色
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
    query_all?: string;
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
//获取角色列表为用户选择角色
/**
 * 获取用户角色列表
 * @param params
 * @param options
 */
export async function getAdminRole(
  params: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
    id?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getAdminRole, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}
