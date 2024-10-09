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
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    ellipsis: true,
    align: 'center',
    width: 250,
    // tooltip: '标题过长会自动收缩',
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
    title: '身份证号',
    width: 300,
    ellipsis: true,
    search: false,
    editable: true,
    dataIndex: 'id_card',
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
