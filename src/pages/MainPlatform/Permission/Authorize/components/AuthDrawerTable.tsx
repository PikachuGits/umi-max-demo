import { DrawerTable } from '@/components';
import { useEffect, useState } from 'react';

export default (props: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  useEffect(() => {
    console.log(props.selectedRowKeys);
    setSelectedRowKeys(props.selectedRowKeys);
  }, []);
  const onSelectChange = (newSelectedRowKeys: number[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <DrawerTable
      trigger={props.trigger}
      drawerProps={{
        placement: 'right',
        title: props.title,
        width: '800px',
      }}
      cardBordered
      rowSelection={rowSelection}
      // scroll={{ x: '100%' }}
      request={props.request}
      columns={props.columns}
      rowKey={props.rowKey}
      // options={{
      //   setting: {
      //     listsHeight: 400,
      //   },
      // }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
        // onChange: (page) => console.log('page', page),
      }}
      onOpenChange={() => setSelectedRowKeys(props.selectedRowKeys)}
      dateFormatter="string"
      toolBarRender={() => []}
    />
  );
};
