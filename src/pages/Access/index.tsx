import { Access } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  console.log('00000');
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
    </PageContainer>
  );
};

export default AccessPage;
