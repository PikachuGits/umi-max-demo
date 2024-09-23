import styles from '@/settings/styles/settings/header-actions-render.less';
import { classes_module } from '@/utils/class-module';
import {
  BellOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { Badge } from 'antd';
import { Suspense, useState } from 'react';
/**
 * 全屏切换组件
 * @constructor
 */
const Fullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error('进入全屏模式失败', err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error('退出全屏模式失败', err);
        });
    }
  };

  return isFullscreen ? (
    <FullscreenExitOutlined onClick={toggleFullscreen} key="FullscreenExitOutlined" />
  ) : (
    <FullscreenOutlined onClick={toggleFullscreen} key="FullscreenOutlined" />
  );
};

//  导航图标列表
const ActionsRender = (props: any) => {
  if (props.isMobile) return [];
  const show = true;

  const data = [
    <Badge dot={show} key="BellOutlined">
      <BellOutlined style={{ fontSize: '16px', color: '#08c' }} />
    </Badge>,
    <InfoCircleFilled key="InfoCircleFilled" />,
    <QuestionCircleFilled key="QuestionCircleFilled" />,
    <GithubFilled key="GithubFilled" />,
    <Fullscreen key="Fullscreen" />,
  ];
  return (
    <Suspense>
      {data.map((item: any, key: number) => {
        return (
          <div key={key} className={classes_module(styles, 'header-actions-render-icon')}>
            {item}
          </div>
        );
      })}
    </Suspense>
  );
};

export default ActionsRender;
