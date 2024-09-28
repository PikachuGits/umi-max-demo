import { ProDescriptionsItemProps } from '@ant-design/pro-components';
import '@umijs/max/typings';
import 'antd';

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

// declare global {
//   type BgptColumnTypes<T> = Exclude<TableProps<T>['columns'], undefined>;
//   // 将 BgptColumnTypes 与自定义属性合并
//   type EditableBgptColumnTypes<T, S> = (BgptColumnTypes<T>[S] & {
//     editable?: boolean | undefined;
//     dataIndex?: string;
//     search?: boolean;
//     title: any;
//     rules?: string[];
//     render?: (
//       dom: ReactNode,
//       entity: T,
//       index: number,
//       action: ProCoreActionType<{}> | undefined,
//       schema: ProColumns<T, 'text'>,
//     ) => ReactNode | RenderedCell<T>;
//     [key: string]: any;
//   })[];
// }

declare global {
  // 定义 BgptColumnTypes 来获取 ProTable 的 columns 类型
  type BgptColumnTypes<T> = ProColumns<T, 'columns'>[];

  // 将 BgptColumnTypes 与自定义属性合并
  type EditableBgptColumnTypes<T> = (BgptColumnTypes<T> & {
    editable?: boolean | undefined;
    dataIndex?: string;
    search?: boolean;
    title: any;
    rules?: string[];
    render?: (
      dom: ReactNode,
      entity: T,
      index: number,
      action: ProCoreActionType<object> | undefined,
      schema: ProColumns<T, 'text'>,
    ) => ReactNode | RenderedCell<T>;
    [key: string]: any; // 支持其他属性
  })[];
}
