import authApi from '@/services/auth/api';
import companyApi from '@/services/company/api';
import projectApi from '@/services/project/api';
import roleApi from '@/services/role/api';
import systemApi from '@/services/system/api';
import userApi from '@/services/user/api';

const proxy = process.env.API_PROXY || '/api'; // api

const endpoints = {
  login: '/admin/login',
  getRoutesList: '/router/getRoutesList',
  // 可以继续添加更多的 API 路径
  ...companyApi,
  ...userApi,
  ...authApi,
  ...roleApi,
  ...systemApi,
  ...projectApi,
};

export const API = Object.fromEntries(Object.entries(endpoints).map(([key, endpoint]) => [key, `${proxy}${endpoint}`]));
