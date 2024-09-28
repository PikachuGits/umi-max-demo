import { PageContainer, ProCard, Statistic } from '@ant-design/pro-components';
import { useState } from 'react';
const { Divider } = ProCard;

export default function Workplace({ children }: any) {
  const [responsive, setResponsive] = useState(false);
  return (
    <PageContainer breadcrumbRender={false} title={false}>
      <ProCard.Group title="核心指标" direction={responsive ? 'column' : 'row'}>
        <ProCard>
          <Statistic title="今日UV" value={79.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="冻结金额" value={112893.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="信息完整度" value={93} suffix="/ 100" />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="冻结金额" value={112893.0} />
        </ProCard>
      </ProCard.Group>
    </PageContainer>
  );
}
