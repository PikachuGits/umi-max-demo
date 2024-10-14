import { ProTable } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import { cloneElement, forwardRef, Suspense, useImperativeHandle, useState } from 'react';
const DrawerTable = forwardRef((props: any, ref) => {
  const { trigger, drawerProps, onOpenChange, ...tableProps } = props;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    onOpenChange();
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    onClose: () => {
      setOpen(false);
    },
  }));

  const onClose = () => {
    setOpen(false);
  };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  return (
    <Suspense fallback={'loading'}>
      {cloneElement(trigger, { onClick: showDrawer })}
      <Drawer closable={false} onClose={onClose} open={open} {...drawerProps}>
        <ProTable {...tableProps} />
      </Drawer>
    </Suspense>
  );
});
export default DrawerTable;
