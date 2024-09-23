import styles from '@/settings/styles/loading.less';
import React, { useEffect } from 'react';
const Loading: React.FC = () => {
  useEffect(() => {}, []);

  return <div className={styles.loading}></div>;
};

export default Loading;
