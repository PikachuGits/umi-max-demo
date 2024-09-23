import styles from '@/settings/styles/settings/menu_header_render.less';
import { classes_module } from '@/utils/class-module';
import { ProductOutlined } from '@ant-design/icons';
import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

//MenuHeaderRender.tsx logo: Element, title: Element
/**
 * 菜单顶部dom样式
 * 渲染 logo 和 title, 优先级比 headerTitleRender 更高
 * ReactNode | (logo,title)=>ReactNode
 */
export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const setting = useSelector((state: any) => state.setting);

  useEffect(() => {
    setCollapsed(setting.collapsed);
  }, [setting.collapsed]);

  return (
    isCompany && (
      <Suspense>
        <div className={classes_module(styles, 'menuHeaderRender-container')}>
          <ProductOutlined className={classes_module(styles, 'menuHeaderRender-content-icon')} />
          {!collapsed && <span className={classes_module(styles, 'menuHeaderRender-content-title')}>进入项目</span>}
        </div>
      </Suspense>
    )
  );
};
