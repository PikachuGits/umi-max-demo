import { ReactComponent as More } from '@/assets/images/svg/more.svg';
import LazyLoadable from '@/components/LazyLoadable';
import { classes_module } from '@/utils/class-module';
import { isEmpty } from '@/utils/format';
import Icons, * as AntdIcons from '@ant-design/icons';
import { ProForm, ProFormGroup, ProFormInstance, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { Suspense, useRef, useState } from 'react';
import styles from '../../styles/component/menu-form.less';
import IconSelect from '../IconSelect';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
interface InitialValuesType {
  node_type?: 1;
  name?: '杰作';
  icon?: '';
}

export default ({ initialValues }: { initialValues: InitialValuesType }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  //  form 对象
  const formRef = useRef<ProFormInstance>();

  /**+
   * icon 表单的Before ReactNode
   * @constructor
   */
  const IconBeforeNode = () => {
    const icon: keyof typeof AntdIcons | undefined = formRef?.current?.getFieldValue('icon');
    return !isEmpty(icon) ? (LazyLoadable(AntdIcons[icon] as any) as React.ReactNode) : '';
  };

  /**+
   * icon 表单的after ReactNode
   * @constructor
   */
  const IconAfterNode = () => (
    <IconSelect
      popoverOpen={popoverOpen}
      onChange={(icon) => formRef?.current?.setFieldValue('icon', icon)}
      setPopoverOpen={setPopoverOpen}
    >
      <Icons
        onClick={() => setPopoverOpen(!popoverOpen)}
        className={classes_module(styles, 'after-icon')}
        component={() => <More />}
      />
    </IconSelect>
  );

  return (
    <Suspense>
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
        initialValues?: InitialValuesType;
      }>
        formRef={formRef}
        labelCol={{ span: 6 }}
        labelAlign="right"
        layout={'horizontal'}
        initialValues={{ node_type: 1, ...initialValues }}
        grid={true}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
        }}
        submitter={{
          searchConfig: {
            resetText: '重置',
            submitText: '保存修改',
          },
          render: (props, doms) => {
            return <div className={classes_module(styles, 'form-button-group', 'button')}>{doms}</div>;
          },
        }}
      >
        <ProFormGroup>
          <ProFormRadio.Group
            name="node_type"
            label="节点类型"
            radioType="button"
            colProps={{ span: 12 }}
            options={[
              {
                label: '菜单',
                value: 1,
              },
              {
                label: '按钮',
                value: 2,
              },
            ]}
          />
          <ProFormRadio.Group
            name="node_type"
            label="归属平台"
            radioType="button"
            colProps={{ span: 12 }}
            options={[
              {
                label: '系统平台',
                value: 1,
              },
              {
                label: '公司',
                value: 2,
              },
              {
                label: '项目',
                value: 3,
              },
            ]}
          />
        </ProFormGroup>
        <ProFormText width="md" colProps={{ span: 12 }} name="parent_id" label="上级菜单" placeholder="请输入名称" />
        <ProFormText width="md" colProps={{ span: 12 }} name="parent_id" label="权限标识" placeholder="请输入名称" />
        <ProFormText width="md" colProps={{ span: 12 }} name="parent_id" label="菜单名称" placeholder="请输入名称" />
        <ProFormText width="md" colProps={{ span: 12 }} name="parent_id" label="排序" placeholder="请输入名称" />
        <ProFormText width="md" colProps={{ span: 12 }} name="parent_id" label="路由地址" placeholder="请输入名称" />
        <ProFormText width="md" colProps={{ span: 12 }} name="parent_id" label="组件路径" placeholder="请输入名称" />
        <ProFormText
          width="md"
          colProps={{ span: 12 }}
          name="icon"
          label="图标"
          placeholder="请输入名称"
          fieldProps={{
            // className: classes_module(styles, 'antd-icon-input'),
            disabled: true,
            addonBefore: <IconBeforeNode />,
            addonAfter: <IconAfterNode />,
            onFocus: () => setPopoverOpen(true),
          }}
        />

        <ProFormRadio.Group
          name="node_type"
          label="节点状态"
          radioType="button"
          colProps={{ span: 12 }}
          options={[
            {
              label: '启用',
              value: 1,
            },
            {
              label: '禁用',
              value: 2,
            },
          ]}
        />
      </ProForm>
    </Suspense>
  );
};
