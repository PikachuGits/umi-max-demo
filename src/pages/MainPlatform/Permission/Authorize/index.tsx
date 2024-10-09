import { CustomPageContainer } from '@/components';
import { isEmpty } from '@/utils/format';
import { useSearchParams } from '@@/exports';
import { Link } from '@umijs/max';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { AuthCompanyList, AuthProjectList, AuthUserList } from './components';
import './index.less';

const Card = ({ id, title, onClick, isSelected, containerStyle, children }) => {
  const cardStyle = {
    backgroundColor: isSelected ? '#4d90fe' : '#ccc',
    // width: isSelected ? containerStyle.width : 150,
    // height: isSelected ? containerStyle.height : 150,
  };
  const openSpring = { type: 'spring', stiffness: 200, damping: 30 };
  const closeSpring = { type: 'spring', stiffness: 300, damping: 35 };

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`card ${isSelected ? 'open' : ''}`}
      style={cardStyle}
      initial={{ borderRadius: 10 }}
      animate={{}}
      transition={{}}
    >
      {children}
    </motion.div>
  );
};
const Overlay = ({ isSelected, style }) => {
  console.log(isSelected);
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: isSelected ? 'auto' : 'none', ...style }}
      className="overlay"
    >
      <Link to="/main/permission/auth" style={{ display: 'inline-block', ...style }}>
        123
      </Link>
    </motion.div>
  );
};
const AfterChildrenExample: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState('user');

  useEffect(() => {
    /**
     * level 选择等级
     * platform_id 对应平台id
     * platform_entity_id 对应平台实体id
     * admin_id 用户id
     * type 对应当前应该查询的页面
     */
    const queryParamsArray = Object.fromEntries(searchParams.entries());
    console.log(searchParams);
    if (isEmpty(queryParamsArray.type)) {
      setSearchParams({
        level: '1',
        type: 'company',
      });
      setType('company');
    } else {
      setType(queryParamsArray.type);
    }
  }, [searchParams]);

  const containerRef = useRef<any>(null); // 内部使用的 ref
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const toggleSelect = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const [containerStyle, setContainer] = useState({
    width: 0,
    height: 0,
  });

  const [overlayStyle, setOverlayStyle] = useState({
    width: 0,
    height: 0,
  });

  // 当尺寸变化时的回调函数
  const handleResize = ({ width, height }: { width: number; height: number }) => {
    console.log(`handleResize:Width: ${width}, Height: ${height}`);
    // 32 为 pageContainer 上下左右的padding 宽度
    if (width !== 0 || height !== 0) {
      setContainer({ width: -32 * 2 + width, height: -32 * 2 + height });
      setOverlayStyle({ width, height });
    }
  };

  useEffect(() => {
    // 页面加载时立即获取尺寸
    if (containerRef.current) {
      // const size = containerRef.current.getSize();
      // handleResize(size);
    }
  }, []);

  return (
    <CustomPageContainer ref={containerRef} onResize={handleResize} loading={containerStyle.height === 0}>
      {type === 'company' && <AuthCompanyList containerStyle={containerStyle}></AuthCompanyList>}
      {type === 'project' && <AuthProjectList containerStyle={containerStyle}></AuthProjectList>}
      {type === 'user' && <AuthUserList containerStyle={containerStyle}></AuthUserList>}
    </CustomPageContainer>
  );
};

export default AfterChildrenExample;
