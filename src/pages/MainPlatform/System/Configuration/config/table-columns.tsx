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
    dataIndex: 'config_id',
    fixed: 'left',
    width: 48,
    search: false,
    align: 'center',
  },
  {
    title: '父级ID',
    dataIndex: 'parent_id',
    width: 100,
    align: 'center',
    search: false,
  },
  {
    title: '配置编码',
    dataIndex: 'config_code',
    width: 100,
    align: 'center',
    search: false,
  },
  {
    title: '配置名称',
    dataIndex: 'config_name',
    width: 150,
    align: 'center',
    search: true,
  },
  {
    title: '配置内容',
    dataIndex: 'config_value',
    width: 230,
    align: 'center',
    search: false,
  },
  {
    title: '配置备注',
    dataIndex: 'config_remark',
    width: 100,
    align: 'center',
    search: false,
  },
  {
    title: '配置排序',
    dataIndex: 'config_sort',
    width: 100,
    align: 'center',
    search: false,
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    width: 200,
    align: 'center',
    search: false,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time',
    width: 200,
    align: 'center',
    search: false,
  },
  {
    title: '操作',
    dataIndex: 'action',
    valueType: 'option',
    key: 'option',
    align: 'center',
    width: 100,
  },
];
