// src/utils/renderLoading.ts
import Loading from '@/components/Loading/loading';
import ReactDOMServer from 'react-dom/server';

// 将 Loading 组件渲染为 HTML 字符串
export const renderLoadingToHTML = ReactDOMServer.renderToString(<Loading />);
