import { getCompanyListToTable } from '@/services/company/CompanyController';
import { ProList } from '@ant-design/pro-components';
import { Drawer, Input, Space, Tag } from 'antd';
import { useState } from 'react';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default (props: any) => {
  // const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const onClose = () => {
    props.setOpen(false);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
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
          pageSize: 1,
        }}
        showActions="hover"
        form={{
          layout: 'vertical', // 使用 'vertical' 布局将 label 放在上方
          labelCol: { span: 0 }, // 自定义 label 的宽度
        }}
        metas={{
          title: {
            dataIndex: 'company',
            title: '公司名称',
            renderFormItem: () => {
              // const status = form.getFieldValue('company');
              return (
                // value 和 onchange 会通过 form 自动注入。
                <Input
                  // 自定义配置
                  placeholder="请输入公司名称"
                />
              );
            },
            // formItemProps: {
            //   placeholder: '请输入公司名称',
            // },
          },
          avatar: {
            dataIndex: 'logoBase64',
            search: false,
          },
          description: {
            dataIndex: 'address',
            search: false,
          },
          subTitle: {
            dataIndex: 'labels',
            render: (_, row) => {
              return (
                <Space size={0}>
                  {row.labels?.map((label: { name: string }) => (
                    <Tag color="blue" key={label.name}>
                      {label.name}
                    </Tag>
                  ))}
                </Space>
              );
            },
            search: false,
          },
          actions: {
            render: (text, row) => [
              // <a href={row.url} target="_blank" rel="noopener noreferrer" key="link">
              //   链路
              // </a>,
              // <a href={row.url} target="_blank" rel="noopener noreferrer" key="warning">
              //   报警
              // </a>,
              <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
                进入公司
              </a>,
            ],
            search: false,
          },
          status: {
            search: false,
            // 自己扩展的字段，主要用于筛选，不在列表中显示
            title: '状态',
            valueType: 'select',
            valueEnum: {
              all: { text: '全部', status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
              processing: {
                text: '解决中',
                status: 'Processing',
              },
            },
          },
        }}
      />
    </Drawer>
  );
};
