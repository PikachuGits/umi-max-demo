import logo from '@/assets/images/logo.png';
import { ActionsRender, AvatarDropdown, HeaderRender, MenuHeaderRender } from '@/settings/components';

export const initialStateDefault = {
  title: '建业管理平台',
  logo: logo,
  layout: 'mix',
  loading: false,
  token: {
    sider: {
      colorMenuBackground: '#FFF',
    },
  },

  contentWidth: 'Fluid',
  // menu头部dom
  menuHeaderRender: MenuHeaderRender,
  // 右侧图标列表( 不包含头像 )
  actionsRender: ActionsRender,
  avatarProps: {
    src: 'https://p26-passport.byteacctimg.com/img/user-avatar/35c5f1e45b9837645389693e68b84ef7~50x50.awebp',
    size: 'small',
    title: '超级管理员',
    render: (_: any, avatarChildren: any) => {
      return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
    },
  },
  headerRender: HeaderRender,
  // splitMenus: true, //
};
