import { Tag } from 'antd';
import React from 'react';

type DataType = {
  id: React.Key;
  company: string;
  code: string;
  address: string;
  tin: string;
  company_type: string;
  sort: number;
  // 其他必要字段...
};

export const defaultColumns: BgptColumnTypes<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 48,
    search: false,
    align: 'center',
  },
  {
    title: '公司名称',
    dataIndex: 'company',
    key: 'company',
    ellipsis: true,
    align: 'center',
    width: 250,
    // tooltip: '标题过长会自动收缩',
  },
  {
    title: '企业简称(英文)',
    width: 200,
    dataIndex: 'code',
    search: false,
    align: 'center',
    editable: true,
    render: (_: React.ReactNode) => <Tag color={'red'}>{_}</Tag>,
  },
  {
    title: '公司所在地',
    width: 300,
    ellipsis: true,
    // search: false,
    editable: true,
    search: false,
    align: 'center',
    dataIndex: 'address',
  },
  {
    title: '社会统一信用代码',
    dataIndex: 'tin',
    width: 200,
    editable: true,
    align: 'center',
    search: false,
  },
  {
    title: '公司类型',
    width: 200,
    search: false,
    dataIndex: 'company_type',
    editable: false,
    align: 'center',
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '云盘排序',
    dataIndex: 'sort',
    width: 200,
    search: false,
  },
  {
    title: '操作',
    dataIndex: 'action',
    valueType: 'option',
    key: 'option',
    align: 'center',
    fixed: 'right',
    width: 100,
  },
];
