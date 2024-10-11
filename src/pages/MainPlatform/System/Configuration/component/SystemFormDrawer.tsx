import { addConfig, editConfig } from '@/services/system/SystemController';
import { isEmpty } from '@/utils/format';
import { DrawerForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default (props: any) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    console.log(props.initialValues);
    setInitialValues({
      ...props.initialValues,
    });
  }, [props.initialValues]);

  async function onOpenChange(open: boolean) {
    console.log('Open', open);
  }
  return (
    <div>
      <DrawerForm
        // @ts-ignore
        labelWidth="auto"
        width={600}
        trigger={props.trigger}
        onOpenChange={onOpenChange}
        drawerProps={{ destroyOnClose: true }}
        onFinish={async (values: any) => {
          console.log('id', props.initialValues?.config_id);
          if (isEmpty(props.initialValues?.config_id)) {
            await addConfig({ ...values });
            return true;
          } else {
            await editConfig({
              ...values,
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
            width="lg"
            name="parent_id"
            label="父级ID:"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入父级ID',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="lg"
            name="config_code"
            label="配置编码:"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入配置编码',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="lg"
            name="config_name"
            label="配置名称:"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入配置名称',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="lg"
            name="config_value"
            label="配置内容:"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入配置内容',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="lg"
            name="config_remark"
            label="配置备注:"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入配置备注',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="lg"
            name="config_sort"
            label="配置排序:"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入配置排序',
              },
            ]}
          />
        </ProForm.Group>
      </DrawerForm>
    </div>
  );
};
