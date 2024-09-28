import { CacheEnum, PlatformEnum, UserEnum } from '@/settings/enum/';
import { platformReducer, settingReducer, userReducer } from '@/store/slices';
import { localStorageGet, localStorageSet } from '@/utils/catch';
import { isEmpty } from '@/utils/format';
import { configureStore } from '@reduxjs/toolkit';

// 从 localStorage 加载初始状态
const loadState = () => {
  try {
    const userStorage = localStorageGet(CacheEnum.USER_NAME);

    // 初始化一个状态对象
    const state: any = {
      [PlatformEnum.NAME]: localStorageGet(CacheEnum.PLATFORM_NAME),
    };

    // 根据条件动态添加 `UserEnum.NAME`
    if (!isEmpty(userStorage)) {
      state[UserEnum.NAME] = userStorage;
    }

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
  });
});

// 从 store 中推断 dispatch 类型
export type AppDispatch = typeof store.dispatch;

export default store;
