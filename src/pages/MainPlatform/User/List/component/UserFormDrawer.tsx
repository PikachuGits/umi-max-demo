import {
  addAdmin,
  editAdmin,
  getAdminGroupList,
  getAdminRole,
  getRoleList,
  listGroupUsers,
} from '@/services/user/UserController';
import { isEmpty } from '@/utils/format';
import {
  DrawerForm,
  ProForm,
  ProFormCheckbox,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';

export default (props: any) => {
  const [initialValues, setInitialValues] = useState({});
  const [roleOptions, setRoleOptions] = useState([]); // 存储从接口获取的角色选项
  const [selectRoleOptions, setSelectRoleOptions] = useState([]); // 存储被选中的项
  const [groupOptions, setGroupOptions] = useState([]); // 存储从接口获取的组别选项
  const [selectedGroups, setSelectedGroups] = useState([]); // 存储用户已选中的组别
  const formRef = useRef<ProFormInstance>(null);
  useEffect(() => {
    setInitialValues({
      ...props.initialValues,
    });
  }, [props.initialValues]);

  async function onOpenChange(open: boolean) {
    console.log('open', open);

    if (open) {
      try {
        const response = await getRoleList({ platform_id: '1', query_all: '1' });
        if (response) {
          // 将角色数据格式化为 ProFormCheckbox.Group 所需的格式
          const options = response.map((role: any) => ({
            label: role.role_name, // 显示角色名
            value: role.role_id, // 角色ID作为值
          }));
          setRoleOptions(options); // 更新复选框选项
          //获取用户组列表数据
          const groupResponse = await getAdminGroupList({ query_all: '1' });
          console.log('res', groupResponse);
          if (groupResponse) {
            const groupOpts = groupResponse.map((group: any) => ({
              label: group.group_name,
              value: group.id,
            }));
            setGroupOptions(groupOpts);
          }
        }
        console.log('id', props.initialValues?.admin_id);
        if (!isEmpty(props.initialValues?.admin_id)) {
          // 获取用户已有的角色
          const adminRoleResponse = await getAdminRole({ id: props.initialValues.admin_id });
          // 提取用户已有的角色ID
          const userRoleIds = adminRoleResponse.map((role: any) => role.role_id);
          console.log('updatedRoleOptions', userRoleIds);
          setSelectRoleOptions(userRoleIds);
          formRef.current?.setFieldValue('roles', userRoleIds);
          // 获取用户已经加入的组别
          const groupUserResponse = await listGroupUsers({ id: props.initialValues.admin_id, filed_name: 'admin_id' });
          setSelectedGroups(groupUserResponse); // 设置已选中的组别
          console.log('selectedGroups', selectedGroups);
          formRef.current?.setFieldValue('group_id', groupUserResponse);
          console.log('selectedGroups', groupUserResponse);
        }
      } catch (error) {
        console.error('获取数据失败', error);
      }
    }
  }

  return (
    <div>
      <DrawerForm
        // @ts-ignore
        labelWidth="auto"
        trigger={props.trigger}
        onOpenChange={onOpenChange}
        drawerProps={{ destroyOnClose: true }}
        formRef={formRef}
        onFinish={async (values: any) => {
          const flag = isEmpty(props.initialValues.admin_id);
          console.log('values', flag);
          if (isEmpty(props.initialValues.admin_id)) {
            //新增
            await addAdmin({ ...values });
          } else {
            //修改
            await editAdmin({ ...values, admin_id: props.initialValues.admin_id });
          }
          console.log('values', values);
          message.success('提交成功');
          props.onChange();
          return true;
        }}
        initialValues={initialValues}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="realname"
            label="姓名"
            // tooltip="最长为 24 位"
            placeholder="请输入姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="tel"
            label="手机号"
            placeholder="请输入手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            width="md"
            name="id_card"
            label="身份证号"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入身份证号',
              },
            ]}
          />
          <ProFormText width="md" name="native_place" label="籍贯" placeholder="请输入籍贯" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormSelect
            name="group_id"
            label="用户组"
            width="md"
            mode="multiple"
            placeholder="请选择用户组"
            options={groupOptions} // 动态加载的组别选项
            // convertValue={(value: any) => {
            //   // formRef.current?
            //   if (isEmpty(value)) return selectedGroups;
            //
            //   return value;
            // }}
            // transform={(value) => {
            //   if (isEmpty(value)) return selectedGroups;
            //   return {
            //     group_id: value,
            //   };
            // }}
          />
        </ProForm.Group>
        <ProFormRadio.Group
          name="state"
          label="是否禁用"
          radioType={'button'}
          options={[
            {
              label: '启用',
              value: 1,
            },
            {
              label: '禁用',
              value: 0,
            },
          ]}
          rules={[{ required: true, message: '请选择状态' }]}
        />

        <ProFormCheckbox.Group
          name="roles"
          layout="vertical"
          label="选择角色"
          options={roleOptions} // 动态加载的角色选项
          // convertValue={(value: any) => {
          //   if (isEmpty(value)) return selectRoleOptions;
          //   return value;
          // }}
          // transform={(value) => {
          //   console.log();
          //   return {
          //     roles: value,
          //   };
          // }}
          rules={[{ required: true, message: '请选择至少一个角色' }]}
        />
      </DrawerForm>
    </div>
  );
};
