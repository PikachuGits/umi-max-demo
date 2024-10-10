import React from 'react';

type DataType = {
  id: React.Key;
  company: string;
  code: string;
  address: string;
  tin: string;
  company_type: string;
  sort: number;
  role_name: string;
  // 其他必要字段...
};

export const defaultColumns: BgptColumnTypes<DataType> = [
  {
    title: '角色名称',
    dataIndex: 'role_name',
    key: 'role_name',
    ellipsis: true,
    align: 'center',
    width: 150,
    // tooltip: '标题过长会自动收缩',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 70,
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 70,
    align: 'center',
    search: false,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 120,
    align: 'center',
    search: false,
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    width: 120,
    align: 'center',
    search: false,
  },
  {
    title: '操作',
    dataIndex: 'action',
    valueType: 'option',
    key: 'option',
    align: 'center',
    fixed: 'right',
    width: 20,
  },
];
