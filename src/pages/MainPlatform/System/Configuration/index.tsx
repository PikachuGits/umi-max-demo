import { CustomPageContainer, ProEditable } from '@/components';
import { SystemFormDrawer } from '@/pages/MainPlatform/System/Configuration/component';
import { defaultColumns } from '@/pages/MainPlatform/System/Configuration/config/table-columns';
import { delConfig, getConfigList } from '@/services/system/SystemController';
import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useRef } from 'react';

export default () => {
  const actionRef = useRef<ActionType>();

  async function handleSave(value: Company, record: Company) {
    // await editCompanyInfo({ ...value, id: record.id });
    // actionRef.current?.reload();
  }
  useEffect(() => {
    defaultColumns.find((item) => {
      if (item.dataIndex == 'action') {
        item.render = (event: any) => {
          // console.log('event', event.props);
          // text: string, record: object, _, action
          return (
            <div style={{ display: 'flex' }}>
              <a style={{ padding: '5px' }} key="editable">
                <SystemFormDrawer
                  onChange={() => {
                    actionRef.current?.reload();
                  }}
                  trigger={<FormOutlined />}
                  initialValues={event.props.record}
                />
              </a>
              <a
                style={{ padding: '5px' }}
                key="delete"
                onClick={() => {
                  console.log('event', event.props);
                  delConfig(event.props.record).then(() => {
                    actionRef.current?.reload();
                  });
                }}
              >
                <DeleteOutlined style={{ color: 'red' }} />
              </a>
            </div>
          );
        };
      }
    });
  }, []);

  return (
    <CustomPageContainer>
      <ProEditable
        handleSave={handleSave}
        defaultColumns={defaultColumns}
        actionRef={actionRef}
        cardBordered
        scroll={{ x: '100%' }}
        request={async (params, sort, filter) => {
          // console.log(sort, filter);
          const { current, ...values } = params;
          return await getConfigList({
            ...values,
            page: current,
          });
        }}
        rowKey="config_id"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              //   //get 从 URL 中获取参数，初始化表单
            }
            // set 提交表单时，将表单值同步到 URL
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          // onChange: (page) => console.log('page', page),
        }}
        toolBarRender={() => [
          <SystemFormDrawer
            onChanfe={() => {
              actionRef.current?.reload();
            }}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                添加配置
              </Button>
            }
          />,
        ]}
      />
    </CustomPageContainer>
  );
};
