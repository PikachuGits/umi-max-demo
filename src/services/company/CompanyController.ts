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
 * 获取公司列表( table )
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
