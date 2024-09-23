import { ProDescriptionsItemProps } from '@ant-design/pro-components';
import '@umijs/max/typings';

/**
 * 补充ProDescriptionsItemProps 属性
 *
 */

interface CustomProDescriptionsItemProps<T> extends ProDescriptionsItemProps<T> {
  tip?: string; // 添加自定义属性
}
declare module 'antd' {
  export interface TreeSelectProps {
    variant?: string; // 确保类型中定义了 variant
  }
}
