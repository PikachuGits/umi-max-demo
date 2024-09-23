// src/components/Loading.tsx
import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 清理函数，组件卸载时调用
    return () => {
      console.log('组件已卸载');
      setVisible(false);
    };
  }, []);

  return (
    <div id={'loading'} className={`loading-wrapper ${!visible ? 'fade-out' : ''}`}>
      123123123213
    </div>
  );
};

export default Loading;
