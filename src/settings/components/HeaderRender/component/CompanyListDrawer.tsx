import { GithubIssueItem } from '@/pages/MainPlatform/Company/List/typings';
import { getCompanyListToTable } from '@/services/company/CompanyController';
import { ProList } from '@ant-design/pro-components';
import { Drawer, Input, Space, Tag, Typography } from 'antd';
import React from 'react';

const dataSource: GithubIssueItem[] = [
  {
    url: 'https://example.com/issue/1',
    id: 1,
    number: 1,
    title: 'This is a very long title that should be truncated',
    labels: [{ name: 'bug', color: 'red' }],
    state: 'open',
    comments: 5,
    created_at: '2024-01-01',
    updated_at: '2024-01-02',
    ellipsis: true,
  },
];

export default (props: any) => {
  const onClose = () => {
    props.setOpen(false);
  };

  return (
    <Drawer title="快速进入公司入口" width={500} closable={false} placement="left" onClose={onClose} open={props.open}>
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
          // optionRender: (searchConfig, formProps, dom) => (
          //   <div style={{ display: 'flex', alignItems: 'center', border: '1px solid' }}>
          //     <Button type="primary" onClick={() => formProps?.form?.submit()} style={{ marginLeft: 8 }}>
          //       搜索
          //     </Button>
          //     <Button onClick={() => formProps?.form?.resetFields()} style={{ marginLeft: 8 }}>
          //       重置
          //     </Button>
          //   </div>
          // ),
          // style: { border: '1px solid', padding: '0' },
        }}
        metas={{
          title: {
            dataIndex: 'company',
            title: '公司名称',
            render: (_, row) => {
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
          // status: {
          //   search: false,
          //   // 自己扩展的字段，主要用于筛选，不在列表中显示
          //   title: '状态',
          //   valueType: 'select',
          //   valueEnum: {
          //     all: { text: '全部', status: 'Default' },
          //     open: {
          //       text: '未解决',
          //       status: 'Error',
          //     },
          //     closed: {
          //       text: '已解决',
          //       status: 'Success',
          //     },
          //     processing: {
          //       text: '解决中',
          //       status: 'Processing',
          //     },
          //   },
          // },
        }}
      />
    </Drawer>
  );
};
