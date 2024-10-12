import { ActionsRender, AvatarDropdown } from '@/settings/components';
import { CompanyListDrawer } from '@/settings/components/HeaderRender/component';
import styles from '@/settings/styles/settings/header-render.less';
import { classes_module } from '@/utils/class-module';
import { AlignLeftOutlined, ProductOutlined } from '@ant-design/icons';
import { ProBreadcrumb } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Avatar, Tooltip } from 'antd';
import { useState } from 'react';

/**
 * Header 导航
 * @param props
 */
export default (props: any) => {
  const { title, logo, avatarProps } = props;
  const { initialState, setInitialState } = useModel('@@initialState');
  const [open, setOpen] = useState(false);

  //  切换菜单抽屉打开/关闭
  function onCollapse() {
    const collapsed = initialState?.collapsed === undefined ? false : !initialState?.collapsed;
    setInitialState({ ...initialState, collapsed });
  }

  return (
    <div className={classes_module(styles, 'headerRender-container')}>
      <div className={classes_module(styles, 'headerRender-container-left')}>
        {/* 左侧按钮 */}
        <div className={classes_module(styles, 'headerRender-container-icons')}>
          {/* mobile 模式下显示菜单展开按钮 */}
          <AlignLeftOutlined
            onClick={onCollapse}
            className={classes_module(styles, 'headerRender-container-icon', 'headerRender-container-min-768')}
          />
          <Tooltip title="切换公司">
            <CompanyListDrawer>
              {/* 公司菜单 */}
              <ProductOutlined
                className={classes_module(styles, 'headerRender-container-icon')}
                onClick={() => setOpen(true)}
              />
            </CompanyListDrawer>
          </Tooltip>
        </div>
        {/* logo + 标题 */}
        <div className={classes_module(styles, 'headerRender-container-logo')}>
          <Avatar size={{ xs: 24, sm: 28, md: 28, lg: 28, xl: 28, xxl: 28 }} src={logo} />
          <div className={classes_module(styles, 'headerRender-container-logo-title')}>{title}</div>
        </div>
        <ProBreadcrumb />
      </div>
      {/* 右侧操作图标 - 用户头像 */}
      <div className={classes_module(styles, 'headerRender-container-right')}>
        {/* 操作图标 */}
        <ActionsRender />
        {/* 用户头像名称 + 下拉选项 */}
        <AvatarDropdown>
          <div className={classes_module(styles, 'headerRender-container-user')}>
            <Avatar
              className={classes_module(styles, 'headerRender-container-avatar')}
              size={{ xs: 24, sm: 28, md: 28, lg: 28, xl: 28, xxl: 28 }}
              src={avatarProps.src}
            />
            <span className={classes_module(styles, 'headerRender-container-title')}>{avatarProps.title}</span>
          </div>
        </AvatarDropdown>
      </div>
      {/*<CompanyListDrawer open={open} setOpen={setOpen} />*/}
    </div>
  );
};
