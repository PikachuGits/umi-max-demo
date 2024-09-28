// import styles from '@/pages/MainPlatform/System/Menu/styles/component/title-node.less';
import { LazyLoadable } from '@/components';
import * as Icons from '@ant-design/icons';
import { Dropdown, Tag } from 'antd';

const TitleNode = (props: any) => {
  const items = [
    {
      label: '编辑',
      key: 'edit',
    },
    {
      label: '新增子菜单',
      key: 'addSubset',
    },
    {
      type: 'divider' as const,
    },
    {
      label: '删除',
      danger: true,
      key: 'delete',
    },
  ];
  const tagType = ['菜单', '按钮'];
  const tagColor = ['success', 'processing'];

  const IconElement = (iconName: any) => {
    if (!iconName) return null;
    // @ts-ignore
    return Icons[iconName] && <span style={{ paddingRight: '5px' }}>{LazyLoadable(Icons[iconName])}</span>;
  };
  return (
    <div>
      <Dropdown menu={{ items }} trigger={['contextMenu']}>
        <div>
          <span>{IconElement(props?.icon)}</span>
          <Tag color={tagColor[props.tag]}>{tagType[props.tag]}</Tag>
          <span>{props.children}</span>
        </div>
      </Dropdown>
    </div>
  );
};
export default TitleNode;
