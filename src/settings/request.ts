// 错误处理方案： 错误类型
import { CacheEnum } from '@/settings/enum';
import { localStorageGet } from '@/utils/catch';
import { AxiosResponse, RequestConfig } from '@@/plugin-request/request';
import { message, notification } from 'antd';

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  code: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

// interface ResponseData {
//   code: number;
//   message: string;
//   data: any;
//   url: string;
//   operate: string;
// }

// 运行时配置
export const RequestSetting: RequestConfig = {
  // 统一的请求设定
  timeout: 10000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },

  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { code, data, errorCode, errorMessage, showType } = res;
      if (!code) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage).then(() => {});
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage).then(() => {});
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage).then(() => {});
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`).then((r) => r);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.').then((r) => r);
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.').then((r) => r);
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 设置token
      config.headers.common.token = localStorageGet(CacheEnum.TOKEN);
      // const url = config.url.concat('?token = 123');
      return { ...config };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response: AxiosResponse) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response;
      if (data.code !== 10000) {
        message.error('请求失败！').then((r) => r);
      }
      return data;
    },
  ],
};
