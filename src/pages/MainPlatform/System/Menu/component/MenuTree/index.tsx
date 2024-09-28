import TitleNode from '@/pages/MainPlatform/System/Menu/component/MenuTree/TitleNode';
import { Flex, Input, Tree, TreeProps } from 'antd';
import { Suspense, useEffect, useState } from 'react';

const MenuTree = (props: { treeData: object[]; expandedKeys: string[]; [key: string]: any }) => {
  //
  const [treeData, setTreeData] = useState<any[]>([]);
  // 搜索关键字值储存位置
  const [searchValue, setSearchValue] = useState('');

  // 监听treeData入参是否修改
  useEffect(() => {
    setTreeData(props.treeData);
  }, [props.treeData]);

  /**
   * 监听搜索对象变化, 高亮搜索项
   */
  useEffect(() => {
    const highlightTitle = (title: string, key: string): JSX.Element => {
      const index = title.indexOf(searchValue);
      if (index === -1) return <span key={key}>{title}</span>;

      const beforeStr = title.substring(0, index);
      const afterStr = title.slice(index + searchValue.length);

      return (
        <span key={key}>
          {beforeStr}
          <span className="site-tree-search-value" style={{ color: '#ff4d4f', fontWeight: 'bolder' }}>
            {searchValue}
          </span>
          {afterStr}
        </span>
      );
    };

    const loop = (data: any[]): any[] =>
      data.map((item) => ({
        ...item,
        title: highlightTitle(item.title as string, item.key),
        children: item.children ? loop(item.children) : undefined,
      }));

    setTreeData(loop(props.treeData));
  }, [searchValue]);

  /**
   *  检索数组,搜寻包含关键字的项并返回id及其父id
   * @param data
   * @param value
   */
  const getSelectKeys = (data: any[], value: string): string[] => {
    return data.reduce((keys: string[], item) => {
      let childKeys: string[] = [];

      // 递归查找子元素中的匹配项
      if (item.children) {
        childKeys = getSelectKeys(item.children, value);
      }

      // 如果当前项匹配，或者有子元素匹配，则把当前项的id加入结果中
      if (item.title.indexOf(value) > -1 || childKeys.length > 0) {
        keys.push(item.id);
      }
      // 把子元素匹配的keys也加到结果中
      keys.push(...childKeys);

      return keys;
    }, []);
  };

  /**
   * 快速搜索关键字,并展开对应的树结构
   * 缓存搜索字段用于高亮搜索值
   * @param value
   */
  function onSearch(value: string) {
    const newExpandedKeys = getSelectKeys(props.treeData, value);
    props.onExpand(newExpandedKeys);
    setSearchValue(value);
  }

  /**
   * 点击树节点时会触发该方法
   * @param selectedKeys
   * @param info
   */
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    props.onCheck(selectedKeys, info, 'isSelect');
  };

  /**
   * 点击复选框时触发
   * @param checkedKeys
   * @param info
   */
  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    props.onCheck(checkedKeys, info, 'isCheck');
  };

  return (
    <Suspense>
      <Flex gap="middle" vertical>
        <Input.Search placeholder="输入菜单名称搜素" onSearch={onSearch} />
        <Tree
          checkable
          showLine={true}
          titleRender={({ title, type, icon }: any) => {
            return TitleNode({ children: title, tag: type, icon: icon, setOperation: props.setOperation });
          }}
          expandedKeys={props.expandedKeys}
          onExpand={(expandedKeys) => props.onExpand(expandedKeys)}
          onSelect={onSelect}
          onCheck={onCheck}
          blockNode
          fieldNames={{ key: 'id' }}
          treeData={treeData}
        />
      </Flex>
    </Suspense>
  );
};

export default MenuTree;
