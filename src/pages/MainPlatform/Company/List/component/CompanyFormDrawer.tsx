import { addCompany, editCompanyInfo } from '@/services/company/CompanyController';
import { DrawerForm, ProForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default (props: any) => {
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    if (props.initialValues?.id) {
      setInitialValues({
        ...props.initialValues,
        logoBase64: [{ name: 'logo', url: props.initialValues?.logoBase64 }],
      });
    } else {
      // 如果是新增的情况，可以清空 initialValues
      setInitialValues({});
    }
  }, [props.initialValues]);

  return (
    <div>
      <DrawerForm
        // @ts-ignore
        labelWidth="auto"
        trigger={props.trigger}
        drawerProps={{ destroyOnClose: true }}
        onFinish={async (values: any) => {
          const formData = {
            ...values,
            logoBase64: values.logoBase64[0].thumbUrl, // Pass Base64 string to the backend
          };

          if (props.initialValues?.id) {
            console.log(props.initialValues?.id, values);
            await editCompanyInfo({ ...formData, id: props.initialValues?.id });
            return true;
          } else {
            console.log('values', values.logoBase64);
            await addCompany(formData);
          }

          message.success('提交成功');
          props.onChange();
          return true;
        }}
        initialValues={initialValues}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="company"
            label="公司名称"
            // tooltip="最长为 24 位"
            placeholder="请输入公司名称"
            rules={[
              {
                required: true,
                message: '请输入公司名称',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="company_type"
            label="公司类型"
            placeholder="请输入名称"
            rules={[
              {
                required: true,
                message: '请输入类型',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="short"
            label="中文简称"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入中文简称',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="legalPerson"
            label="法人"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入法人',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="legalPerson_id"
            label="法人身份证号"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入法人身份证号',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="code"
            label="英文简称"
            placeholder="用于生成本公司项目编号只允许包含大写字母和数字"
            rules={[
              {
                required: true,
                message: '请输入企业简称',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="mobile"
            label="联系电话"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入联系电话',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="address"
            label="地址"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入地址',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="tin"
            label="社会统一信用代码"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入社会统一信用代码',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormUploadButton
            name="logoBase64"
            label="公司logo"
            max={1}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
            }}
          />
        </ProForm.Group>
        {/*<ProForm.Group>*/}
        {/*  <ProFormText name={['contract', 'name']} width="md" label="合同名称" placeholder="请输入名称" />*/}
        {/*  <ProFormDateRangePicker width="md" name={['contract', 'createTime']} label="合同生效时间" />*/}
        {/*</ProForm.Group>*/}
        {/*<ProForm.Group>*/}
        {/*  <ProFormSelect*/}
        {/*    options={[*/}
        {/*      {*/}
        {/*        value: 'chapter',*/}
        {/*        label: '盖章后生效',*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*    readonly*/}
        {/*    width="xs"*/}
        {/*    name="useMode"*/}
        {/*    label="合同约定生效方式"*/}
        {/*  />*/}
        {/*  <ProFormSelect*/}
        {/*    width="xs"*/}
        {/*    options={[*/}
        {/*      {*/}
        {/*        value: 'time',*/}
        {/*        label: '履行完终止',*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*    name="unusedMode"*/}
        {/*    label="合同约定失效效方式"*/}
        {/*  />*/}
        {/*</ProForm.Group>*/}
        {/*<ProFormText width="sm" name="id" label="主合同编号" />*/}
        {/*<ProFormText name="project" width="md" disabled label="项目名称" initialValue="xxxx项目" />*/}
        {/*<ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />*/}
      </DrawerForm>
    </div>
  );
};
