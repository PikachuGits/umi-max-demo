// 该文件由 OneAPI 自动生成，请勿手动修改！
import { API } from '@/services/config';
import { request } from '@umijs/max';

export async function login(body: { username: string; password: string }, options?: { [key: string]: any }) {
  // 延时函数，返回一个 Promise，在指定时间后 resolve
  const delay = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(true), ms);
    });

  // 模拟延时，比如延时 2 秒（2000 毫秒）
  await delay(2000);

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
 * 获取系统配置列表( table )
 * @param params
 * @param options
 */
export async function getConfigList(
  params: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
    platform_id?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getConfigList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}
/**
 * 添加系统配置
 * @param data
 * @param options
 */
export async function addConfig(
  data: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.addConfig, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
/**
 * 修改系统配置
 * @param data
 * @param options
 */
export async function editConfig(
  data: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.editConfig, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
/**
 * 删除系统配置
 * @param data
 * @param options
 */
export async function delConfig(
  data: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.delConfig, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
