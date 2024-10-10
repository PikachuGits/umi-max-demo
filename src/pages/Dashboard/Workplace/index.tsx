import { getCompanyListToTable } from '@/services/company/CompanyController';
import { useRequest } from '@@/exports';
import { ProCard } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';

export default () => {
  const [cardData, setCardData] = useState<any[]>([]); // 存储公司数据
  const { data, error, loading } = useRequest(() => {
    return getCompanyListToTable({});
  });
  useEffect(() => {
    if (!loading) {
      setCardData(data);
    }
    // fetchCompanyList().then(() => {}); // 组件加载时获取公司列表
  }, [loading]);

  // async function fetchCompanyList() {
  //   try {
  //     const result = await getCompanyListToTable({});
  //     console.log(result.data);
  //     setCardData(result.data);
  //     console.log('cardData', cardData);
  //   } catch (error) {
  //     console.error('获取公司列表失败:', error);
  //   }
  // }

  // useEffect(() => {
  //   console.log('Updated cardData:', cardData); // 打印 cardData 更新后的值
  // }, [cardData]); // 监听 cardData 的变化

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {cardData.map((card, index) => (
          <ProCard
            key={card.id} // 使用 card.id 作为 key，确保唯一性
            title={'公司'} // 使用公司名称作为标题
            extra="extra"
            tooltip="这是提示"
            style={{ width: 'calc(25% - 16px)', boxShadow: 'var(--ant-box-shadow-base)' }} // 每行四个卡片
            boxShadow
          >
            <div>{card.company}</div>
            <div>{card.address}</div>
            {/* 使用公司地址 */}
          </ProCard>
        ))}
      </div>
    </>
  );
};
