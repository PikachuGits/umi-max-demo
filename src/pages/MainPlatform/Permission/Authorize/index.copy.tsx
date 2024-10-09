// // import { motion } from 'framer-motion';
// // import React from 'react';
// //
// // const containerVariants = {
// //   hidden: { opacity: 1, scale: 0.8 },
// //   visible: {
// //     opacity: 1,
// //     scale: 1,
// //     transition: {
// //       // type: 'spring', //spring  tween inertia
// //       type: 'spring',
// //       // velocity: 1,
// //       duration: 0.2,
// //       // times: [0, 0.1, 0.9, 1],
// //       // bounce: 0.1, // 弹簧弹性
// //       // damping: 1, // 弹簧阻力系数
// //       velocity: 1,
// //       // restSpeed: 2,
// //       // delay: 1,
// //       // repeat: Infinity, //重复
// //       when: 'afterChildren', // 父级动画在所有子级动画完成之后才开始 beforeChildren afterChildren
// //       staggerChildren: 0.1, // 子元素动画的延迟
// //     },
// //   },
// // };
// //
// // const childVariants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: { opacity: 1, y: 0 },
// // };
// //
// // const AfterChildrenExample: React.FC = () => {
// //   return (
// //     <motion.div
// //       initial="hidden"
// //       animate="visible"
// //       variants={containerVariants}
// //       style={{
// //         display: 'flex',
// //         flexDirection: 'column',
// //         gap: '10px',
// //         padding: '20px',
// //         border: '1px solid #ccc',
// //         // width: '500px',
// //       }}
// //     >
// //       <motion.div
// //         variants={childVariants}
// //         className="child-box"
// //         style={{ backgroundColor: 'lightblue', padding: '10px' }}
// //       >
// //         Child 1
// //       </motion.div>
// //       <motion.div
// //         variants={childVariants}
// //         className="child-box"
// //         style={{ backgroundColor: 'lightgreen', padding: '10px' }}
// //       >
// //         Child 2
// //       </motion.div>
// //       <motion.div
// //         variants={childVariants}
// //         className="child-box"
// //         style={{ backgroundColor: 'lightcoral', padding: '10px' }}
// //       >
// //         Child 3
// //       </motion.div>
// //     </motion.div>
// //   );
// // };
// //
// // export default AfterChildrenExample;
// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import './index.less'; // 添加简单的 CSS 样式
//
// const Card = ({ id, title, onClick, isSelected }) => {
//   return (
//     <motion.div
//       layout
//       onClick={onClick}
//       className={`card ${isSelected ? 'open' : ''}`}
//       style={{ backgroundColor: isSelected ? '#4d90fe' : '#ccc' }}
//       initial={{ borderRadius: 10 }}
//       animate={{ borderRadius: isSelected ? 20 : 10 }}
//       transition={{ duration: 0.3 }}
//     >
//       <motion.h3 layout>{title}</motion.h3>
//     </motion.div>
//   );
// };
//
// const App = () => {
//   const [selectedId, setSelectedId] = useState<string | number | null>(null);
//
//   const toggleSelect = (id) => {
//     setSelectedId(selectedId === id ? null : id);
//   };
//
//   return (
//     <div className="container">
//       {[1, 2, 3].map((item) => (
//         <Card
//           key={item}
//           id={item}
//           title={`Card ${item}`}
//           onClick={() => toggleSelect(item)}
//           isSelected={selectedId === item}
//         />
//       ))}
//     </div>
//   );
// };
//
// export default App;
import { CustomPageContainer } from '@/components';
import { Link } from '@umijs/max';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
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
      <Overlay isSelected={true} style={overlayStyle} />
      <div className="container" style={containerStyle}>
        {[1, 2].map((item) => (
          <Link to={'/main/permission/auth?' + item} key={item}>
            <Card
              key={item}
              id={item}
              title={`Card ${item}`}
              onClick={() => toggleSelect(item)}
              isSelected={selectedId === item}
              containerStyle={containerStyle}
            >
              <motion.div layout>{item}</motion.div>
            </Card>
          </Link>
        ))}
      </div>
    </CustomPageContainer>
  );
};

export default AfterChildrenExample;
