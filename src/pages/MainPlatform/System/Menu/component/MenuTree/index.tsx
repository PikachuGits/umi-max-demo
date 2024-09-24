import TitleNode from '@/pages/MainPlatform/System/Menu/component/MenuTree/TitleNode';
import { Flex, Input, Tree, TreeDataNode, TreeProps } from 'antd';
import React, { Suspense, useEffect, useMemo, useState } from 'react';

const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};
const defaultData: any = [];

const MenuTree = (props: { treeData: object[]; expandedKeys: string[]; [key: string]: any }) => {
  // const [expandedKeys, setExpandedKeys] = useState<string[]>(props.expandedKeys);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  // 监听treeData入参是否修改
  useEffect(() => {
    setTreeData(props.treeData);
  }, [props.treeData]);

  useMemo(() => {
    const loop = (data: any[]): any[] =>
      data.map((item) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span key={item.key}>
              {beforeStr}
              <span className="site-tree-search-value" style={{ color: '#c01' }}>
                {searchValue}
              </span>
              {afterStr}
            </span>
          ) : (
            <span key={item.key}>{strTitle}</span>
          );

        // 递归处理子节点
        if (item.children) {
          return { ...item, title, children: loop(item.children) };
        }

        return {
          ...item, // 保留其他属性
          title, // 替换 title 为高亮版本
        };
      });
    console.log(searchValue);
    setTreeData(loop(props.treeData));
  }, [searchValue]);

  const getSelectKeys = (data: any[], value: string): string[] => {
    return data.reduce((keys: string[], item) => {
      if (item.title.indexOf(value) > -1) {
        keys.push(item.id);
      }

      if (item.children) {
        keys.push(...getSelectKeys(item.children, value)); // 使用扩展运算符代替 concat
      }
      return keys;
    }, []);
  };

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
    console.log('selected', selectedKeys, info);
  };

  /**
   * 点击复选框时触发
   * @param checkedKeys
   * @param info
   */
  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Suspense>
      <Flex gap="middle" vertical>
        <Input.Search placeholder="输入菜单名称搜素" onSearch={onSearch} />

        <Tree
          checkable
          showLine={true}
          titleRender={(props) => {
            // @ts-ignore
            return TitleNode({ children: props.title, tag: props.type, icon: props.icon });
          }}
          expandedKeys={props.expandedKeys}
          onExpand={(expandedKeys) => props.onExpand(expandedKeys)}
          // autoExpandParent={autoExpandParent}
          onSelect={onSelect}
          onCheck={onCheck}
          blockNode
          fieldNames={{ key: 'id' }}
          treeData={treeData}
          // defaultExpandedKeys={['0-0-0', '0-0-1']}
          // defaultSelectedKeys={['0-0-0', '0-0-1']}
          // defaultCheckedKeys={['0-0-0', '0-0-1']}
        />
      </Flex>
    </Suspense>
  );
};

export default MenuTree;
