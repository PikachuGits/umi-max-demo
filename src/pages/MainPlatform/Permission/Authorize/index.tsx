import { motion } from 'framer-motion';
import React from 'react';

const containerVariants = {
  hidden: { opacity: 1, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      // type: 'spring', //spring  tween inertia
      type: 'inertia',
      velocity: 1,
      // duration: 0.2,
      // times: [0, 0.1, 0.9, 1],
      // bounce: 0.7, // 弹簧弹性
      // damping: 1, // 弹簧阻力系数
      // mass: 0.5,
      // stiffness: 150,
      // velocity: 10,
      // restSpeed: 2,
      // delay: 1,
      // repeat: Infinity, 重复
      // when: 'afterChildren', // 父级动画在所有子级动画完成之后才开始 beforeChildren afterChildren
      // staggerChildren: 0.2, // 子元素动画的延迟
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AfterChildrenExample: React.FC = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 1, scale: 0.8 }}
        animate={{ rotate: 180 }}
        style={{ originX: 0.5, padding: '10px', background: 'red', width: '100px', height: '100px' }}
        // transition={{ type: 'inertia', velocity: 100 }}
        whileHover={{ scale: 1 }}
      />
      <motion.ul
        style={{ padding: '10px', background: 'red', width: '100px', height: '100px' }}
        initial={{ '--rotate': '0deg' } as any}
        animate={{ '--rotate': '360deg' } as any}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <li style={{ transform: 'rotate(var(--rotate))' }}>123</li>
        <li style={{ transform: 'rotate(var(--rotate))' }}>234</li>
        <li style={{ transform: 'rotate(var(--rotate))' }}>354</li>
      </motion.ul>
      {/*<motion.div*/}
      {/*  initial="hidden"*/}
      {/*  animate="visible"*/}
      {/*  variants={containerVariants}*/}
      {/*    style={{*/}
      {/*      display: 'flex',*/}
      {/*      flexDirection: 'column',*/}
      {/*      gap: '10px',*/}
      {/*      padding: '20px',*/}
      {/*      border: '1px solid #ccc',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <motion.div*/}
      {/*      variants={childVariants}*/}
      {/*      className="child-box"*/}
      {/*      style={{ backgroundColor: 'lightblue', padding: '10px' }}*/}
      {/*    >*/}
      {/*      Child 1*/}
      {/*    </motion.div>*/}
      {/*    <motion.div*/}
      {/*      variants={childVariants}*/}
      {/*      className="child-box"*/}
      {/*      style={{ backgroundColor: 'lightgreen', padding: '10px' }}*/}
      {/*    >*/}
      {/*      Child 2*/}
      {/*    </motion.div>*/}
      {/*    <motion.div*/}
      {/*      variants={childVariants}*/}
      {/*      className="child-box"*/}
      {/*      style={{ backgroundColor: 'lightcoral', padding: '10px' }}*/}
      {/*    >*/}
      {/*      Child 3*/}
      {/*    </motion.div>*/}
      {/*  </motion.div>*/}
    </div>
  );
};

export default AfterChildrenExample;
