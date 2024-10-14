import { API } from '@/services/config';
import { request } from '@@/exports';

/**
 * 获取公司下的项目列表
 * @param params
 * @param options
 */
export async function getProjectListWithCompany(
  params: {
    /** current */
    page?: number;
    /** pageSize */
    pageSize?: number;
    // 公司id
    company_id: number | string;
    // 1 代表 普通项目 2 代表公司日常管理项目
    is_company?: number | string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(API.getProjectListWithCompany, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
