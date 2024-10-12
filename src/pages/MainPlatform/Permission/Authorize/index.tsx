import { CustomPageContainer } from '@/components';
import { AuthorizeEnum } from '@/settings/enum';
import store from '@/store';
import { classes_module } from '@/utils/class-module';
import { isEmpty } from '@/utils/format';
import { useSearchParams } from '@@/exports';
import { BankOutlined, ProductOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthCompanyList, AuthProjectList, AuthUserList } from './components';
import styles from './index.less';

const iconTypes = new Map([
  ['company', <BankOutlined key={'company'} />],
  ['user', <UsergroupAddOutlined key={'user'} />],
  ['project', <ProductOutlined key={'project'} />],
]);

const AfterChildrenExample: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState('user');
  const dispatch = useDispatch();
  function onCleanState() {
    setSearchParams({});
    dispatch({ type: 'auth/cleanState' }); // 清除授权缓存层级和详情信息
  }
  useEffect(() => {
    return () => {
      dispatch({ type: 'auth/cleanState' }); // 清除授权缓存层级和详情信息
    };
  }, []);

  const checkedList = useMemo(() => {
    return store.getState()[AuthorizeEnum.NAME][AuthorizeEnum.LEVEL];
  }, [store.getState()[AuthorizeEnum.NAME][AuthorizeEnum.LEVEL]]);

  useEffect(() => {
    /**
     * level 选择等级
     * platform_id 对应平台id
     * platform_entity_id 对应平台实体id
     * admin_id 用户id
     * type 对应当前应该查询的页面
     */
    const { level, type } = Object.fromEntries(searchParams.entries());
    if (isEmpty(type)) {
      setSearchParams({ level: '1', type: 'company' });
      // 检测方法,如果因为某些原因导致checkedList 没有获取到相应的值,则无法进入后续步骤页面
    } else if (parseInt(level) > 1 && isEmpty(checkedList[parseInt(level) - 2])) {
      onCleanState();
    }
    setType(type);
  }, [searchParams]);

  const containerRef = useRef<any>(null); // 内部使用的 ref

  const [containerStyle, setContainer] = useState({
    width: 0,
    height: 0,
  });

  // 当尺寸变化时的回调函数
  const handleResize = ({ width, height }: { width: number; height: number }) => {
    console.log(`handleResize:Width: ${width}, Height: ${height}`);
    // 32 为 pageContainer 上下左右的padding 宽度
    if (width !== 0 || height !== 0) {
      setContainer({ width: -32 * 2 + width, height: -32 * 2 + height });
      // setOverlayStyle({ width, height });
    }
  };

  function onCloseButton(data: any) {
    const { level, platform_id, platform_entity_id, admin_id, type } = data;
    dispatch({ type: 'auth/removeAuthLevel', payload: { level } });
    setSearchParams({ level, platform_id, platform_entity_id, admin_id, type });
  }

  return (
    <CustomPageContainer ref={containerRef} onResize={handleResize} loading={containerStyle.height === 0}>
      {checkedList?.map((item: any, key: number) => {
        return (
          !isEmpty(item) && (
            <Button
              key={key}
              ghost={true}
              type="primary"
              style={{ padding: '6px 10px', margin: '0 10px 10px 10px' }}
              onClick={() => onCloseButton(item)}
              icon={iconTypes.get(item.type)}
              size={'large'}
              className={classes_module(styles, 'auth-top-button')}
            >
              <span>{item.name}</span>
            </Button>
          )
        );
      })}
      {type === 'company' && <AuthCompanyList containerStyle={containerStyle}></AuthCompanyList>}
      {type === 'project' && <AuthProjectList containerStyle={containerStyle}></AuthProjectList>}
      {type === 'user' && <AuthUserList containerStyle={containerStyle}></AuthUserList>}
    </CustomPageContainer>
  );
};

export default AfterChildrenExample;
