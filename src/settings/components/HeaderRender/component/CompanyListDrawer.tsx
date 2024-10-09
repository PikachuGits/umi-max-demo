import { GithubIssueItem } from '@/pages/MainPlatform/Company/List/typings';
import { getCompanyListToTable } from '@/services/company/CompanyController';
import { ProList } from '@ant-design/pro-components';
import { Drawer, Input, Space, Tag, Typography } from 'antd';
import React from 'react';

export default (props: any) => {
  const onClose = () => {
    props.setOpen(false);
  };

  return (
    <Drawer title="快速进入公司入口" width={550} closable={false} placement="left" onClose={onClose} open={props.open}>
      <ProList<GithubIssueItem>
        search={{}}
        rowKey="name"
        request={async (params) => {
          // = {} as Record<string, any>
          const { current, ...values } = params;
          return await getCompanyListToTable({
            ...values,
            page: current,
          });
        }}
        pagination={{
          pageSize: 10,
          size: 'small',
          // itemRender: (props) => {
          //   return <div>123</div>;
          // },
        }}
        showActions="hover"
        form={{
          layout: 'inline', // 使用 'vertical' 布局将 label 放在上方
          labelCol: { span: 0 }, // 自定义 label 的宽度
          size: 'middle',
          className: 'drawer-company-list-search',
        }}
        metas={{
          title: {
            dataIndex: 'company',
            title: '公司名称',
            render: (_) => {
              return (
                <Typography.Text style={{ width: '180px' }} ellipsis={{ tooltip: _ }}>
                  {_}
                </Typography.Text>
              );
            },
            renderFormItem: () => {
              return (
                <Input
                  // 自定义配置
                  placeholder="请输入公司名称"
                />
              );
            },
          },
          avatar: {
            dataIndex: 'logoBase64',
            search: false,
          },
          description: {
            dataIndex: 'address',
            search: false,
            render: (text: React.ReactNode) => {
              return (
                <Typography.Text type={'secondary'} ellipsis={{ tooltip: text }}>
                  {text}
                </Typography.Text>
              );
            },
          },
          subTitle: {
            dataIndex: 'legalPerson',
            render: (_, row) => {
              return (
                <Space size={0}>
                  <Tag color="blue">{row.legalPerson}</Tag>
                  <Tag>{row.mobile}</Tag>
                </Space>
              );
            },
            search: false,
          },
          actions: {
            render: (text, row) => [
              <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
                进入公司
              </a>,
            ],
            search: false,
          },
        }}
      />
    </Drawer>
  );
};
