import { CustomPageContainer } from '@/components';
import { MenuForm, MenuHeader, MenuTree } from '@/pages/MainPlatform/System/Menu/component';
import { EditTwoTone } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { Suspense, useEffect, useState } from 'react';
import { data } from './data';
export default () => {
  const [menuItem, setMenuItem] = useState<object>({});

  const [operation, setOperation] = useState<'' | 'edit' | 'addSubset'>('');

  /** 展开树的键值 */
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  /**
   * true 显示 全部收起, 执行的也是全部收起操作
   * false 显示 全部展开, 执行的也是全部展开操作
   */
  const [isExpandedAll, setIsExpandedAll] = useState(false); // 追踪是否全部展开

  // 获取所有keys,用于展开所有树
  const getAllKeys = (data: any[]): string[] => {
    return data.reduce((keys: string[], item) => {
      keys.push(item.id); // 使用 `id` 作为 key
      if (item.children) {
        keys.push(...getAllKeys(item.children)); // 使用扩展运算符代替 concat
      }
      return keys;
    }, []);
  };

  // 每次 `expandedKeys` 变化时检查是否已经全部展开
  useEffect(() => {
    const allKeys = getAllKeys(data);
    setIsExpandedAll(expandedKeys.length === allKeys.length);
  }, [expandedKeys, data]);

  // 展开全部/收起全部
  function onExpandedAll() {
    if (!isExpandedAll) {
      const allKeys = getAllKeys(data);
      setExpandedKeys(allKeys);
    } else {
      setExpandedKeys([]);
    }
    setIsExpandedAll(!isExpandedAll); // 切换展开/收起状态
  }

  function onCheck() {}
  /**
   * 显示编辑菜单title
   *  - 编辑节点
   *  - 新增节点
   *  - 查看节点
   * @constructor
   */
  const CardToEdiTitle = () => {
    return (
      <Suspense>
        <span>
          <EditTwoTone
            style={{
              padding: '5px',
              margin: ' 0 10px 0 0',
              backgroundColor: 'rgb(230, 247, 255)',
              borderRadius: '20px',
            }}
          />
          <span>{operation === 'edit' && '编辑菜单'}</span>
          <span>{operation === 'addSubset' && '新增子菜单'}</span>
          <span>{operation === '' && '查看菜单'}</span>
        </span>
      </Suspense>
    );
  };

  return (
    <CustomPageContainer
      breadcrumbRender={false}
      title={false}
      style={{ background: 'transparent' }}
      header={{
        children: (
          <Alert
            style={{ margin: '0 10px' }}
            message="菜单管理"
            description="用于 添加/编辑/删除 菜单的操作,右键菜单可以单独编辑每条菜单 "
            type="info"
            // showIcon
          />
        ),
      }}
    >
      <ProCard gutter={{ xs: 8, sm: 16, md: 24 }} ghost style={{ paddingTop: '10px' }}>
        <ProCard
          colSpan={'420px'}
          style={{ height: '100%' }}
          headerBordered
          title={
            <MenuHeader onExpandedAll={() => onExpandedAll} isExpandedAll={isExpandedAll} onExpand={setExpandedKeys} />
          }
        >
          {/* 树形插件,展示菜单栏列表 */}
          <MenuTree
            treeData={data}
            expandedKeys={expandedKeys}
            onExpand={setExpandedKeys}
            onCheck={onCheck}
            setOperation={setOperation}
          />
        </ProCard>
        <ProCard
          title={<CardToEdiTitle />}
          headerBordered
          colSpan={'auto'}
          style={{ minWidth: '800px', height: '100%' }}
        >
          <MenuForm initialValues={menuItem} />
        </ProCard>
      </ProCard>
    </CustomPageContainer>
  );
};
