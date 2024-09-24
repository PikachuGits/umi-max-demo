import LazyLoadable from '@/components/LazyLoadable';
import Icon, * as AntdIcons from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Popover, Segmented } from 'antd';
import React, { useMemo, useState } from 'react';

import { ReactComponent as TwoToOneIcon } from '@/assets/images/svg/twoToOne.svg';

interface IconSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  popoverOpen?: boolean;
  setPopoverOpen: (open: boolean) => void;
}

const OutlinedIcon = () => LazyLoadable(AntdIcons['BorderOutlined'] as any);
const FilledIcon = () => LazyLoadable(AntdIcons['XFilled'] as any);
const TwoToneIcon = () => <Icon component={() => <TwoToOneIcon />} />;

const allIcons: {
  [key: string]: any;
} = AntdIcons;
const IconSelect: React.FC<IconSelectProps> = ({ value, onChange, children, popoverOpen, setPopoverOpen }) => {
  const [iconTheme, setIconTheme] = useState<'Outlined' | 'Filled' | 'TwoTone'>('Outlined');

  // useEffect(() => {
  //   setPopoverOpen(popoverOpen);
  // }, [popoverOpen]);

  const visibleIconList = useMemo(
    () =>
      Object.keys(allIcons).filter(
        (iconName) => iconName.includes(iconTheme) && iconName !== 'getTwoToneColor' && iconName !== 'setTwoToneColor',
      ),
    [iconTheme],
  );
  return (
    <Popover
      title="选择图标"
      placement="bottomRight"
      arrow={true}
      trigger="click"
      open={popoverOpen}
      onOpenChange={() => setPopoverOpen(!popoverOpen)}
      content={
        <div style={{ width: 300 }}>
          <Segmented
            options={[
              { label: '线框', value: 'Outlined', icon: <OutlinedIcon /> },
              { label: '实底', value: 'Filled', icon: <FilledIcon /> },
              { label: '双色', value: 'TwoTone', icon: <TwoToneIcon /> },
            ]}
            block
            onChange={(value: any) => {
              setIconTheme(value);
            }}
          />
          <ProCard
            gutter={[2, 2]}
            wrap
            style={{ marginTop: 8 }}
            bodyStyle={{ height: 200, overflowY: 'auto', paddingInline: 0, paddingBlock: 0 }}
          >
            {visibleIconList.map((iconName) => {
              const Component = allIcons[iconName];
              return (
                <ProCard
                  key={iconName}
                  colSpan={'20%'}
                  layout="center"
                  bordered
                  hoverable
                  boxShadow={value === iconName}
                  onClick={() => {
                    onChange?.(iconName);
                    setPopoverOpen(false);
                  }}
                >
                  <Component style={{ fontSize: '14px' }} />
                  {/* <p>{iconName}</p> */}
                </ProCard>
              );
            })}
          </ProCard>
        </div>
      }
    >
      {children}
    </Popover>
  );
};
export default IconSelect;
