import { MenuForm, MenuHeader, MenuTree } from '@/pages/MainPlatform/System/Menu/component';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { data } from './data';
export default () => {
  const Header = () => {
    return <div>菜单栏测试头部信息</div>;
  };

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  /**
   * true 显示 全部收起, 执行的也是全部收起操作
   * false 显示 全部展开, 执行的也是全部展开操作
   */
  const [isExpandedAll, setIsExpandedAll] = useState(false); // 追踪是否全部展开

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

  //
  function onExpandedAll() {
    if (!isExpandedAll) {
      const allKeys = getAllKeys(data);
      setExpandedKeys(allKeys);
    } else {
      setExpandedKeys([]);
    }
    setIsExpandedAll(!isExpandedAll); // 切换展开/收起状态
  }

  return (
    <PageContainer
      breadcrumbRender={false}
      title={false}
      style={{ background: 'transparent' }}
      header={{
        children: <Header />,
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
          <MenuTree treeData={data} expandedKeys={expandedKeys} onExpand={setExpandedKeys} />
        </ProCard>
        <ProCard colSpan={'auto'} style={{ minWidth: '800px', height: '100%' }}>
          <MenuForm />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
