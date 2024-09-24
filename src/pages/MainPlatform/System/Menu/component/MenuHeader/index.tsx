import { AlignCenterOutlined, AlignLeftOutlined, AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Select } from 'antd';

const MenuHeader = (props: any) => {
  function handleChange() {}

  return (
    <div>
      <Flex wrap gap={10} justify="space-between">
        <div style={{ width: '100%' }}>
          <Select
            defaultValue="1"
            style={{ width: '100%' }}
            onChange={handleChange}
            options={[
              { value: '1', label: '系统平台' },
              { value: '2', label: '公司平台' },
              { value: '3', label: '项目平台' },
            ]}
          />
        </div>
        <Button variant="dashed" color="primary" icon={<AppstoreAddOutlined />}>
          创建新节点
        </Button>
        <Button
          variant="dashed"
          color="primary"
          onClick={props.onExpandedAll()}
          icon={props.isExpandedAll ? <AlignLeftOutlined /> : <AlignCenterOutlined />}
        >
          {props.isExpandedAll ? '全部收起' : '全部展开'}
        </Button>
        <Button color="danger" variant="dashed" icon={<DeleteOutlined />}>
          删除
        </Button>
      </Flex>
    </div>
  );
};
export default MenuHeader;
