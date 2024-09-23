import { Access, useModel } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  const { initialState, setInitialState } = useModel('@@initialState');

  function coll() {
    // store.dispatch({ type: 'setting/onCollapsed' });
    // const collapsed = store.getState().setting.collapsed;
    // setInitialState({ ...initialState, collapsed });
  }
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <div>access</div>
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>
      <Button onClick={coll}> 收起菜单 </Button>
    </PageContainer>
  );
};

export default AccessPage;
