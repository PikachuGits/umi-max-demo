import { ProEditable } from '@/components';
import { defaultColumns } from '@/pages/MainPlatform/User/Group/config/form-table-columns';
import { addAdminGroup, editAdminGroup, getAdminList, listGroupUsers } from '@/services/user/UserController';
import { DrawerForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default (props: any) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues({
      ...props.initialValues,
    });
    // console.log('Updated initialValues:', props.initialValues);
  }, [props.initialValues]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const onSelectChange = (newSelectedRowKeys: number[]) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  async function onOpenChange(visible: boolean) {
    console.log('visible', visible);
    if (visible && props.initialValues) {
      try {
        console.log('Updated initialValues:', props.initialValues.id);
        const res = await listGroupUsers({
          filed_name: 'group_id',
          id: props.initialValues.id,
        });
        setSelectedRowKeys(res);
        console.log('res', res);
      } catch (e) {
        message.error('获取用户列表失败');
      }
    }
  }
  return (
    <div>
      <DrawerForm
        // @ts-ignore
        labelWidth="auto"
        onOpenChange={onOpenChange}
        trigger={props.trigger}
        drawerProps={{ destroyOnClose: true }}
        onFinish={async (values: any) => {
          if (selectedRowKeys.length === 0) {
            message.warning('请至少选择一位人员');
            return false;
          }
          try {
            if (props.initialValues?.id) {
              await editAdminGroup({
                ...values,
                id: props.initialValues.id,
                ids: selectedRowKeys,
                field_name: 'group_id',
              });
            } else {
              await addAdminGroup({
                ...values,
                field_name: 'group_id',
                ids: selectedRowKeys, // 这里将 selectedRowKeys 作为 ids 数组传递
              });
            }
            message.success('提交成功');
            props.onChange();
            return true;
          } catch (error) {
            message.error('提交失败，请稍后重试');
            return false;
          }
        }}
        initialValues={initialValues}
      >
        <ProForm.Group>
          <ProFormText
            width="xl"
            name="group_name"
            label="用户组名"
            // tooltip="最长为 24 位"
            placeholder="请输入用户组名"
            rules={[
              {
                required: true,
                message: '请输入用户组名',
              },
            ]}
          />
          <ProEditable
            defaultColumns={defaultColumns}
            cardBordered
            search={false}
            rowSelection={rowSelection}
            scroll={{ x: '100%' }}
            request={async (params, sort, filter) => {
              console.log(sort, filter);
              const { current, ...values } = params;
              return await getAdminList({
                ...values,
                page: current,
              });
            }}
            rowKey="admin_id"
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
            toolBarRender={() => []}
          />
        </ProForm.Group>
      </DrawerForm>
    </div>
  );
};
