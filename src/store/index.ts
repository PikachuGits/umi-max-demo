import { AuthorizeEnum } from '@/settings/enum';
import { CacheEnum, PlatformEnum, UserEnum } from '@/settings/enum/';
import { authorizeReducer, platformReducer, settingReducer, userReducer } from '@/store/slices';
import { localStorageGet, localStorageSet } from '@/utils/catch';
import { isEmpty } from '@/utils/format';
import { configureStore } from '@reduxjs/toolkit';

/**
 * 判断localstorage 中是否存在值,如果没有值则返回空数组
 * @param key
 * @param enumName
 */
const getStoredValue = (key: string, enumName: string) =>
  isEmpty(localStorageGet(key)) ? {} : { [enumName]: localStorageGet(key) };

/**
 * 从 localStorage 加载初始状态
 */
const loadState = () => {
  try {
    // 根据条件动态添加初始化状态对象
    const state: any = {
      ...getStoredValue(CacheEnum.PLATFORM_NAME, PlatformEnum.NAME),
      ...getStoredValue(CacheEnum.AUTHORIZE_NAME, AuthorizeEnum.NAME),
      ...getStoredValue(CacheEnum.USER_NAME, UserEnum.NAME),
    };

    return state;
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

// 保存状态到 localStorage
const saveState = (state: any) => {
  try {
    Object.keys(state).forEach((key: string) => {
      localStorageSet(key, state[key]);
    });
  } catch (err) {
    // 忽略写入错误
  }
};

const preloadedState = loadState();

const reducer: any = {
  [UserEnum.NAME]: userReducer,
  [PlatformEnum.NAME]: platformReducer,
  [AuthorizeEnum.NAME]: authorizeReducer,
  setting: settingReducer,
};

const store = configureStore({
  reducer,
  preloadedState,
});

// 监听状态变化并保存到 localStorage
store.subscribe(() => {
  saveState({
    [UserEnum.NAME]: store.getState()[UserEnum.NAME],
    [PlatformEnum.NAME]: store.getState()[PlatformEnum.NAME],
    [AuthorizeEnum.NAME]: store.getState()[AuthorizeEnum.NAME],
  });
});

// 从 store 中推断 dispatch 类型
export type AppDispatch = typeof store.dispatch;

export default store;
