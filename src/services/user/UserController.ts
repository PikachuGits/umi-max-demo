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
// /** 此处后端没有提供注释 GET /api/v1/queryUserList */
// export async function queryUserList(
//   params: {
//     // query
//     /** keyword */
//     keyword?: string;
//     /** current */
//     current?: number;
//     /** pageSize */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryUserList', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
//
// /** 此处后端没有提供注释 POST /api/v1/user */
// export async function addUser(body?: API.UserInfoVO, options?: { [key: string]: any }) {
//   return request<API.Result_UserInfo_>('/api/v1/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }
//
// /** 此处后端没有提供注释 GET /api/v1/user/${param0} */
// export async function getUserDetail(
//   params: {
//     // path
//     /** userId */
//     userId?: string;
//   },
//   options?: { [key: string]: any },
// ) {
//   const { userId: param0 } = params;
//   return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
//     method: 'GET',
//     params: { ...params },
//     ...(options || {}),
//   });
// }
//
// /** 此处后端没有提供注释 PUT /api/v1/user/${param0} */
// export async function modifyUser(
//   params: {
//     // path
//     /** userId */
//     userId?: string;
//   },
//   body?: API.UserInfoVO,
//   options?: { [key: string]: any },
// ) {
//   const { userId: param0 } = params;
//   return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: { ...params },
//     data: body,
//     ...(options || {}),
//   });
// }
//
// /** 此处后端没有提供注释 DELETE /api/v1/user/${param0} */
// export async function deleteUser(
//   params: {
//     // path
//     /** userId */
//     userId?: string;
//   },
//   options?: { [key: string]: any },
// ) {
//   const { userId: param0 } = params;
//   return request<API.Result_string_>(`/api/v1/user/${param0}`, {
//     method: 'DELETE',
//     params: { ...params },
//     ...(options || {}),
//   });
// }

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
