import Loading from '@/components/Loading/loading';
import { GithubIssueItem } from '@/pages/MainPlatform/Company/List/typings';
import { AuthDrawerTable } from '@/pages/MainPlatform/Permission/Authorize/components/index';
import { calculateColumn } from '@/pages/MainPlatform/Permission/Authorize/config';
import { userColumns } from '@/pages/MainPlatform/Permission/Authorize/config/auth-drawer-table-columns';
import { getRoleList } from '@/services/auth/AuthController';
import { getAdminList } from '@/services/user/UserController';
import { isEmpty, onConvertCheckBox } from '@/utils/format';
import { useModel } from '@@/plugin-model';
import { ActionType, ProList } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Checkbox, Space, Tag, Typography } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  /** 获取管理的api */
  const {
    setRelationsApi,
    getRelationUserListReq,
    getAdminListReq,
    setRoleRelationsReq,
    setRoleRelationAllReq,
    getAdminIds,
  } = useModel('authModel');

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userListRef = useRef<ActionType>(null);

  const column = useMemo(() => calculateColumn(props.containerStyle.width), [props.containerStyle.width]);

  const calculateTitleWidth = useMemo(() => {
    return props.containerStyle.width / (column * 2) - 50 + 'px';
  }, [props.containerStyle.width, column]);

  const { level, platform_id, platform_entity_id, type } = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  /** 获取角色列表 不分页 */
  const roleList = useRequest(getRoleList, {
    defaultParams: [{ platform_id: platform_id, query_all: 1 }],
  });

  /** 整形角色列表转为 {label,value} 形式*/
  const roleOptions = useMemo(() => {
    if (roleList.loading) return [];
    return onConvertCheckBox(roleList.data, { label: 'role_name', value: 'role_id' });
  }, [roleList.loading]);

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

  function onSetRoleId(roles: any[], row: any) {
    const { relation_id } = row;
    // 开启loading
    setLoading(true);
    setRoleRelationsReq.runAsync({ relation_id, roles }).then(() => {
      userListRef.current?.reload();
    });
  }
  function onSetRoleIdAll(row: any) {
    const { relation_id } = row;
    // 开启loading
    setLoading(true);
    setRoleRelationAllReq
      .runAsync({ relation_id, platform_id: parseInt(platform_id), platform_entity_id: parseInt(platform_entity_id) })
      .then(() => {
        userListRef.current?.reload();
      });
  }

  useEffect(() => {
    switch (level) {
      case '2':
      case '3':
        setLoading(getRelationUserListReq.loading);
        return;
      default:
        setLoading(getAdminListReq.loading);
        return;
    }
  }, [getAdminListReq.loading, getRelationUserListReq.loading]);

  return (
    <ProList<GithubIssueItem>
      search={{}}
      headerTitle="用户授权列表"
      actionRef={userListRef}
      loading={loading}
      rowKey="name"
      request={async (params) => {
        // setLoading(true);
        const { current, ...values } = params;

        switch (level) {
          case '2':
          case '3':
            return await getRelationUserListReq.runAsync({
              ...values,
              page: current,
              id: platform_entity_id,
              platform_id,
            });
          default:
            return await getAdminListReq.runAsync({
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
          render: (_, row) => {
            const { role_ids } = row;
            const ids = isEmpty(role_ids) ? [] : role_ids.split(',').map(Number);
            return roleList.loading ? (
              <Loading tips={'正在加载角色'} />
            ) : (
              <Checkbox.Group value={ids} options={roleOptions} onChange={(e) => onSetRoleId(e, row)} />
            );
          },
        },
        subTitle: {
          dataIndex: 'tel',
          title: '用户手机号',
          render: (_, row) => {
            return (
              <Space size={0}>
                <Tag color="blue">{_}</Tag>
                <Button color="danger" variant="dashed" size="small" onClick={() => onSetRoleIdAll(row)}>
                  同步角色
                </Button>
              </Space>
            );
          },
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
      toolBarRender={() => {
        return [
          <AuthDrawerTable
            key={type}
            trigger={
              <Button loading={loading} key="3" type="primary">
                绑定/解绑 用户
              </Button>
            }
            loading={setRelationsApi.loading || getAdminIds.loading}
            title={'绑定用户'}
            columns={userColumns}
            onSubmit={async (params: any) => {
              const data = {
                relations: {
                  platform_id: parseInt(platform_id),
                  platform_entity_id: parseInt(platform_entity_id),
                },
                ids: params,
                type: 'user',
              };

              await setRelationsApi.runAsync(data);
              userListRef.current?.reload();
            }}
            rowKey={'admin_id'}
            request={async (params: any) => {
              const { current, ...values } = params;
              return await getAdminList({
                ...values,
                page: current,
              });
            }}
            onChangeOpen={async () => {
              return await getAdminIds.runAsync({ platform_id: platform_id, query_all: 1, id: platform_entity_id });
            }}
          />,
        ];
      }}
    />
  );
};
