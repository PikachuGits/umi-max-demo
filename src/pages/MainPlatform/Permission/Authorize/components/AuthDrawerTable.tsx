import { DrawerTable } from '@/components';

export default (props: any) => {
  return (
    <DrawerTable
      trigger={props.trigger}
      drawerProps={{
        placement: 'right',
        title: props.title,
        width: '500px',
      }}
      request={async (params, sort, filter) => {
        // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
        // 如果需要转化参数可以在这里进行修改
        // return await myQuery({
        //   page: params.current,
        //   pageSize: params.pageSize,
        // });
      }}
    />
  );
};
