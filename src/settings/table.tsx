import { isEmpty } from '@/utils/format';
import React from 'react';
type DataType = {
  id: React.Key;
  company: string;
  code: string;
  address: string;
  tin: string;
  company_type: string;
  sort: number;
  // 其他必要字段...
};
/**
 * 处理Columns 变更项
 * @param isEditable
 * @param defaultColumns
 * @param handleSave
 */
export const getTableColumns = ({
  isEditable,
  defaultColumns,
  handleSave,
}: {
  isEditable?: boolean;
  defaultColumns: BgptColumnTypes<DataType>;
  handleSave?: (props: object, record: object) => void;
}) => {
  return defaultColumns.map(
    (column: { editable?: boolean | undefined; dataIndex?: string; title: any; [key: string]: any }): any => {
      if (isEmpty(column.editable)) {
        return column;
      }
      return {
        ...column,
        //  向表头写入属性
        onHeaderCell: () => ({
          editable: 'true',
        }),
        onCell: (record: object) => ({
          record,
          editable: isEditable,
          dataIndex: column.dataIndex,
          title: () => column.title,
          rules: !isEmpty(column.formItemProps?.rules) ? column.formItemProps.rules : [],
          handleSave,
        }),
      };
    },
  );
};
