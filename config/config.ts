import { defineConfig } from '@umijs/max';
import { routes } from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  request: {},
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
  ],

  favicons: ['/favicon.ico'],
  plugins: [`${__dirname}/../src/plugins/umi-plugin-loading`],
  customLoading: '@/components/Loading/loading',
  title: '建业管理平台',
  proxy: {
    '/api': {
      target: 'http://192.168.1.140',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  initialState: {},
  layout: {},
  routes,
  npmClient: 'pnpm',
  autoCSSModules: true,
  // 打包器
  mako: {},
});
