import Loading from '@/components/Loading/loading';
import { GithubIssueItem } from '@/pages/MainPlatform/Company/List/typings';
import { AuthDrawerTable } from '@/pages/MainPlatform/Permission/Authorize/components/index';
import { calculateColumn } from '@/pages/MainPlatform/Permission/Authorize/config';
import { projectColumns } from '@/pages/MainPlatform/Permission/Authorize/config/auth-drawer-table-columns';
import { getRoleList, getUserPlatformRelationsByPlatform } from '@/services/auth/AuthController';
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
    getProjectListWithCompanyReq,
    getUserPlatformRelationsByPlatformReq,
    getAdminIds,
  } = useModel('authModel');

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const projectListRef = useRef<ActionType>(null);
  /**
   * 自适应宽高问题
   */
  const column = useMemo(() => calculateColumn(props.containerStyle.width), [props.containerStyle.width]);

  const calculateTitleWidth = useMemo(() => {
    return props.containerStyle.width / (column * 2) - 50 + 'px';
  }, [props.containerStyle.width, column]);
  /**
   * 获取路由信息
   */
  const { level, platform_id, platform_entity_id, admin_id } = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  /** * 获取角色列表 不分页 */
  const roleList = useRequest(getRoleList, {
    defaultParams: [{ platform_id: platform_id, query_all: 1 }],
  });

  // 整形角色列表转为 {label,value} 形式
  const roleOptions = useMemo(() => {
    if (roleList.loading || level !== '3') return [];
    return onConvertCheckBox(roleList.data, { label: 'role_name', value: 'role_id' });
  }, [roleList.loading]);

  /** 获取和平台实体有绑定关系的用户id列表 不分页 */
  const getProjectIds = useRequest(getUserPlatformRelationsByPlatform, {
    manual: true,
  });

  useEffect(() => {
    switch (level) {
      case '2':
        setLoading(getProjectListWithCompanyReq.loading);
        return;
      case '3':
        setLoading(getUserPlatformRelationsByPlatformReq.loading);
        return;
    }
  }, [getProjectListWithCompanyReq.loading, getUserPlatformRelationsByPlatformReq.loading]);

  const checkToObject = (type: string, row: any) => {
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    dispatch({
      type: 'auth/setAuthLevel',
      payload: { level, info: { name: row.project_name, ...searchParamsObject } },
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
      platform_id: `${parseInt(level) + 1}`,
      platform_entity_id: `${row?.id}`,
      admin_id: admin_id,
      type: type,
    });
  };

  function onSetRoleId(roles: any[], row: any) {
    const { relation_id } = row;
    // 开启loading
    setLoading(true);
    setRoleRelationsReq.runAsync({ relation_id, roles }).then(() => {
      projectListRef.current?.reload();
    });
  }

  function onSetRoleIdAll(row: any) {
    const { relation_id } = row;
    // 开启loading
    setLoading(true);
    setRoleRelationAllReq
      .runAsync({ relation_id, platform_id: parseInt(platform_id), admin_id: parseInt(admin_id) })
      .then(() => {
        projectListRef.current?.reload();
      });
  }

  return (
    <ProList<GithubIssueItem>
      search={{
        labelWidth: 'auto',
      }}
      actionRef={projectListRef}
      headerTitle="项目授权列表"
      loading={loading}
      rowKey="name"
      request={async (params) => {
        const { current, ...values } = params;
        switch (level) {
          case '2':
            return await getProjectListWithCompanyReq.runAsync({
              ...values,
              page: current,
              company_id: platform_entity_id,
              is_company: 1,
            });
          case '3':
            return await getUserPlatformRelationsByPlatformReq.runAsync({
              ...values,
              page: current,
              admin_id,
              platform_id,
              company_id: platform_entity_id,
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
          dataIndex: 'project_name',
          title: '项目名称',
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
          dataIndex: 'current_company_no',
          title: '项目合同编号',
          render: (_, row) => (
            <Space size={0}>
              <Tag color="blue">{_}</Tag>
              {level === '3' && (
                <Button color="danger" variant="dashed" size="small" onClick={() => onSetRoleIdAll(row)}>
                  同步角色
                </Button>
              )}
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
          level === '3' && (
            <AuthDrawerTable
              key={'project'}
              trigger={
                <Button loading={loading} key="3" type="primary">
                  绑定/解绑 项目
                </Button>
              }
              loading={setRelationsApi.loading || getProjectListWithCompanyReq.loading}
              title={'绑定项目'}
              columns={projectColumns}
              rowKey={'id'}
              onSubmit={async (params: any) => {
                // 提交方法
                const data = {
                  relations: {
                    platform_id: parseInt(platform_id),
                    admin_id: parseInt(admin_id),
                  },
                  ids: params,
                  type: 'platform',
                };
                setLoading(true);
                setRelationsApi.runAsync(data).then(() => {
                  projectListRef.current?.reload();
                });
              }}
              request={async (params: any) => {
                const { current, ...values } = params;
                return await getProjectListWithCompanyReq.runAsync({
                  ...values,
                  page: current,
                  company_id: platform_entity_id,
                  is_company: 1,
                });
              }}
              onChangeOpen={async () => {
                const data = {
                  platform_id: platform_id,
                  query_all: 1,
                  admin_id,
                  company_id: platform_entity_id,
                };
                return await getProjectIds.runAsync(data);
              }}
            ></AuthDrawerTable>
          ),
        ];
      }}
    />
  );
};
