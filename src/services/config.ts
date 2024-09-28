import companyApi from '@/services/company/api';
const proxy = process.env.API_PROXY || '/api'; // api

const endpoints = {
  login: '/admin/login',
  getRoutesList: '/router/getRoutesList',
  // 可以继续添加更多的 API 路径
  ...companyApi,
};

export const API = Object.fromEntries(Object.entries(endpoints).map(([key, endpoint]) => [key, `${proxy}${endpoint}`]));
