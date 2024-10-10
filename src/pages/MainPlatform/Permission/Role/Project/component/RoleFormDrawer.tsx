import TitleNode from '@/pages/MainPlatform/System/Menu/component/MenuTree/TitleNode';
import { addRole, editRole, getMenuList, getRoleMenuList } from '@/services/role/RoleController';
import { isEmpty } from '@/utils/format';
import { DrawerForm, ProForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message, Tree, TreeProps } from 'antd';
import React, { Key, useEffect, useState } from 'react';

export default (props: any) => {
  const [initialValues, setInitialValues] = useState({});
  const [treeData, setTreeData] = useState([]); // 添加状态存储树形菜单数据
  const [selectTreeData, setSelectTreeData] = useState<Key[] | { checked: Key[]; halfChecked: Key[] }>([]); // 回显数据用
  /** 展开树的键值 */
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    console.log(props.initialValues);
    setInitialValues({
      ...props.initialValues,
      logoBase64: [{ name: 'logo', url: props.initialValues?.logoBase64 }],
    });
  }, [props.initialValues]);

  async function onOpenChange(open: boolean) {
    console.log('Open', open);
    if (open) {
      if (props.initialValues) {
        //编辑需要回显树
        const result = await getMenuList({ platform_id: '3' });
        const selectTree = await getRoleMenuList({ role_id: props.initialValues.role_id });
        setTreeData(result);
        setSelectTreeData(selectTree);
        // setExpandedKeys(selectTree);
        // console.log(selectTree);
      } else {
        const result = await getMenuList({ platform_id: '3' });
        setTreeData(result);
        console.log(result);
      }
    }
  }
  /**
   * 点击树节点时会触发该方法
   * @param selectedKeys
   * @param info
   */
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    props.onCheck(selectedKeys, info, 'isSelect');
  };

  /**
   * 点击复选框时触发
   * @param checkedKeys
   * @param info
   */
  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    //console.log(checkedKeys, info, 'isCheck');
    console.log('checkedKeys', checkedKeys);
    setSelectTreeData(checkedKeys);
    console.log('info', info);
  };
  ``;
  return (
    <div>
      <DrawerForm
        // @ts-ignore
        labelWidth="auto"
        trigger={props.trigger}
        onOpenChange={onOpenChange}
        drawerProps={{ destroyOnClose: true }}
        onFinish={async (values: any) => {
          if (isEmpty(props.initialValues?.id)) {
            await addRole({ ...values, menu: selectTreeData, platform_id: '3' });
          } else {
            await editRole({
              ...values,
              role_id: props.initialValues.role_id,
              menu: selectTreeData,
            });
          }
          message.success('提交成功');
          props.onChange();
          console.log('Closing drawer'); // 调试日志
          return true;
        }}
        initialValues={initialValues}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="role_name"
            label="角色名称"
            // tooltip="最长为 24 位"
            placeholder="请输入公司名称"
            rules={[
              {
                required: true,
                message: '请输入公司名称',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="status"
            label="状态"
            options={[
              {
                value: '1',
                label: '启用',
              },
              {
                value: '0',
                label: '停用',
              },
            ]}
            rules={[
              {
                required: true,
                message: '请选择状态',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea width="md" name="remarks" label="备注" placeholder="请输入" />
        </ProForm.Group>
        <ProForm.Group>
          <Tree
            checkable
            showLine={true}
            titleRender={({ title, type, icon }: any) => {
              return TitleNode({ children: title, tag: type, icon: icon, setOperation: props.setOperation });
            }}
            expandedKeys={expandedKeys}
            onExpand={(expandedKeys) => setExpandedKeys(expandedKeys)}
            onSelect={onSelect}
            onCheck={onCheck}
            selectable={true}
            checkedKeys={selectTreeData}
            blockNode
            fieldNames={{ key: 'id' }}
            treeData={treeData}
          />
        </ProForm.Group>
      </DrawerForm>
    </div>
  );
};
