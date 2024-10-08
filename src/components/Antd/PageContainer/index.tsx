import { PageContainerSystem } from '@/settings';
import { PageContainer } from '@ant-design/pro-components';
import { forwardRef } from 'react';

export default forwardRef((props: any, ref: any) => {
  return (
    <div ref={ref}>
      <PageContainer {...PageContainerSystem} {...props}>
        {props.children}
      </PageContainer>
    </div>
  );
});
