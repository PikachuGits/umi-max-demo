import { GithubIssueItem } from '@/pages/MainPlatform/Company/List/typings';
import { AuthDrawerTable } from '@/pages/MainPlatform/Permission/Authorize/components/index';
import { calculateColumn } from '@/pages/MainPlatform/Permission/Authorize/config';
import { projectColumns } from '@/pages/MainPlatform/Permission/Authorize/config/auth-drawer-table-columns';
import { getRoleList, getUserPlatformRelationsByPlatform } from '@/services/auth/AuthController';
import { getProjectList } from '@/services/project/ProjectController';
import { isEmpty, onConvertCheckBox } from '@/utils/format';
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

  /**
   * 获取角色列表
   * 不分页
   */
  const roleList = useRequest(getRoleList, {
    defaultParams: [{ platform_id: platform_id, query_all: 1 }],
  });

  // 整形角色列表转为 {label,value} 形式
  const roleOptions = useMemo(() => {
    if (roleList.loading || level !== '3') return [];
    return onConvertCheckBox(roleList.data, { label: 'role_name', value: 'role_id' });
  }, [roleList.loading]);

  /**
   * 获取和平台实体有绑定关系的用户id列表
   * 不分页
   */
  const projectIds = useRequest(getUserPlatformRelationsByPlatform, {
    defaultParams: [{ platform_id: platform_id, query_all: 1, company_id: platform_entity_id }],
  });

  // 将用户id列表放入到selectedRowKeys传给DrawerTable默认选中项
  const selectedRowKeys = useMemo(() => {
    if (projectIds.loading || level !== '3') return [];
    return projectIds.data;
  }, [projectIds.loading]);

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

  function onChange() {}

  return (
    <ProList<GithubIssueItem>
      search={{
        labelWidth: 'auto',
      }}
      headerTitle="项目授权列表"
      rowKey="name"
      request={async (params) => {
        const { current, ...values } = params;
        switch (level) {
          case '2':
            return await getProjectList({
              ...values,
              page: current,
              company_id: platform_entity_id,
              is_company: 1,
            });
          case '3':
            return await getUserPlatformRelationsByPlatform({
              ...values,
              page: current,
              company_id: platform_entity_id,
              platform_id,
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
          render: () =>
            !isEmpty(roleOptions) && (
              <div>
                <Checkbox.Group options={roleOptions} onChange={onChange} />
              </div>
            ),
        },
        subTitle: {
          dataIndex: 'current_company_no',
          title: '项目合同编号',
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
          level === '3' && (
            <AuthDrawerTable
              trigger={
                <Button key="3" type="primary">
                  绑定/解绑 项目
                </Button>
              }
              title={'绑定项目'}
              columns={projectColumns}
              rowKey={'id'}
              onSubmit={(params: any) => {
                // 提交方法
              }}
              request={async (params: any) => {
                const { current, ...values } = params;
                return await getProjectList({
                  ...values,
                  page: current,
                  company_id: platform_entity_id,
                  is_company: 1,
                });
              }}
              selectedRowKeys={selectedRowKeys}
            ></AuthDrawerTable>
          ),
        ];
      }}
    />
  );
};
