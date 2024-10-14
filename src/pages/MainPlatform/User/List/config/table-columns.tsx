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
    dataIndex: 'admin_id',
    fixed: 'left',
    width: 48,
    search: false,
    align: 'center',
  },
  {
    title: '用户名',
    width: 300,
    ellipsis: true,
    search: false,
    editable: true,
    dataIndex: 'username',
  },
  {
    title: '姓名',
    width: 300,
    ellipsis: true,
    search: false,
    editable: true,
    dataIndex: 'realname',
  },
  {
    title: '手机号',
    width: 300,
    ellipsis: true,
    search: false,
    editable: true,
    dataIndex: 'tel',
  },
  {
    title: '性别',
    width: 300,
    ellipsis: true,
    component: 'Select',
    search: false,
    editable: true,
    dataIndex: 'sex',
  },
  {
    title: '身份证号',
    width: 300,
    ellipsis: true,
    search: false,
    editable: true,
    dataIndex: 'id_card',
  },
  {
    title: '籍贯',
    width: 300,
    ellipsis: true,
    search: false,
    editable: true,
    dataIndex: 'native_place',
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
