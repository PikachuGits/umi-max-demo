import { GithubIssueItem } from '@/pages/MainPlatform/Company/List/typings';
import { getCompanyListToTable } from '@/services/company/CompanyController';
import { ProList } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Space, Tag, Typography } from 'antd';
import { useMemo } from 'react';
interface Props {
  containerStyle: {
    width: number;
    height: number;
  };
  setOpen?: (open: boolean) => void;
}

/**
 * 分三级 公司 用户 项目, 其中 第一次选择 会在公司和用户中选择, 如果选择了公司,第二次就在项目和用户中做选择,
 * 如果第一次选择了用户,第二次只能是公司,最后是项目.
 * 每次选择会跳转页面, 如选择公司,跳转到公司, 然后在公司页面选择跳转项目或用户,然后选择剩余的那一个
 * 选择用户也是类似的, 如今我希望通过query参数区分, 那么我应该怎么设计query参数才能区分
 *
 * @param props
 */

export default (props: Props) => {
  const calculateColumn = (width: number) => {
    console.log(width);
    if (width > 1600) return 4;
    if (width > 1100) return 3;
    if (width > 780) return 2;
    return 1;
  };
  const [searchParams, setSearchParams] = useSearchParams();

  const column = useMemo(() => calculateColumn(props.containerStyle.width), [props.containerStyle.width]);

  const calculateTitleWidth = useMemo(() => {
    return props.containerStyle.width / (column * 2) - 50 + 'px';
  }, [props.containerStyle.width, column]);

  const checkToObject = (type: string, id: number) => {
    const queryParamsArray = Object.fromEntries(searchParams.entries());
    console.log(type, id, queryParamsArray);
    /**
     * level 选择等级
     * platform_id 对应平台id
     * platform_entity_id 对应平台实体id
     * admin_id 用户id
     * type 对应当前应该查询的页面
     */
    setSearchParams({
      level: '',
      platform_id: '',
      platform_entity_id: '',
      admin_id: '',
      type: '',
    });
  };

  return (
    <ProList<GithubIssueItem>
      search={{}}
      headerTitle="用户授权列表"
      rowKey="name"
      request={async (params) => {
        const { current, ...values } = params;
        return await getCompanyListToTable({
          ...values,
          page: current,
        });
      }}
      pagination={{
        pageSize: 5,
        size: 'small',
      }}
      showActions="always"
      form={{
        layout: 'inline',
        size: 'middle',
      }}
      grid={{ column }}
      metas={{
        title: {
          dataIndex: 'company',
          title: '公司名称',
          render: (_) => (
            <Typography.Text style={{ width: calculateTitleWidth }} ellipsis={{ tooltip: _ }}>
              {_}
            </Typography.Text>
          ),
        },
        avatar: {
          dataIndex: 'logoBase64',
          search: false,
          render: (logo) => <div style={{ paddingRight: '10px' }}>{logo}</div>,
        },
        content: {
          dataIndex: 'address',
          search: false,
          render: (address) => (
            <Typography.Text type="secondary" ellipsis={{ tooltip: address }}>
              {address}
            </Typography.Text>
          ),
        },
        subTitle: {
          dataIndex: 'legalPerson',
          title: '法人名称',
          render: (_, row) => (
            <Space size={0}>
              <Tag color="blue">{row.legalPerson}</Tag>
              <Tag>{row.mobile}</Tag>
            </Space>
          ),
        },
        actions: {
          cardActionProps: 'actions',
          render: (text, row) => {
            // console.log(row);
            return [
              <a key="user" onClick={() => checkToObject('user', row.id)}>
                授权用户
              </a>,
              <a key="project" onClick={() => checkToObject('project', row.id)}>
                授权项目
              </a>,
            ];
          },
          search: false,
        },
      }}
    />
  );
};
