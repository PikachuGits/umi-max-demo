import Loading from '@/components/Loading/loading';
import { GithubIssueItem } from '@/pages/MainPlatform/Company/List/typings';
import { AuthDrawerTable } from '@/pages/MainPlatform/Permission/Authorize/components/index';
import { calculateColumn } from '@/pages/MainPlatform/Permission/Authorize/config';
import { userColumns } from '@/pages/MainPlatform/Permission/Authorize/config/auth-drawer-table-columns';
import { getRoleList, getUserPlatformRelationsByUser, setRelations } from '@/services/auth/AuthController';
import { getAdminList } from '@/services/user/UserController';
import { onConvertCheckBox } from '@/utils/format';
import { ProList } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Checkbox, message, Space, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';
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
  // 记录绑定关系是否成功
  const [relationType, setRelationType] = useState(false);

  const column = useMemo(() => calculateColumn(props.containerStyle.width), [props.containerStyle.width]);

  const calculateTitleWidth = useMemo(() => {
    return props.containerStyle.width / (column * 2) - 50 + 'px';
  }, [props.containerStyle.width, column]);

  const { level, platform_id, platform_entity_id, type } = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  /**
   * 获取和平台实体有绑定关系的用户id列表
   * 不分页
   */
  const adminIds = useRequest(getUserPlatformRelationsByUser, {
    defaultParams: [{ platform_id: platform_id, query_all: 1, id: platform_entity_id }],
  });
  // 将用户id列表放入到selectedRowKeys传给DrawerTable默认选中项
  const selectedRowKeys = useMemo(() => {
    if (adminIds.loading) return [];
    return adminIds.data;
  }, [adminIds.loading]);

  /**
   * 获取角色列表
   * 不分页
   */
  const roleList = useRequest(getRoleList, {
    defaultParams: [{ platform_id: platform_id, query_all: 1 }],
  });

  // 整形角色列表转为 {label,value} 形式
  const roleOptions = useMemo(() => {
    if (roleList.loading) return [];
    return onConvertCheckBox(roleList.data, { label: 'role_name', value: 'role_id' });
  }, [roleList.loading]);

  const setRelationsApi = useRequest(setRelations, {
    manual: true,
    onSuccess: (data) => {
      if (data) {
        setRelationType(true);
      } else {
        message.error('服务器返回结果为false');
      }
    },
  });

  /**
   * 选择切换页面
   * level 选择等级 platform_id 对应平台id platform_entity_id 对应平台实体id admin_id 用户id type 对应当前应该查询的页面
   * platform_id 举例:
   *      如果上一级是公司, 则对应要查询的platform_id是公司平台的id, 等于2;
   *      如果上一级是项目, 则对应要查询的platform_id是项目平台的id, 等于3;
   *      ( 这里的平台id只的是类型, 1 总平台 2 公司平台 3 项目平台 )
   * @param type
   * @param row
   */
  const checkToObject = (type: string, row: any) => {
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    dispatch({
      type: 'auth/setAuthLevel',
      payload: { level, info: { name: row.realname, ...searchParamsObject } },
    });

    setSearchParams({
      level: `${parseInt(level) + 1}`,
      platform_id: `${parseInt(level) + 1}`,
      platform_entity_id,
      admin_id: row.admin_id,
      type: type,
    });
  };

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
          case '3':
            return await getUserPlatformRelationsByUser({
              ...values,
              page: current,
              id: platform_entity_id,
              platform_id,
            });
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
          render: () =>
            roleList.loading ? (
              <Loading tips={'正在加载角色'} />
            ) : (
              <Checkbox.Group options={roleOptions} onChange={onChange} />
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
              level === '1' ? (
                <a key="company" onClick={() => checkToObject('company', row)}>
                  授权公司
                </a>
              ) : (
                <a key="project" onClick={() => checkToObject('project', row)}>
                  授权项目
                </a>
              ),
            ];
          },
          search: false,
        },
      }}
      toolBarRender={(event, row) => {
        return [
          <AuthDrawerTable
            key={type}
            trigger={
              <Button key="3" type="primary">
                绑定/解绑 用户
              </Button>
            }
            loading={setRelationsApi.loading}
            title={'绑定用户'}
            columns={userColumns}
            onSubmit={(params: any) => {
              const data: {
                admin_id: number;
                platform_id: number;
                platform_entity_id: number;
              }[] = [];
              params.forEach((admin_id: number) => {
                data.push({
                  admin_id,
                  platform_id: parseInt(platform_id),
                  platform_entity_id: parseInt(platform_entity_id),
                });
              });
              setRelationsApi.run({ relations: data });
              // 提交方法
              return relationType;
            }}
            rowKey={'admin_id'}
            request={async (params: any) => {
              const { current, ...values } = params;
              return await getAdminList({
                ...values,
                page: current,
              });
            }}
            selectedRowKeys={selectedRowKeys}
          />,
        ];
      }}
    />
  );
};
