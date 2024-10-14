import { PageContainerSystem } from '@/settings';
import { PageContainer } from '@ant-design/pro-components'; // 假设你用的是 ProLayout
import { useDebounce } from 'ahooks';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const CustomPageContainer = forwardRef((props: any, ref: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null); // 内部使用的 ref
  const [size, setSize] = useState({ width: 0, height: 0 });

  // 使用 useDebounce 来防抖
  const debouncedSize = useDebounce(size, { wait: 500 }); // 300ms 防抖延迟

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getSize: () => ({
      width: containerRef.current?.offsetWidth || 0,
      height: containerRef.current?.offsetHeight || 0,
    }),
  }));
  useEffect(() => {
    // 监测到防抖后的尺寸变化时调用 props 传递的 onResize
    if (props.onResize) {
      props.onResize(debouncedSize);
    }
  }, [debouncedSize]);

  useEffect(() => {
    const mainElement = document.querySelector('main');

    if (mainElement) {
      // 创建一个 ResizeObserver 实例
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          // 如果 ref 当前有效，调用父组件传入的回调来更新宽高
          if (ref && typeof ref === 'object' && ref.current) {
            // 更新当前尺寸
            setSize({ width, height });
          }
        }
      });

      // 开始监听 main 元素尺寸变化
      resizeObserver.observe(mainElement);

      // 清理：组件卸载时取消监听
      return () => {
        resizeObserver.unobserve(mainElement);
      };
    } else {
      console.log('Main element not found');
    }
  }, [ref]);

  return (
    <div ref={containerRef}>
      <PageContainer {...PageContainerSystem} {...props}>
        {props.children}
      </PageContainer>
    </div>
  );
});

export default CustomPageContainer;
