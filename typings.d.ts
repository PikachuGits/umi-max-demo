import { ProDescriptionsItemProps } from '@ant-design/pro-components';
import '@umijs/max/typings';

/**
 * 补充ProDescriptionsItemProps 属性
 *
 */

interface CustomProDescriptionsItemProps<T>
  extends ProDescriptionsItemProps<T> {
  tip?: string; // 添加自定义属性
}
