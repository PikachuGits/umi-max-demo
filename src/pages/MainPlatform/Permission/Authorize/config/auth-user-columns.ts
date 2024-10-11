import { GithubIssueItem } from '@/pages/MainPlatform/Company/List/typings';
import { ProColumns } from '@ant-design/pro-components';

export const userColumns: ProColumns<GithubIssueItem>[] = [
  {
    title: '用户名称',
    dataIndex: 'realname',
    ellipsis: true,
    // tooltip: '标题过长会自动收缩',
  },
  {
    title: '手机号',
    dataIndex: 'tel',
    ellipsis: true,
    // tooltip: '标题过长会自动收缩',
  },
];
