import { API } from '@/services/config';
import { request } from '@@/exports';

/**
 * 获取公司列表( table )
 * @param params
 * @param options
 */
export async function getCompanyListToTable(
  params: {
    page?: number;
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  // 执行实际的 API 请求
  return request(API.getCompanyList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}

/**
 *   修改公司信息
 * @param data
 * @param options
 */
export async function editCompanyInfo(data: Company, options?: { [key: string]: any }) {
  // 执行实际的 API 请求
  return request(API.editCompany, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
/**
 * 新增公司
 * @param data
 * @param options
 */
export async function addCompany(data: Company, options?: { [key: string]: any }) {
  // 执行实际的 API 请求
  return request(API.addCompany, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}

/**
 * 删除公司
 * @param data
 * @param options
 */
export async function delCompany(data: Company, options?: { [key: string]: any }) {
  // 执行实际的 API 请求
  return request(API.delCompany, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
