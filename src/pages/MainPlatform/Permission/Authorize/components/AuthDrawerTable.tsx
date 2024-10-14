import { DrawerTable } from '@/components';
import { isEmpty } from '@/utils/format';
import { Button } from 'antd';
import { useRef, useState } from 'react';

export default (props: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const drawerRef = useRef<{ onClose: () => void } | null>(null);
  const onSelectChange = (newSelectedRowKeys: number[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // useEffect(() => {
  //   console.log(props.selectedRowKeys);
  // }, [props]);

  /**
   * 提交表单
   */
  async function onSubmit() {
    await props.onSubmit(selectedRowKeys);
    if (!isEmpty(drawerRef.current)) drawerRef.current.onClose();
  }

  return (
    <DrawerTable
      ref={drawerRef}
      loading={props.loading}
      trigger={props.trigger}
      drawerProps={{
        placement: 'right',
        title: props.title,
        width: '800px',
        footer: [
          <Button key={'1'} style={{ margin: '10px' }} onClick={() => drawerRef.current && drawerRef.current.onClose()}>
            取消
          </Button>,
          <Button key={'2'} type="primary" loading={props.loading} iconPosition={'end'} onClick={onSubmit}>
            确定
          </Button>,
        ],
      }}
      search={{
        labelWidth: 'auto',
      }}
      cardBordered
      rowSelection={rowSelection}
      request={props.request}
      columns={props.columns}
      rowKey={props.rowKey}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values: any, type: any) => {
          if (type === 'get') {
            return {
              ...values,
              // created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
        // onChange: (page) => console.log('page', page),
      }}
      onOpenChange={async () => {
        const keys = await props.onChangeOpen();
        setSelectedRowKeys(keys);
      }}
      dateFormatter="string"
      toolBarRender={() => []}
    />
  );
};
