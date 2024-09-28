import { PageContainerSystem } from '@/settings';
import { PageContainer } from '@ant-design/pro-components';

export default (props: any) => {
  return (
    <PageContainer {...PageContainerSystem} {...props}>
      {props.children}
    </PageContainer>
  );
};
