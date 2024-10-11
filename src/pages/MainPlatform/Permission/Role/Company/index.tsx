import { CustomPageContainer, ProEditable } from '@/components';
import { RoleFormDrawer } from '@/pages/MainPlatform/Permission/Role/Company/component';
import { defaultColumns } from '@/pages/MainPlatform/Permission/Role/Company/config/table-columns';
import { delRole, getRoleList } from '@/services/role/RoleController';
import { isEmpty } from '@/utils/format';
import { useSearchParams } from '@@/exports';
import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useRef } from 'react';

export default () => {
  const actionRef = useRef<any>();
  const [searchParams, setSearchParams] = useSearchParams();

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
                <RoleFormDrawer
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
                  delRole({
                    role_id: event.props.record.role_id,
                    platform_id: '2',
                  }).then(() => {
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
        defaultColumns={defaultColumns}
        actionRef={actionRef}
        cardBordered
        scroll={{ x: '100%' }}
        onDataSourceChange={(dataSource) => {
          console.log('dataSource', dataSource);
          const { current, pageSize } = actionRef.current.pageInfo;

          if (parseInt(current) > 1 && isEmpty(dataSource)) {
            console.log('dataSource', { current: `${parseInt(current) - 1}`, pageSize });
            actionRef.current?.setPageInfo({
              ...actionRef.current.pageInfo,
              current: `${parseInt(current) - 1}`,
            });
            actionRef.current?.reload();
          }
        }}
        request={async (params, sort, filter) => {
          // console.log(sort, filter);
          const { current, ...values } = params;
          return await getRoleList({
            ...values,
            page: current,
            platform_id: '2',
          });
        }}
        rowKey="role_id"
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
          pageSize: 1,
          onChange: (page) => {},
        }}
        toolBarRender={() => [
          <RoleFormDrawer
            onChanfe={() => {
              actionRef.current?.reload();
            }}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                添加角色
              </Button>
            }
          />,
        ]}
      />
    </CustomPageContainer>
  );
};
