import { ProTableEditableFnType } from '@ant-design/pro-components';
import React from 'react';

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
  [key: string]: any;
};

type FuncColumnsProps = {
  editable:
    | ((false | ProTableEditableFnType<GithubIssueItem>) & (boolean | ProTableEditableFnType<GithubIssueItem>))
    | undefined;
};

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableCellProps {
  title: React.ReactNode | string;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  rules?: [];
  handleSave: (data: any, record: Item) => void;
}
