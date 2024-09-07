import { ProSkeleton } from '@ant-design/pro-components';
import React, { Suspense } from 'react';

export default (
  Component: React.LazyExoticComponent<React.ComponentType<any>>,
) => {
  return (
    <Suspense fallback={<ProSkeleton type="list" />}>
      <Component></Component>
    </Suspense>
  );
};
