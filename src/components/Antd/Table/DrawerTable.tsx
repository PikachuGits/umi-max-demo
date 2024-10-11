import { ProTable } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import { cloneElement, Suspense, useEffect, useState } from 'react';
const DrawerTable = (props: any) => {
  const { trigger, drawerProps, onOpenChange, ...tableProps } = props;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    onOpenChange();
    setOpen(true);
  };
  useEffect(() => {
    console.log(trigger);
    // trigger.props = { ...trigger.props, onClick: () => setOpen(true) };
  }, []);

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
};
export default DrawerTable;
