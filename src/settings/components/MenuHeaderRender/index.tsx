import styles from '@/settings/styles/settings/menu_header_render.less';
import { classes_module } from '@/utils/class-module';
import { useModel } from '@@/exports';
import { MoneyCollectFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { Suspense, useEffect, useState } from 'react';
/**
 * 菜单顶部dom样式
 * 渲染 logo 和 title, 优先级比 headerTitleRender 更高
 * ReactNode | (logo,title)=>ReactNode
 */
export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isCompany, setIsCompany] = useState(true);
  const { initialState, setInitialState } = useModel('@@initialState');

  const [value, setValue] = useState('进入项目');
  // const setting = useSelector((state: any) => state.setting);

  useEffect(() => {
    setCollapsed(!!initialState?.collapsed);
  }, [initialState]);

  useEffect(() => {
    // setValue('run 是一个普通的同步函数，我们会自动捕获异常，你可以通过 options.onError 来处理异常时的行为。');
  }, []);
  return (
    isCompany && (
      <Suspense fallback={'2'}>
        <div className={classes_module(styles, 'menuHeaderRender-container')}>
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ margin: 0 }}>
            <MoneyCollectFilled className={classes_module(styles, 'menuHeaderRender-content-icon')} />
            {!collapsed && <span className={classes_module(styles, 'menuHeaderRender-content-title')}>{value}</span>}
          </Typography.Paragraph>
        </div>
      </Suspense>
    )
  );
};
