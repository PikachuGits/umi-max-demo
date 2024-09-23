import { useEffect, useState } from 'react';

const FullPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('全屏模式请求失败:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('退出全屏模式失败:', err);
      });
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  return (
    <div>
      <button onClick={toggleFullscreen}>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</button>
    </div>
  );
};

export default FullPage;
