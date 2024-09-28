import { CustomPageContainer, ProEditable } from '@/components';
import { CompanyFormDrawer } from '@/pages/MainPlatform/Company/List/component';
import { defaultColumns } from '@/pages/MainPlatform/Company/List/config/table-columns';
import { editCompanyInfo, getCompanyListToTable } from '@/services/company/CompanyController';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<ActionType>();

  async function handleSave(value: Company, record: Company) {
    await editCompanyInfo({ ...value, id: record.id });
    actionRef.current?.reload();
  }

  return (
    <CustomPageContainer>
      <ProEditable
        handleSave={handleSave}
        defaultColumns={defaultColumns}
        actionRef={actionRef}
        cardBordered
        scroll={{ x: '100%' }}
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          const { current, ...values } = params;
          return await getCompanyListToTable({
            ...values,
            page: current,
          });
        }}
        rowKey="id"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              //   //get 从 URL 中获取参数，初始化表单
            }
            // set 提交表单时，将表单值同步到 URL
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          // onChange: (page) => console.log('page', page),
        }}
        additionalButtons={[<CompanyFormDrawer />]}
      />
    </CustomPageContainer>
  );
};
