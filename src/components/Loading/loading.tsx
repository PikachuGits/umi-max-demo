import { useEffect } from 'react';
import styles from './loading.less';
const Loading = (props: any) => {
  useEffect(() => {}, []);
  return (
    <div className={styles['loading-container']}>
      <div className={styles.loading}></div>
      <div className={styles['loading-tips']}>{props?.tips}</div>
    </div>
  );
};

export default Loading;
