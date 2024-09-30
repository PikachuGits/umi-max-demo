import { EditableCell, EditableRow } from '@/components';
import { getTableColumns } from '@/settings/table';
import { isEmpty } from '@/utils/format';
import { EditFilled, FormOutlined } from '@ant-design/icons';
import { ProTable, ProTableProps } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface CustomProTableProps<T, U = Record<string, any>> extends ProTableProps<T, U> {
  isEditable?: boolean;
  handleSave?: (props: object, record: object) => void;
  additionalButtons?: React.ReactNode[];
  defaultColumns: BgptColumnTypes<T>; // 确保 defaultColumns 是必需的
}

const ProEditable = forwardRef((props: CustomProTableProps<any>, ref) => {
  const { defaultColumns, handleSave, additionalButtons, ...tableProps } = props;

  const [editable, setEditable] = useState<boolean>(false);
  // 使用 useImperativeHandle 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    toggleEdit(state: boolean) {
      // console.log('state', isEditable);
      setEditable(state);
    },
    editable,
  }));
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
    header: {
      cell: (props: any) => (
        <th {...props}>
          {props.children}
          {!isEmpty(props.editable) && editable && <FormOutlined style={{ fontSize: '10px', padding: '0 5px' }} />}
        </th>
      ),
    },
  };

  return (
    <ProTable
      toolBarRender={() => [
        <Button
          key="button"
          icon={<EditFilled />}
          onClick={() => {
            setEditable(!editable);
          }}
          type="primary"
        >
          {editable ? '关闭编辑' : '开启编辑'}
        </Button>,
        ...(additionalButtons || []),
      ]}
      {...tableProps}
      components={components}
      columns={getTableColumns({ isEditable: editable, defaultColumns, handleSave })}
    />
  );
});
export default ProEditable;
