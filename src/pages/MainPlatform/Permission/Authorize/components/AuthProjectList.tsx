import { GithubIssueItem } from '@/pages/MainPlatform/Company/List/typings';
import { calculateColumn } from '@/pages/MainPlatform/Permission/Authorize/config';
import { getRoleList, getUserPlatformRelationsByUser } from '@/services/auth/AuthController';
import { getAdminList } from '@/services/user/UserController';
import { onConvertCheckBox } from '@/utils/format';
import { ProList } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Checkbox, Space, Tag, Typography } from 'antd';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const column = useMemo(() => calculateColumn(props.containerStyle.width), [props.containerStyle.width]);

  const calculateTitleWidth = useMemo(() => {
    return props.containerStyle.width / (column * 2) - 50 + 'px';
  }, [props.containerStyle.width, column]);

  const { level, platform_id, platform_entity_id, admin_id } = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  const { data, error, loading } = useRequest(getRoleList, {
    defaultParams: [{ platform_id: 2, query_all: 1 }],
  });
  const roleOptions = useMemo(() => {
    if (loading) return [];
    return onConvertCheckBox(data, { label: 'role_name', value: 'role_id' });
  }, [loading]);

  const checkToObject = (type: string, row: any) => {
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    dispatch({
      type: 'auth/setAuthLevel',
      payload: { level, info: { name: row.realname, ...searchParamsObject } },
    });
    /**
     * level 选择等级
     * platform_id 对应平台id
     * platform_entity_id 对应平台实体id
     * admin_id 用户id
     * type 对应当前应该查询的页面
     */
    setSearchParams({
      level: `${parseInt(level) + 1}`,
      platform_id: `3`,
      platform_entity_id: `${row?.id}`,
      admin_id: admin_id,
      type: type,
    });
  };
  // const options = [
  //   { label: 'Apple', value: 'Apple' },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple' },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple' },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  // ];
  function onChange() {}

  return (
    <ProList<GithubIssueItem>
      search={{}}
      headerTitle="用户授权列表"
      rowKey="name"
      request={async (params) => {
        const { current, ...values } = params;
        switch (level) {
          case '2':
            return await getUserPlatformRelationsByUser({
              ...values,
              page: current,
              id: platform_entity_id,
              platform_id,
            });
          case '3':
            break;
          default:
            return await getAdminList({
              ...values,
              page: current,
            });
        }
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
          dataIndex: 'realname',
          title: '用户名称',
          render: (_) => (
            <Typography.Text style={{ width: calculateTitleWidth }} ellipsis={{ tooltip: _ }}>
              {_}
            </Typography.Text>
          ),
        },
        avatar: {
          dataIndex: 'avatar_url',
          search: false,
          render: (logo) => <div style={{ paddingRight: '10px' }}>{logo}</div>,
        },
        content: {
          search: false,
          render: () => (
            <div>
              <Checkbox.Group options={roleOptions} onChange={onChange} />
            </div>
          ),
        },
        subTitle: {
          dataIndex: 'tel',
          title: '用户手机号',
          render: (_) => (
            <Space size={0}>
              <Tag color="blue">{_}</Tag>
            </Space>
          ),
        },
        actions: {
          cardActionProps: 'actions',
          render: (text, row) => {
            // console.log(row);
            return [
              level === '2' && (
                <a key="user" onClick={() => checkToObject('user', row)}>
                  授权用户
                </a>
              ),
            ];
          },
          search: false,
        },
      }}
      toolBarRender={() => {
        return [
          (level === '2' || level === '3') && (
            <Button key="3" type="primary">
              添加项目
            </Button>
          ),
        ];
      }}
    />
  );
};
