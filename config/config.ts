import { defineConfig } from '@umijs/max';
import { routes } from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes,
  npmClient: 'pnpm',
  // 打包器
  mako: {},
});
