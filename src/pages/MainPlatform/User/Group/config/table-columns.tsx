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
    title: '用户组名',
    dataIndex: 'group_name',
    key: 'group_name',
    ellipsis: true,
    align: 'center',
    width: 250,
    // tooltip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '创建时间',
    width: 300,
    ellipsis: true,
    search: false,
    editable: true,
    dataIndex: 'created_time',
  },
  {
    title: '更新时间',
    width: 300,
    ellipsis: true,
    search: false,
    editable: true,
    dataIndex: 'updated_time',
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
  // {
  //   title: '操作',
  //   valueType: 'option',
  //   key: 'option',
  //   align: 'center',
  //   fixed: 'right',
  //   width: 100,
  //   render: () => {
  //     // text: string, record: object, _, action
  //     return (
  //       <div>
  //         <a style={{ padding: '5px' }} key="editable" onClick={() => {}}>
  //           <FormOutlined />
  //         </a>
  //         <a style={{ padding: '5px' }} key="delete" onClick={() => {}}>
  //           <DeleteOutlined style={{ color: 'red' }} />
  //         </a>
  //       </div>
  //     );
  //   },
  // },
];
